import pagesRoutes from "./routes/pagesRoutes.js";
import { requireModuleEnabled } from '../../core/guards.js';

export async function globalModule(server, options) {

    // server.addHook('preHandler', requireModuleEnabled('global'));

    server.register(pagesRoutes, { prefix: '/pages' });

}