import { Request, Response } from 'express'
import { IOrderService } from '../interfaces/IOrderService'
import { SuccessResponse } from '../types/OrderTypes'

const HttpStatus = {
    CREATED: 201,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
} as const

export class OrderController {
    private orderService: IOrderService

    constructor(orderService: IOrderService) {
        this.orderService = orderService
    }

    async create(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.orderService.create(request.body)

            if (!result.success) {
                return response.status(HttpStatus.BAD_REQUEST).json({
                    error: 'Bad Request',
                    message: result.errors?.join(', '),
                    statusCode: HttpStatus.BAD_REQUEST
                })
            }

            return response.status(HttpStatus.CREATED).json(
                new SuccessResponse(result.data!, 'Pedido criado com sucesso', HttpStatus.CREATED)
            )
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Internal Server Error',
                message: 'Erro ao criar pedido',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }
    }
}