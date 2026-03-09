import { IOrderRepository } from '../interfaces/IOrderRepository'
import { IOrderService } from '../interfaces/IOrderService'
import { OrderResponse } from '../types/OrderTypes'

export class OrderService implements IOrderService {
    private orderRepository: IOrderRepository

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository
    }

    async create(input: unknown): Promise<{ success: boolean; data?: OrderResponse; errors?: string[] }> {
        // Validação simples
        const order = input as any
        if (!order.numeroPedido) {
            return { success: false, errors: ['numeroPedido é obrigatório'] }
        }

        const createdOrder = await this.orderRepository.create(order)
        return { success: true, data: createdOrder }
    }

    async findById(orderId: string): Promise<{ success: boolean; data?: OrderResponse; error?: string }> {
        const order = await this.orderRepository.findById(orderId)

        if (!order) {
            return { success: false, error: 'Pedido não encontrado' }
        }

        return { success: true, data: order }
    }
}