export class PermissionsController {
    constructor(permissionsRepository) {
        this.permissionsRepository = permissionsRepository
    }
    create = async (request, reply) => {
        const {role_id, registers} = request.body
        console.log(role_id, registers)
        const page_id = registers.map(item => item.page_id);
        const can_view = registers.map(item => item.can_view);
        const can_add = registers.map(item => item.can_add);
        const can_edit = registers.map(item => item.can_edit);
        const can_delete = registers.map(item => item.can_delete);
        const access_scope = registers.map(item => item.access_scope);

        try{
            const permissions = await this.permissionsRepository.createPermissions(role_id, page_id, can_view, can_add, can_edit, can_delete, access_scope);
            if (permissions.length < 0){
                return reply.status(403).send({message: "Could not create permissions"});
            }
            return reply.status(201).send({message: "Permission created successfully."});
        }catch(err){
            console.error(err);
            return reply.status(500).send({message: "Could not create permissions"});
        }
    }
    listViewPermissions = async (request, reply)=> {
       try{
           const permissions = await this.permissionsRepository.listPagesViewPermissions(request.userID)
           if(permissions.length < 0){
               return reply.status(400).send({message:'No permissions found.'})
           }
           return reply.status(200).send(permissions)
       } catch (error) {
           console.log(error)
           return reply.status(500).send({message:error.message})
       }
    }
    listAllPermissions = async (request, reply)=> {
        try{
            const permissions = await this.permissionsRepository.listAllPermissionsByRole(request.body.role_id)
            if(permissions.length < 0){
                return reply.status(400).send({message:'No permissions found.'})
            }
            return reply.status(200).send(permissions)
        }catch(error){
            console.log(error)
            return reply.status(500).send({message:error.message})
        }
    }
    listNumberOfPagesWithPermissions = async (request, reply)=> {
        try {
            const total_count_permissions = await this.permissionsRepository.countPagesPermissions(request.body.role_id)
            if(total_count_permissions > 0){
                return reply.status(200).send({message:'Number of pages found'})
            }
            return reply.status(200).send(total_count_permissions)
        }catch(error){
            console.log(error)
            return reply.status(500).send({message:error.message})
        }
    }
}