// src/modules/finance/index.js
import cardsRoutes from 'routes/cardsRoutes.js';
import usersRoutes from 'routes/usersRoutes.js';
import membersRoutes from 'routes/membersRoutes.js';
import companiesRoutes from 'routes/companiesRoutes.js';

import { requireModuleEnabled } from '../../core/guards.js';

export async function rhModule(server, options) {

    server.addHook('preHandler', requireModuleEnabled('rh'));

    server.register(cardsRoutes, { prefix: '/cards' });
    server.register(usersRoutes, { prefix: '/users' });
    server.register(membersRoutes, { prefix: '/members' });
    server.register(companiesRoutes, { prefix: '/companies' });
}