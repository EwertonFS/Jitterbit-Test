import 'dotenv/config'
import express from 'express'
import cors from 'cors'


import { OrderRepository } from './repositories/OrderRepository'
import { OrderService } from './services/OrderService'
import { OrderController } from './controllers/OrderController'
import { OrderRoutes } from './routes/OrderRoutes'
import { prisma } from './lib/prisma'


// Injeção de dependências
const prismaClient = prisma;
const orderRepository = new OrderRepository(prismaClient)
const orderService = new OrderService(orderRepository)
const orderController = new OrderController(orderService)
const orderRoutes = new OrderRoutes(orderController)

// Servidor
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'API de Pedidos', status: 'Online' })
})

app.use('/api', orderRoutes.router)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

export default app