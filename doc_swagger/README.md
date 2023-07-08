# fastifyで、swaggerwo使用する
SwaggerをFastifyプロジェクトに統合することは可能です。Fastifyには fastify-swagger というプラグインがあり、これを使用することでSwagger UIとAPIドキュメンテーションを自動的に生成できます。

npmのパッケージを追加する
```
npm i @fastify/swagger
npm i @fastify/swagger-ui
```

以下のコードは、上記のFastifyサーバーと組み合わせてSwaggerを設定します：
```ts
import fastify from 'fastify'
import swagger from 'fastify-swagger'
import { FastifySchema, RouteShorthandOptionsWithHandler } from 'fastify'

const server = fastify()

server.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Shopping API',
      description: 'API documentation for the Shopping service',
      version: '1.0.0'
    },
    host: 'localhost:8080',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
})

// Dummy data array
let shopping = ['りんご', 'ぶどう', 'みかん']

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

// GET endpoint to retrieve data from the shopping array
server.get('/shopping', {
  schema: {
    description: 'Get all items in the shopping list',
    response: {
      200: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  },
  handler: async (request, reply) => {
    return shopping
  }
})

// Define a schema for the POST request body
const postShoppingSchema: FastifySchema = {
  description: 'Add a new item to the shopping list',
  body: {
    type: 'object',
    properties: {
      item: { type: 'string' }
    },
    required: ['item']
  },
  response: {
    200: {
      type: 'array',
      items: { type: 'string' }
    }
  }
}

// POST endpoint to add data to the shopping array
const postShoppingOptions: RouteShorthandOptionsWithHandler = {
  schema: postShoppingSchema,
  handler: async (request, reply) => {
    const { item } = request.body as { item: string }
    shopping.push(item)
    return shopping
  }
}

server.post('/shopping', postShoppingOptions)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

この設定により、http://localhost:8080/documentationでSwagger UIを表示でき、それによりAPIドキュメンテーションを参照したり、APIエンドポイントを直接テストしたりすることが可能になります。