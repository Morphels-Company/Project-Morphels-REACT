import {sql} from "./db.js";


async function listSumValuesByYear (userId){
    return sql`SELECT TO_CHAR(r.date, 'YYYY') AS ano, TO_CHAR(r.date, 'MM') AS mes, SUM(r.value) AS valor_total
                   FROM revenues r
                            JOIN branches b ON r.branch = b.id
                            JOIN sectors s on s.id = b.sector
                            JOIN sectors us ON s.institution = us.institution
                            JOIN branches ub ON us.id = ub.sector
                            JOIN users u ON u.branch = ub.id
                   WHERE u.id = ${userId}
                   GROUP BY TO_CHAR(r.date, 'YYYY'), TO_CHAR(r.date, 'MM')
                   ORDER BY ano, mes;
            `
}

const revenues = await listSumValuesByYear("028b4c89-116a-42ba-8a67-51b781c4ae9a")
console.log(revenues)