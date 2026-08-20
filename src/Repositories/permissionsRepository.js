import { sql } from "../../db.js";

export class PermissionsRepository {
    async createPermissions(role_id, page_id, can_view, can_add, can_edit, can_delete, access_scope) {
        return await sql`
            INSERT INTO permissions (role_id, page_id, can_view, can_add, can_edit, can_delete, access_scope)
            SELECT
                ${role_id}::uuid,
                u.page_id,
                u.can_view,
                u.can_add,
                u.can_edit,
                u.can_delete,
                u.access_scope
            FROM UNNEST(
                         ${page_id}::uuid[],
                         ${can_view}::boolean[],
                         ${can_add}::boolean[],
                         ${can_edit}::boolean[],
                         ${can_delete}::boolean[],
                         ${access_scope}::scope_level[]
                 ) AS u(page_id, can_view, can_add, can_edit, can_delete, access_scope)
                RETURNING id;
        `;
    }
    async listPagesViewPermissions(userId) {
        return sql`
            SELECT
                p.can_view,
                pg.name AS page_name
            FROM permissions p
                     JOIN roles r ON p.role_id = r.id
                     JOIN users u ON r.id = u.designation
                     LEFT JOIN pages pg ON p.page_id = pg.id
            WHERE u.id = ${userId}
        `
    }

    async listAllPermissionsByRole(role_id) {
        return sql`
            SELECT
                p.can_view, p.can_add, p.can_edit, p.can_delete, pg.name AS page_name
            FROM permissions p
                JOIN roles r ON p.role_id = r.id
            LEFT JOIN pages pg on p.page_id = pg.id 
            WHERE r.id = ${role_id} 
                `
    }

    async countPagesPermissions(role_id) {
        return sql`
            SELECT
                COUNT(*) FILTER (WHERE can_view = true) AS total_permissions_modules
            FROM permissions
            WHERE role_id = ${role_id}
            GROUP BY role_id;
        `
    }
}