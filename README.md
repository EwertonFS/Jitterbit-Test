# Jitterbit Test API

API REST para gerenciamento de pedidos desenvolvida com Node.js, Express, TypeScript e Prisma.

## 🏗️ Arquitetura

Este projeto utiliza **Arquitetura MVC (Model-View-Controller)** com **Injeção de Dependência**:

### Padrões de Projeto Utilizados

| Padrão | Descrição |
|--------|------------|
| **MVC** | Separação clara entre Model (repositories), View (routes) e Controller |
| **Repository Pattern** | Abstração da camada de acesso a dados |
| **Service Layer** | Lógica de negócio isolada dos controllers |
| **Dependency Injection** | Inversão de dependência através de interfaces TypeScript |
| **DTO (Data Transfer Object)** | Objetos para transferência de dados entre camadas |

### Estrutura MVC

```
src/
├── controllers/    # 📜 Controladores -处理 requisições HTTP
├── interfaces/     # 📝 Contratos - Definições de interfaces TypeScript
├── lib/           # 🔧 Configurações - Prisma e utilities
├── repositories/  # 💾 Model - Acesso ao banco de dados
├── routes/        | View - Definição de rotas API
├── services/      # ⚙️ Services - Lógica de negócio
└── types/         # 📋 Types - Tipos personalizados
```

### Injeção de Dependência

O projeto utiliza interfaces para definir contratos entre as camadas, permitindo:
- ✅ Fácil substituição de implementações
- ✅ Testes unitários com mocks
- ✅ Melhor manutenção do código

**Exemplo de interface:**
```typescript
interface IOrderRepository {
  create(input: CreateOrderInput): Promise<OrderResponse>;
  findById(orderId: string): Promise<OrderResponse | null>;
  findAll(): Promise<OrderResponse[]>;
  update(orderId: string, input: CreateOrderInput): Promise<OrderResponse | null>;
  delete(orderId: string): Promise<boolean>;
}
```

## 🚀 Deploy

**URL de Produção:** https://jitterbit-test.onrender.com/

## 📚 Documentação da API (Postman)

A documentação interativa está disponível no Postman:

https://ewerton-businees-5185922.postman.co/workspace/51152c07-ae51-43bb-8829-c83ac91fc4d9/documentation/53053181-d633e01a-8ac2-4ac2-950a-ca1526ed7823?sideView=agentMode

### Collection Postman

Para importar a collection localmente, use o arquivo [`Jitterbit-Test-Postman.json`](Jitterbit-Test-Postman.json).

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Health check da aplicação |
| GET | `/api/order` | Listar todos os pedidos |
| GET | `/api/order/:id` | Buscar pedido por ID |
| POST | `/api/order` | Criar novo pedido |
| PUT | `/api/order/:id` | Atualizar pedido existente |
| DELETE | `/api/order/:id` | Deletar pedido |

### Exemplos de Requisições

#### Criar Pedido
```json
POST /api/order
{
  "numeroPedido": "PED-001",
  "valorTotal": 150.00,
  "dataCriacao": "2024-01-15T10:30:00Z",
  "items": [
    {
      "idItem": "1",
      "quantidadeItem": 2,
      "valorItem": 50.00
    },
    {
      "idItem": "2",
      "quantidadeItem": 1,
      "valorItem": 50.00
    }
  ]
}
```

#### Estrutura do Pedido
```json
{
  "orderId": "PED-001",
  "value": 150.00,
  "creationDate": "2024-01-15T10:30:00.000Z",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 50.00
    }
  ]
}
```

## 🛠️ Tecnologias

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL

## 📦 Instalação Local

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção (após build)
npm start
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` com a seguinte variável:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

## 📁 Estrutura do Projeto

```
src/
├── controllers/    # Controladores da aplicação
├── interfaces/     # Definições de interfaces TypeScript
├── lib/           # Configurações e utilities
├── repositories/   # Repositórios de dados
├── routes/        # Definição de rotas
├── services/      # Lógica de negócio
└── types/         # Tipos personalizados
```

## 🔄 Fluxo Completo de Teste

O fluxo completo de teste inclui:
1. Criar pedido
2. Consultar pedido criado
3. Atualizar pedido
4. Verificar atualização
5. Deletar pedido
6. Confirmar deleção (espera 404)

Consulte a documentação no Postman para executar o fluxo completo.

## 📋 Future Implementations / Tasks

Lista de melhorias e implementações futuras para o projeto:

### 🔴 Alta Prioridade

- [ ] **Exportar métodos das classes para facilitar testes com mock**
  - Currently as classes têm métodos privados que dificultam testes unitários
  - Implementar padrão Factory Pattern ou exportar construtores, para substituir   Static (Método Estático)
  - Adicionar Jest para testes unitários e integração

- [ ] **Adicionar autenticação (JWT)**
  - Implementar login com JWT tokens
  - Proteger rotas autenticadas
  - Adicionar roles e permissões

### 🟡 Média Prioridade

- [ ] **Validação de dados com Zod**
  - Substituir validações manuais por Zod
  - Tipos mais robustos e reutilizáveis

- [ ] **Logging e Monitoramento**
  - Adicionar Winston ou Pino para logs
  - Integração com ferramentas de monitoramento

- [ ] **Tratamento de erros centralizado**
  - Middleware de erro global
  - Padronização de respostas de erro

### 🟢 Baixa Prioridade

- [ ] **Paginação**
  - Adicionar paginação em listagens
  - Parâmetros limit e offset

- [ ] **Cache**
  - Implementar cache com Redis
  - Melhorar performance em consultas frequentes

- [ ] **Testes E2E**
  - Adicionar testes end-to-end com Cypress ou Playwright

- [ ] **Docker**
  - Criar Dockerfile para containerização
  - Configuração para desenvolvimento local
