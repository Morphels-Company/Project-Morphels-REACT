export class PagesController {
    constructor(pagesRepository) {
        this.pagesRepository = pagesRepository
    }
    listPages = async (request, reply) => {
        try {
            const pages = await this.pagesRepository.listPages();
            if (pages.length <= 0) {
                return reply.status(404).send({message:'No such page'});
            }
            return reply.status(200).send(pages);
        }catch(err) {
            console.log(err);
            return reply.status(500).send({message:'Internal Server Error'});
        }
    }

    listNumber = async (request, reply) => {
        try {
            const number_of_pages = await this.pagesRepository.listNumberOfPages()
            if (number_of_pages < 0) {
                return reply.status(400).send({message:"Page number found"})
            }
            return reply.status(200).send(number_of_pages)
        } catch (error) {
            console.error(error)
            return reply.status(500).send({message:error.message})
        }
    }
}