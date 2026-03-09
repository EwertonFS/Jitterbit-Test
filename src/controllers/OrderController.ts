import { Request, Response } from 'express'
import { IOrderService } from '../interfaces/IOrderService'
import { SuccessResponse, ErrorResponse } from '../types/OrderTypes'

const HttpStatus = {
    CREATED: 201,
    OK: 200,
    NOT_FOUND: 404,
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



    async findById(request: Request, response: Response): Promise<Response> {
        try {
            const { orderId } = request.params
            const result = await this.orderService.findById(orderId as string)

            if (!result.success) {
                return response.status(HttpStatus.NOT_FOUND).json(
                    new ErrorResponse('Not Found', result.error || 'Pedido não encontrado', HttpStatus.NOT_FOUND)
                )
            }

            return response.status(HttpStatus.OK).json(
                new SuccessResponse(result.data!, 'Pedido encontrado', HttpStatus.OK)
            )
        } catch (error) {
            console.error('Erro ao buscar pedido:', error)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                new ErrorResponse('Internal Server Error', 'Erro ao buscar pedido', HttpStatus.INTERNAL_SERVER_ERROR)
            )
        }
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.orderService.findAll()

            return response.status(HttpStatus.OK).json(
                new SuccessResponse(result.data, 'Lista de pedidos', HttpStatus.OK)
            )
        } catch (error) {
            console.error('Erro ao listar pedidos:', error)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                new ErrorResponse('Internal Server Error', 'Erro ao listar pedidos', HttpStatus.INTERNAL_SERVER_ERROR)
            )
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
        try {
            const { orderId } = request.params
            const body = request.body
            const result = await this.orderService.update(orderId as string, body)

            if (!result.success) {
                const status = result.error ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST
                return response.status(status).json(
                    new ErrorResponse(
                        result.error ? 'Not Found' : 'Bad Request',
                        result.error || result.errors?.join(', ') || 'Erro na validação',
                        status
                    )
                )
            }

            return response.status(HttpStatus.OK).json(
                new SuccessResponse(result.data!, 'Pedido atualizado com sucesso', HttpStatus.OK)
            )
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                new ErrorResponse('Internal Server Error', 'Erro ao atualizar pedido', HttpStatus.INTERNAL_SERVER_ERROR)
            )
        }
    }


    async delete(request: Request, response: Response): Promise<Response> {
        try {
            const { orderId } = request.params
            const result = await this.orderService.delete(orderId as string)

            if (!result.success) {
                return response.status(HttpStatus.NOT_FOUND).json(
                    new ErrorResponse('Not Found', result.error || 'Pedido não encontrado', HttpStatus.NOT_FOUND)
                )
            }

            return response.status(HttpStatus.OK).json(
                new SuccessResponse({ deleted: true }, 'Pedido deletado com sucesso', HttpStatus.OK)
            )
        } catch (error) {
            console.error('Erro ao deletar pedido:', error)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                new ErrorResponse('Internal Server Error', 'Erro ao deletar pedido', HttpStatus.INTERNAL_SERVER_ERROR)
            )
        }
    }
}