/**
 * Interfaces - Contratos para Injeção de Dependência
 * Desafio Jitterbit - src3
 */

import { OrderResponse } from '../types/OrderTypes'

/**
 * Interface para Service de Orders
 * Abstrai a lógica de negócio
 */
export interface IOrderService {
    create(input: unknown): Promise<{ success: boolean; data?: OrderResponse; errors?: string[] }>

}
