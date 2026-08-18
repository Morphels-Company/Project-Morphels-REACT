export class PermissionsController {
    constructor(permissionsRepository) {
        this.permissionsRepository = permissionsRepository
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