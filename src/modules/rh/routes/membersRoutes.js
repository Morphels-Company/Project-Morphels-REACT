export default async function revenuesRoutes(server) {
    const membersController = server.controllers.members

    server.post("/", {preHandler: server.checkPermissions("can_add"),handler: membersController.create})
    server.get("/", {preHandler: server.checkPermissions("can_view"),handler: membersController.list})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"),handler: membersController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"),handler: membersController.delete})
}
