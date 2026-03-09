/**
 * Interfaces - Contratos para Injeção de Dependência
 * Desafio Jitterbit - src3
 */

/**
 * Interface para Controller de Orders
 * Abstrai o tratamento de requisições HTTP
 */
export interface IOrderController {
    create(request: any, response: any): Promise<any>
}