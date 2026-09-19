export default async function companiesRoutes(server) {
    const companiesController = server.controllers.companies

    server.post("/", {preHandler: server.checkPermissions("can_add"),handler: companiesController.create})
    server.get("/", {preHandler: server.checkPermissions("can_view"),handler: companiesController.list})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"),handler: companiesController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"),handler: companiesController.delete})
}
