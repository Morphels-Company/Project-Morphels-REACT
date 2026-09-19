export default async function permissionsRoutes(server) {
    const permissionsController = server.controllers.permissions

    server.post("/", {preHandler: server.checkPermissions("can_view"), handler: permissionsController.create})
    server.get("/",{preHandler: server.checkPermissions("can_view"), handler: permissionsController.listViewPermissions})
    server.post("/list", {preHandler: server.checkPermissions("can_view"), handler: permissionsController.listAllPermissions})
    server.post("/count/modules", {preHandler: server.checkPermissions("can_view"), handler:permissionsController.listNumberOfPagesWithPermissions})
    server.delete("/:id", {preHandler: server.checkPermissions("can_view"), handler:permissionsController.delete})
}