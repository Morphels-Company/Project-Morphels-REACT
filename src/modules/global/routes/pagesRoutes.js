export default async function pagesRoutes(server) {
    const pagesController = server.controllers.pages

    server.get("/", pagesController.listPages)
    server.get("/count", pagesController.listNumber);
}