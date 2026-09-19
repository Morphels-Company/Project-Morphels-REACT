import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import usersRoutes from "./src/modules/rh/routes/usersRoutes.js";
import revenuesRoutes from "./src/modules/finance/routes/revenuesRoutes.js";
import expensesRoutes from "./src/modules/finance/routes/expensesRoutes.js";
import membersRoutes from "./src/modules/rh/routes/membersRoutes.js";
import companiesRoutes from "./src/modules/rh/routes/companiesRoutes.js";
import rolesRoutes from "./src/modules/manager/routes/rolesRoutes.js";
import sectorsRoutes from "./src/modules/manager/routes/sectorsRoutes.js";
import churchesRoutes from "./src/modules/manager/routes/branchesRoutes.js";
import reportsRoutes from "./src/modules/finance/routes/reportsRoutes.js";
import cardsRoutes from "./src/modules/rh/routes/cardsRoutes.js";
import dashBordRoutes from "./src/modules/finance/routes/dashBordRoutes.js";
import permissionsRoutes from "./src/modules/manager/routes/permissionsRoutes.js";
import pagesRoutes from "./src/modules/global/routes/pagesRoutes.js";
import containerPlugin from "./src/Services/containerPlugin.js";
import {sql} from "./db.js";


const server = Fastify({ logger: true })

// CORS primeiro
await server.register(cors, {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
})

// JWT e cookies
await server.register(jwt, {
    secret: process.env.JWT_SECRET_KEY,
    cookie: {
        cookieName: 'token',
        signed: false
    } })

await server.register(cookie)
await server.register(containerPlugin)

// Rotas
server.register(usersRoutes)
server.register(revenuesRoutes)
server.register(expensesRoutes)
server.register(membersRoutes)
server.register(companiesRoutes)
server.register(rolesRoutes)
server.register(sectorsRoutes)
server.register(churchesRoutes)
server.register(reportsRoutes)
server.register(cardsRoutes)
server.register(dashBordRoutes)
server.register(permissionsRoutes)
server.register(pagesRoutes)


// Middlewares
server.addHook('preHandler', async (request, reply) => {
    if (request.method === 'OPTIONS') {
        return reply.status(204).send();
    }

    const publicRoutes = ['/users/login'];
    if (publicRoutes.includes(request.url)) {
        return;
    }

    try {
        const decoded = await request.jwtVerify();
        request.userID = decoded.sub;
        request.userBranch = decoded.branch;
    } catch (err) {
        return reply.status(401).send({ error: 'Invalid or expired token.' });
    }
});

const ACTIONS = new Set(['can_view', 'can_add', 'can_edit', 'can_delete']);

server.decorate('checkPermissions', (action) => {
    if (!ACTIONS.has(action)) throw new Error(`Ação inválida: ${action}`); // falha ao subir o servidor
    return async (request, reply) => {
        const pageName = (request.routeOptions?.url ?? request.url.split('?')[0]).split('/')[1];
        const [perm] = await sql`
            SELECT p.can_view, p.can_add, p.can_edit, p.can_delete, p.access_scope
            FROM users u
                     JOIN permissions p ON p.role_id = u.designation
                     JOIN pages pg ON pg.id = p.page_id
            WHERE u.id = ${request.userID}
              AND pg.name = ${pageName}`;

        if (!perm || perm[action] !== true) return reply.status(403).send({message: 'Forbidden'});
        request.access_scope = perm.access_scope;
    };
});



// Start
const start = async () => {
    try {
        await server.listen({
            port: process.env.PORT || 3000,
            host: "0.0.0.0"
        })
        console.log('🚀 Servidor rodando em http://localhost:3000')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start().then()
