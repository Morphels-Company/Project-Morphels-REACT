// src/modules/finance/index.js
import revenuesRoutes from "./routes/revenuesRoutes.js";
import expensesRoutes from "./routes/expensesRoutes.js";
import dashBordRoutes from "./routes/dashBordRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import { requireModuleEnabled } from '../../core/guards.js';

export async function financeModule(server, options) {

    // server.addHook('preHandler', requireModuleEnabled('finance'));

    server.register(revenuesRoutes, { prefix: '/revenues' });
    server.register(expensesRoutes, { prefix: '/expenses' });
    server.register(dashBordRoutes, { prefix: '/dashboard' });
    server.register(reportsRoutes, { prefix: '/reports' });
}