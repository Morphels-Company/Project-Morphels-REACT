const listByIdSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'string',
                pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
            }
        }
    }
}

export default async function institutionsRoutes(server) {
    const institutionsController = server.controllers.institutions

    server.get('/:id', {
        schema: listByIdSchema,
        preHandler: server.checkPermissions("can_view"),
        handler: institutionsController.listById
    })
}
