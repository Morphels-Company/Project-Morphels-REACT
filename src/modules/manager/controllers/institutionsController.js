export class InstitutionsController {
    constructor(institutionsRepository) {
        this._institutionsRepository = institutionsRepository;
    }

    listById = async (request, reply) => {
        try {
            const institution = await this._institutionsRepository.listById(
                request.params.id,
                request.userID
            );

            // o Neon devolve sempre um array de linhas
            if (institution.length === 0) {
                return reply.status(404).send({ message: 'Instituição não encontrada' });
            }

            return reply.status(200).send(institution[0]);
        } catch (err) {
            console.error(err);
            return reply.status(500).send({ message: 'Não foi possível buscar a instituição' });
        }
    }
}
