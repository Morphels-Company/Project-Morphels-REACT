export default async function dashBordRoutes(server) {
    const dashBoardController = server.controllers.dashboard

    server.post("/", {preHandler: server.checkPermissions("can_view"), handler: dashBoardController.get})
}
