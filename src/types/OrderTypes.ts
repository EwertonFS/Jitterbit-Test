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

export interface ErrorResponse {
    error: string;
    message: string;
    statusCode: number;
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
