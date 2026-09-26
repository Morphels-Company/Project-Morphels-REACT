// src/core/guards.js
import {sql} from "../../db.js";

export const requireModuleEnabled = (moduleName) => {
    return async (request, reply) => {
        // request.ctx ou request.user vem da autenticação prévia
        const institutionId = request.user.institutionId;

        // Consulta rápida se a instituição tem o módulo ativo
        const [enabled] = await sql`
      SELECT 1 
      FROM institution_modules 
      WHERE institution_id = ${institutionId} 
        AND module = ${moduleName}
      LIMIT 1
    `;

        if (!enabled) {
            return reply.status(403).send({
                message: `O módulo '${moduleName}' não está habilitado para esta instituição.`
            });
        }
    };
};