
import { PrismaClient } from '../database/client'
import { IOrderRepository } from '../interfaces/IOrderRepository'
import { OrderResponse } from '../types/OrderTypes'

export class OrderRepository implements IOrderRepository {
    private prisma: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient
    }

    async create(input: any): Promise<OrderResponse> {
        const order = await this.prisma.order.create({
            data: {
                orderId: input.numeroPedido,
                value: input.valorTotal,
                creationDate: new Date(input.dataCriacao),
                items: {
                    create: input.items.map((item: any) => ({
                        productId: parseInt(item.idItem, 10),
                        quantity: item.quantidadeItem,
                        price: item.valorItem,
                    })),
                },
            },
            include: { items: true },
        })

        return {
            orderId: order.orderId,
            value: Number(order.value),
            creationDate: order.creationDate.toISOString(),
            items: order.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: Number(item.price),
            })),
        }
    }
}

