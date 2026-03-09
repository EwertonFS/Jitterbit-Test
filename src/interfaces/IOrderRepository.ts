/**
 * Interfaces - Contratos para Injeção de Dependência
 * Desafio Jitterbit - src3
 */

import { CreateOrderInput, OrderResponse } from '../types/OrderTypes'

/**
 * Interface para Repository de Orders
 * Abstrai a implementação do banco de dados
 */
export interface IOrderRepository {
    create(input: CreateOrderInput): Promise<OrderResponse>
    findById(orderId: string): Promise<OrderResponse | null>
    findAll(): Promise<OrderResponse[]>
    update(orderId: string, input: CreateOrderInput): Promise<OrderResponse | null>
    delete(orderId: string): Promise<boolean>


}
