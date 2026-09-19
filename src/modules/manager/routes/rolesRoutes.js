export default async function rolesRoutes(server) {
    const rolesController = server.controllers.roles

    server.post("/", {preHandler: server.checkPermissions("can_add"),handler: rolesController.create})
    server.get("/", {preHandler: server.checkPermissions("can_view"),handler: rolesController.list})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"),handler: rolesController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"),handler: rolesController.delete})
}
