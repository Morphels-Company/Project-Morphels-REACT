import { sql } from "../../../../db.js";

export class InstitutionsRepository {
    // Busca uma instituição pelo ID, mas só devolve se for a instituição
    // do próprio usuário logado (impede ler dados de outra instituição).
    async listById(institutionId, userId) {
        return sql`
            SELECT i.id, i.name, i.cnpj, i.email, i.phone, i.inscription_date
            FROM institutions i
            WHERE i.id = ${institutionId}
              AND i.id = (
                  SELECT s.institution
                  FROM users u
                  JOIN branches b ON b.id = u.branch
                  JOIN sectors s ON s.id = b.sector
                  WHERE u.id = ${userId}
              )`;
    }
}
