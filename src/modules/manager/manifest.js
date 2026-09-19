export const financeModule = {
    name: 'finance',
    title: 'Módulo Financeiro',
    // Chaves de permissão que este módulo insere na tabela `permissions`
    permissions: [
        'finance.revenue.read',
        'finance.revenue.write',
        'finance.expense.read',
        'finance.expense.write',
    ],
    // Papéis modelo gerados na tabela `roles` ao ativar o módulo
    defaultRoles: [
        {
            name: 'Tesoureiro',
            permissions: ['finance.revenue.read', 'finance.revenue.write', 'finance.expense.read', 'finance.expense.write']
        },
        {
            name: 'Auditor Financeiro',
            permissions: ['finance.revenue.read', 'finance.expense.read'] // Só leitura!
        }
    ]
}