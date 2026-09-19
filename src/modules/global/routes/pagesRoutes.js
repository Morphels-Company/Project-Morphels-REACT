export default async function pagesRoutes(server) {
    const pagesController = server.controllers.pages

    server.get("/pages", pagesController.listPages)
    server.get("/pages/count", pagesController.listNumber);
}