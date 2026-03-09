import { Router } from 'express'
import { IOrderController } from '../interfaces/IOrderController'

export class OrderRoutes {
    public router: Router
    private orderController: IOrderController

    constructor(orderController: IOrderController) {
        this.orderController = orderController
        this.router = Router()
        this.routes()
    }

    private routes(): void {
        this.router.post('/order', (req, res) => this.orderController.create(req, res))
        this.router.get('/order/:orderId', (req, res) => this.orderController.findById(req, res))
        this.router.put('/order/:orderId', (req, res) => this.orderController.update(req, res))
    }
}