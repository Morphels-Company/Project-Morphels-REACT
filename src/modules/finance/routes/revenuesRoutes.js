export default async function revenuesRoutes(server) {
    const revenuesController = server.controllers.revenues

    server.post("/", {preHandler: server.checkPermissions("can_add"),handler: revenuesController.create})
    server.get("/", {preHandler: server.checkPermissions("can_view"),handler: revenuesController.list})
    server.post("/filter", {preHandler: server.checkPermissions("can_view"),handler: revenuesController.filter})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"),handler: revenuesController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"),handler: revenuesController.delete})
}
