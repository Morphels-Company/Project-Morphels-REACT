import { sql } from "../../../../db.js"
export class CardsController {
    constructor(cardsRepository, validationService) {
        this.cardsRepository = cardsRepository
        this.validationService = validationService
    }
    create = async (request, reply) => {
        try{
            const cardCreate = await this.cardsRepository.createCards(request.body, request.userID)
            if (cardCreate.length === 0) {
                return reply.status(303).send({message:"Não foi possível registrar o cartão"})
            }
            return reply.status(201).send({message:"Cartão criado com sucesso"})
        }catch(err){
            return reply.status(500).send({message:"Não foi possível registrar o cartão por um erro interno"})
        }
    }
    list = async (request, reply) => {
        try{
            const cards = await this.validationService.validateAccessScope(this.cardsRepository, request.access_scope, request.userID, request.query.search)
            if (cards.length === 0) {
                return reply.status(401).send({message:"Não foi encontrar nenhum cartão"})
            }
            return reply.status(200).send(cards)
        }catch(err){
            console.log(err)
            return reply.status(500).send({message:"Não foi encontrar nenhum cartão por um erro interno"})
        }
    }
    update = async (request, reply) => {
        try{
            const cardUpdate = await this.cardsRepository.updateCards(request.body, request.params.id)
            if (cardUpdate.length === 0) {
                return reply.status(303).send({message:"Não foi atualizar os dados cartão"})
            }
            return reply.status(201).send({message:"Updated successfully"})
        }catch(err){
            console.log(err)
            return reply.status(501).send({message:"Não foi atualizar os dados cartão por um erro interno"})
        }
    }
    delete = async (request, reply) => {
        try{
            const cardDelete = await this.cardsRepository.deleteCards(request.params.id)
            if (cardDelete.length === 0) {
                return reply.status(401).send({message:"Não foi possível deletar o cartão"})
            }
            return reply.status(200).send({message:"Cartão deletado com sucesso"})
        }catch(err){
            console.log(err)
            return reply.status(400).send({message:"Não foi possível deletar o cartão por um erro interno"})
        }
    }
}