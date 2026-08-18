export default async function permissionsRoutes(server) {
    const permissionsController = server.controllers.permissions

    server.get("/permissions",permissionsController.listViewPermissions)
    server.post("/permissions/list", permissionsController.listAllPermissions)
    server.post("/permissions/count/modules", permissionsController.listNumberOfPagesWithPermissions)
}