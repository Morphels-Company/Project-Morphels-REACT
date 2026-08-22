export default async function permissionsRoutes(server) {
    const permissionsController = server.controllers.permissions

    server.post("/permissions", {preHandler: server.checkPermissions("can_view"), handler: permissionsController.create})
    server.get("/permissions",{preHandler: server.checkPermissions("can_view"), handler: permissionsController.listViewPermissions})
    server.post("/permissions/list", {preHandler: server.checkPermissions("can_view"), handler: permissionsController.listAllPermissions})
    server.post("/permissions/count/modules", {preHandler: server.checkPermissions("can_view"), handler:permissionsController.listNumberOfPagesWithPermissions})
    server.delete("/permissions/:id", {preHandler: server.checkPermissions("can_view"), handler:permissionsController.delete})
}