// src/modules/finance/index.js
import branchesRoutes from 'routes/branchesRoutes.js'
import permissionsRoutes from 'routes/permissionsRoutes.js'
import rolesRoutes from 'routes/rolesRoutes.js'
import sectorsRoutes from 'routes/sectorsRoutes.js'

import { requireModuleEnabled } from '../../core/guards.js';

export async function managerModule(server, options) {

    server.addHook('preHandler', requireModuleEnabled('manager'));

    server.register(branchesRoutes, { prefix: '/branches' });
    server.register(permissionsRoutes, { prefix: '/permissions' });
    server.register(rolesRoutes, { prefix: '/roles' });
    server.register(sectorsRoutes, { prefix: '/sectors' });
}