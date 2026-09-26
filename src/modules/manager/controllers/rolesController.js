export class RolesController {
    constructor(rolesRepository) {
        this.repository = rolesRepository
    }
    create = async (request, reply) => {
        try{
            const createRole = await this.repository.createRole(request.body, request.userID)
            if(createRole.length === 0) {
                return reply.status(303).send({message: "Permissão não pode ser criada"})
            }
            return reply.status(201).send({message: "Permissão criada com sucesso"})
        }catch(err){
            console.log(err)
            return reply.status(500).send({message:"A permissão não pode ser criada por um erro interno"})
        }
    }
    list = async (request, reply) => {
        try{
            const roles = await this.repository.listRoles(request.userID)
            if (roles.length === 0) {
                return reply.status(404).send({message:"Não foi possível localizar nenhuma permissão"})
            }
            return reply.status(200).send({roles})
        }catch(err){
            console.log(err)
            return reply.status(500).send({message:"Não foi possível localizar nenhuma permissão por um erro interno"})
        }
    }
    update = async (request, reply) => {
        try{
            const updateRole = await this.repository.updateRole(request.body, request.params.id)
            if(updateRole.length === 0) {
                return reply.status(404).send({message:"Não foi possível atualizar permissão"})
            }
            return reply.status(200).send({message:"Permissão atualizada com sucesso"})
        }catch(err){
            console.log(err)
            return reply.status(500).send({message:"Não foi possível atualizar a permissão por um erro interno"})
        }
    }
    delete = async (request, reply) => {
        console.log(request.params.id)
        try{
            const deleteRole = await this.repository.deleteRoles(request.params.id)
            if(deleteRole.length === 0) {
                return reply.status(404).send({message:"Não foi possível localizar nenhuma permissão"})
            }
            return reply.status(200).send({message:"Permissão deletada com sucesso"})
        }catch(err){
            console.log(err)
            return reply.status(500).send({message:"Não foi possível deletar a permissão por um erro interno"})
        }
    }
}

