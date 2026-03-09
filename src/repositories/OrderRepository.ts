
import { PrismaClient } from '../database/client'
import { IOrderRepository } from '../interfaces/IOrderRepository'
import { CreateOrderInput, OrderResponse, ItemResponse } from '../types/OrderTypes'

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

        return this.mapToOrderResponse(order)
    }

    async findById(orderId: string): Promise<OrderResponse | null> {
        const order = await this.prisma.order.findUnique({
            where: { orderId },
            include: {
                items: true,
            },
        })

        if (!order) {
            return null
        }

        return this.mapToOrderResponse(order)

    }

    async findAll(): Promise<OrderResponse[]> {
        const orders = await this.prisma.order.findMany({
            include: {
                items: true,
            },
        })

        return orders.map((order: any) => this.mapToOrderResponse(order))
    }


    async update(orderId: string, input: CreateOrderInput): Promise<OrderResponse | null> {
        const existingOrder = await this.prisma.order.findUnique({
            where: { orderId },
        })

        if (!existingOrder) {
            return null
        }

        const order = await this.prisma.order.update({
            where: { orderId },
            data: {
                value: input.valorTotal,
                creationDate: new Date(input.dataCriacao),
                items: {
                    deleteMany: {},
                    create: input.items.map((item) => ({
                        productId: parseInt(item.idItem, 10),
                        quantity: item.quantidadeItem,
                        price: item.valorItem,
                    })),
                },
            },
            include: {
                items: true,
            },
        })

        return this.mapToOrderResponse(order)
    }

    async delete(orderId: string): Promise<boolean> {
        const existingOrder = await this.prisma.order.findUnique({
            where: { orderId },
        })

        if (!existingOrder) {
            return false
        }

        await this.prisma.order.delete({
            where: { orderId },
        })

        return true
    }

    async exists(orderId: string): Promise<boolean> {
        const order = await this.prisma.order.findUnique({
            where: { orderId },
            select: { orderId: true },
        })
        return order !== null
    }

    /**
    * Método privado para mapear dados do banco para o formato de resposta
    */
    private mapToOrderResponse(order: any): OrderResponse {
        return {
            orderId: order.orderId,
            value: Number(order.value),
            creationDate: order.creationDate.toISOString(),
            items: order.items.map((item: any): ItemResponse => ({
                productId: item.productId,
                quantity: item.quantity,
                price: Number(item.price),
            })),
        }
    }


}

