import { OrderResponse } from '../types/OrderTypes'

export interface IOrderRepository {
    create(input: any): Promise<OrderResponse>

}