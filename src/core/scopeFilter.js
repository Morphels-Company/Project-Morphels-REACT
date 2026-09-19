import {sql} from "../../db.js";


export const scopeFilter = (ctx, permissionKey, columnToFilter) => sql`
    ${columnToFilter} IN (
    SELECT c.descendant_id
    FROM role_assignments ra
    JOIN role_permissions rp ON rp.role_id = ra.role_id
    JOIN node_closure c      ON c.ancestor_id = ra.node_id
    WHERE ra.user_id = ${ctx.userId}
    AND rp.permission_key = ${permissionKey}
    )
`;