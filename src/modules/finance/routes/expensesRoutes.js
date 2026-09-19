export default async function expensesRoutes(server) {
    const expensesController = server.controllers.expenses

    server.post("/", { preHandler: server.checkPermissions("can_add"),handler:  expensesController.create })
    server.get("/", {preHandler: server.checkPermissions("can_view"),handler: expensesController.list})
    server.get("/filter", {preHandler: server.checkPermissions("can_view"),handler: expensesController.filter})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"),handler: expensesController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"),handler: expensesController.delete })
}
