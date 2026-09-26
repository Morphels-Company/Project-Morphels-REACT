export class PermissionsController {
    constructor(permissionsRepository) {
        this.permissionsRepository = permissionsRepository
    }
    create = async (request, reply) => {
        const {role_id, registers} = request.body

        const page_id = registers.map(item => item.page_id);
        const can_view = registers.map(item => item.can_view);
        const can_add = registers.map(item => item.can_add);
        const can_edit = registers.map(item => item.can_edit);
        const can_delete = registers.map(item => item.can_delete);
        const access_scope = registers.map(item => item.access_scope);

        console.log(role_id, page_id)

        try{
            const permissions = await this.permissionsRepository.createPermissions(role_id, page_id, can_view, can_add, can_edit, can_delete, access_scope);
            if (permissions.length === 0){
                return reply.status(303).send({message: "Não foi possível criar as permissões"});
            }
            return reply.status(201).send({message: "Permissões criadas com sucesso"});
        }catch(err){
            console.error(err);
            return reply.status(500).send({message: "Não foi possível criar as permissões por um erro interno"});
        }
    }
    listViewPermissions = async (request, reply)=> {
       try{
           const permissions = await this.permissionsRepository.listPagesViewPermissions(request.userID)
           if(permissions.length === 0){
               return reply.status(401).send({message:'Não foi possível localizar as permissões'})
           }
           return reply.status(200).send(permissions)
       } catch (error) {
           console.log(error)
           return reply.status(500).send({message: "Não foi possível localizar as permissões por um erro interno"})
       }
    }
    listAllPermissions = async (request, reply)=> {
        try{
            const permissions = await this.permissionsRepository.listAllPermissionsByRole(request.body.role_id)
            if(permissions.length === 0){
                return reply.status(400).send({message:'Não foi possível localizar as permissões'})
            }
            return reply.status(200).send(permissions)
        }catch(error){
            console.log(error)
            return reply.status(500).send({message:'Não foi possível localizar as permissões por um erro interno'})
        }
    }
    listNumberOfPagesWithPermissions = async (request, reply)=> {
        try {
            const total_count_permissions = await this.permissionsRepository.countPagesPermissions(request.body.role_id)
            if(total_count_permissions === 0){
                return reply.status(302).send({message:'Não foi possível litar o número de páginas com permissão'})
            }
            return reply.status(200).send(total_count_permissions)
        }catch(error){
            console.log(error)
            return reply.status(500).send({message:'Não foi possível litar o número de páginas com permissão por um erro interno'})
        }
    }

    delete = async (request, reply) => {
        try{
            const { id } = request.params
            const permissions = await this.permissionsRepository.deletePermissionByRoleId(id)
            if(permissions.length === 0){
                return reply.status(401).send({message:'Não foi possível deletar as permissões'})
            }
            return reply.status(200).send({message: "Permissões deletadas com sucesso"})
        }catch (error) {
            console.log(error)
            return reply.status(500).send({message:'Não foi possível deletar as permissões por um erro interno'})
        }

    }
}