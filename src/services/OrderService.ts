import { OrderResponse } from '../types/OrderTypes'

export interface IOrderService {
    create(input: unknown): Promise<{ success: boolean; data?: OrderResponse; errors?: string[] }>

}