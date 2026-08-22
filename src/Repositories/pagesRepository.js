import {sql} from "../../db.js";

export class PagesRepository {
    listPages() {
        return sql`SELECT * FROM pages`
    }

    async listNumberOfPages () {
        return sql`SELECT COUNT(name) AS number_of_pages FROM pages `
    }
}