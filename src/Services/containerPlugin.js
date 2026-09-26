import fp from 'fastify-plugin'
// REPOSITORIES IMPORTS
import { RevenuesRepository } from '../modules/finance/repositories/revenuesRepository.js'
import { ExpensesRepository } from '../modules/finance/repositories/expensesRepository.js'
import { BranchesRepository } from '../modules/manager/repositories/branchesRepository.js'
import { SectorsRepository } from '../modules/manager/repositories/sectorsRepository.js'
import { CardsRepository } from "../modules/rh/repositories/cardsRepository.js";
import { CompaniesRepository } from '../modules/rh/repositories/companiesRepository.js'
import { MembersRepository } from "../modules/rh/repositories/membersRepository.js";
import { ReportsRepository } from "../modules/finance/repositories/reportsRepository.js";
import { RolesRepository } from "../modules/manager/repositories/rolesRepository.js";
import { UsersRepository } from "../modules/rh/repositories/usersRepository.js";
import { PermissionsRepository } from "../modules/manager/repositories/permissionsRepository.js";
import { PagesRepository} from "../modules/global/repositories/pagesRepository.js";

//  SERVICES IMPORTS
import { AuthService } from "./authService.js";
import { FilterService } from "./filterService.js";
import { GetUserInfos } from "./getUserInfos.js";
import { ScopeValidationService } from './scopeValidationService.js'
import { GetFinanceData } from "./getFinanceData.js";
import { ValidateBranchWriteAccess } from "./validateBranchWriteAccess.js";

//  CONTROLLERS IMPORTS
import { RevenuesController } from '../modules/finance/controller/revenuesController.js'
import { ExpensesController } from '../modules/finance/controller/expensesController.js'
import { BranchesController } from '../modules/manager/controllers/branchesController.js'
import { SectorsController } from '../modules/manager/controllers/sectorsController.js'
import { CardsController } from "../modules/rh/controllers/cardsController.js";
import { CompaniesController } from '../modules/rh/controllers/companiesController.js'
import { MembersController } from "../modules/rh/controllers/membersController.js";
import { ReportsController } from "../modules/finance/controller/reportsController.js";
import { RolesController } from "../modules/manager/controllers/rolesController.js";
import { UsersController } from "../modules/rh/controllers/usersController.js";
import { DashBoardController } from "../modules/finance/controller/dashBoardController.js";
import { PermissionsController } from "../modules/manager/controllers/permissionsController.js";
import { PagesController } from "../modules/global/controllers/pagesController.js";

async function containerPlugin(server, options) {
    // INSTANCE REPOSITORIES
    const repos = {
        revenues: new RevenuesRepository(),
        expenses: new ExpensesRepository(),
        branches: new BranchesRepository(),
        sectors: new SectorsRepository(),
        cards: new CardsRepository(),
        companies: new CompaniesRepository(),
        members: new MembersRepository(),
        reports: new ReportsRepository(),
        roles: new RolesRepository(),
        users: new UsersRepository(),
        permissions: new PermissionsRepository(),
        pages: new PagesRepository(),
    }

    //  INSTANCE SERVICES
    const authService = new AuthService(repos.users)
    const validationService = new ScopeValidationService()
    const filterService = new FilterService(validationService)
    const getFinanceData = new GetFinanceData(repos.revenues, repos.expenses, validationService, repos.reports)
    const getUserInfos = new GetUserInfos(repos.users, repos.branches, repos.sectors)
    const branchesWriteValidation = new ValidateBranchWriteAccess(repos.branches)

    //  INSTANCE CONTROLLERS
    const controllers = {
        revenues: new RevenuesController(filterService, validationService, branchesWriteValidation, repos.revenues),
        expenses: new ExpensesController(validationService, filterService, branchesWriteValidation, repos.expenses),
        branches: new BranchesController(repos.branches, validationService),
        sectors: new SectorsController(repos.sectors),
        cards: new CardsController(repos.cards, validationService),
        companies: new CompaniesController(repos.companies),
        members: new MembersController(repos.members, validationService, branchesWriteValidation),
        reports: new ReportsController(repos.reports, validationService, getFinanceData),
        roles: new RolesController(repos.roles),
        users: new UsersController(authService, repos.users, getUserInfos),
        dashboard: new DashBoardController(getFinanceData),
        permissions: new PermissionsController(repos.permissions),
        pages: new PagesController(repos.pages),
    }


    server.decorate('repositories', repos)

    server.decorate('services', {
        authService,
        validationService,
        filterService,
        getFinanceData,
        getUserInfos
    })

    server.decorate('controllers', controllers)
}
export default fp(containerPlugin)