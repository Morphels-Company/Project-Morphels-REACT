export class ValidateBranchWriteAccess {
    constructor(branchesRepository) {
        this.branchesRepository = branchesRepository;
    }
    validateAccess = async  (access_scope, userId, userBranch, targetBranch) => {
        const userBranchSectorId = await this.branchesRepository.findBranchById(userBranch);
        const targetBranchSectorId = await this.branchesRepository.findBranchById(targetBranch);

        if (targetBranchSectorId.length === 0 || userBranch.length === 0) {
            const error = new Error('Branches listadas não existem.');
            error.statusCode = 403;
            throw error;
        }
        if (targetBranchSectorId.institution !== userBranchSectorId.institution) {
            const error = new Error('Branches listadas não existem.');
            error.statusCode = 403;
            throw error;
        }


        if (access_scope === "global"){
            return true
        }

        if (access_scope === "local"){
            if(userBranchSectorId.id !== targetBranchSectorId.id){
                const error = new Error('Você só tem permissão para registrar dados na sua própria filial.');
                error.statusCode = 403;
                throw error;
            }
            return true;
        }

        if (access_scope === "sector"){

            if (targetBranchSectorId.length === 0){
                const error = new Error('A filial informada não existe.');
                error.statusCode = 403;
                throw error;
            }

            if (userBranchSectorId.sector !== targetBranchSectorId.sector){
                const error = new Error('Você só pode registrar dados em filiais do seu próprio setor.');
                error.statusCode = 403;
                throw error;
            }
            return true
        }
    }
}