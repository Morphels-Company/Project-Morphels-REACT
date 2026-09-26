export default async function cardsRoutes(server) {
    const cardsController = server.controllers.cards

    server.post("/", {preHandler: server.checkPermissions("can_add"), handler: cardsController.create})
    server.get("/", {preHandler: server.checkPermissions("can_view"), handler: cardsController.list})
    server.put("/:id", {preHandler: server.checkPermissions("can_edit"), handler: cardsController.update})
    server.delete("/:id", {preHandler: server.checkPermissions("can_delete"), handler: cardsController.delete})
}