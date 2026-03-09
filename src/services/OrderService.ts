import { IOrderRepository } from '../interfaces/IOrderRepository'
import { IOrderService } from '../interfaces/IOrderService'
import { CreateOrderInput, OrderResponse } from '../types/OrderTypes'

export class OrderService implements IOrderService {
    private orderRepository: IOrderRepository

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository
    }

    private validateCreateInput(input: unknown): { valid: boolean; errors: string[] } {
        const errors: string[] = []

        if (!input || typeof input !== 'object') {
            return { valid: false, errors: ['Request body inválido'] }
        }

        const order = input as Record<string, unknown>

        if (!order.numeroPedido || typeof order.numeroPedido !== 'string') {
            errors.push('Campo "numeroPedido" é obrigatório')
        }

        if (order.valorTotal === undefined || typeof order.valorTotal !== 'number') {
            errors.push('Campo "valorTotal" é obrigatório e deve ser um número')
        }

        if (!order.dataCriacao || typeof order.dataCriacao !== 'string') {
            errors.push('Campo "dataCriacao" é obrigatório')
        }

        if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
            errors.push('Campo "items" é obrigatório e deve ter pelo menos um item')
        } else {
            order.items.forEach((item: unknown, index: number) => {
                const itemObj = item as Record<string, unknown>
                if (!itemObj.idItem) {
                    errors.push(`Item ${index}: "idItem" é obrigatório`)
                }
                if (itemObj.quantidadeItem === undefined || typeof itemObj.quantidadeItem !== 'number') {
                    errors.push(`Item ${index}: "quantidadeItem" é obrigatório e deve ser um número`)
                }
                if (itemObj.valorItem === undefined || typeof itemObj.valorItem !== 'number') {
                    errors.push(`Item ${index}: "valorItem" é obrigatório e deve ser um número`)
                }
            })
        }

        return {
            valid: errors.length === 0,
            errors,
        }
    }

    async create(input: unknown): Promise<{ success: boolean; data?: OrderResponse; errors?: string[] }> {
        // Validação simples
        const validation = this.validateCreateInput(input)
        if (!validation.valid) {
            return { success: false, errors: validation.errors }
        }

        const orderInput = input as CreateOrderInput

        const createdOrder = await this.orderRepository.create(orderInput)
        return { success: true, data: createdOrder }
    }

    async findById(orderId: string): Promise<{ success: boolean; data?: OrderResponse; error?: string }> {
        const order = await this.orderRepository.findById(orderId)

        if (!order) {
            return { success: false, error: 'Pedido não encontrado' }
        }

        return { success: true, data: order }
    }


    async findAll(): Promise<{ success: boolean; data: OrderResponse[] }> {
        const orders = await this.orderRepository.findAll()
        return { success: true, data: orders }
    }



    async update(orderId: string, input: unknown): Promise<{ success: boolean; data?: OrderResponse; errors?: string[]; error?: string }> {
        if (!orderId) {
            return { success: false, error: 'ID do pedido é obrigatório' }
        }

        // Valida os dados de entrada
        const validation = this.validateCreateInput(input)
        if (!validation.valid) {
            return { success: false, errors: validation.errors }
        }

        const orderInput = input as CreateOrderInput

        // Atualiza o pedido no banco
        const updatedOrder = await this.orderRepository.update(orderId, orderInput)

        if (!updatedOrder) {
            return { success: false, error: `Pedido com ID ${orderId} não encontrado` }
        }

        return { success: true, data: updatedOrder }
    }

    async delete(orderId: string): Promise<{ success: boolean; error?: string }> {
        if (!orderId) {
            return { success: false, error: 'ID do pedido é obrigatório' }
        }

        const deleted = await this.orderRepository.delete(orderId)

        if (!deleted) {
            return { success: false, error: `Pedido com ID ${orderId} não encontrado` }
        }

        return { success: true }
    }


}