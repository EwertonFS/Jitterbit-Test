export interface OrderResponse {
    orderId: string;
    value: number;
    creationDate: string;
    items: ItemResponse[];
}

export interface ItemResponse {
    productId: number;
    quantity: number;
    price: number;
}

export class ErrorResponse {
    error: string;
    message: string;
    statusCode: number;

    constructor(error: string, message: string, statusCode: number) {
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export class SuccessResponse<T> {
    data: T;
    message: string;
    statusCode: number;

    constructor(data: T, message: string, statusCode: number) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export interface CreateOrderInput {
    numeroPedido: string
    valorTotal: number
    dataCriacao: string
    items: ItemInput[]
}

export interface ItemInput {
    idItem: string
    quantidadeItem: number
    valorItem: number
}