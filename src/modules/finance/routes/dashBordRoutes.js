export default async function dashBordRoutes(server) {
    const dashBoardController = server.controllers.dashboard

    server.post("/", {preHandler: server.checkPermissions("can_add"), handler: dashBoardController.get})
}
