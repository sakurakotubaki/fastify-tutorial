# REST APIを作ってみる
ダミーのデータが入っている配列を定義して、HTTP POST GETができるメソッドを定義する。

```ts
import fastify from 'fastify'
import { FastifySchema, RouteShorthandOptionsWithHandler } from 'fastify'

const server = fastify()

// Dummy data array
let shopping = ['りんご', 'ぶどう', 'みかん']

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

// GET endpoint to retrieve data from the shopping array
server.get('/shopping', async (request, reply) => {
  return shopping
})

// Define a schema for the POST request body
const postShoppingSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      item: { type: 'string' }
    },
    required: ['item']
  }
}

// POST endpoint to add data to the shopping array
const postShoppingOptions: RouteShorthandOptionsWithHandler = {
  schema: postShoppingSchema,
  handler: async (request, reply) => {
    // asを使用して、型アサーションを行う。型アサーションとは、型を明示的に指定すること。
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

JavaScriptにトランスパイルする
```
npm run build
```
簡易サーバーを起動する
```
npm run start
```

このコードは、/shoppingというエンドポイントに対してGETとPOSTリクエストを受け付けます。GETリクエストは現在のショッピングリストを返し、POSTリクエストは新たなアイテムをショッピングリストに追加します。

以下に、curlコマンドを使用して、このAPIにアクセスする方法を示します：

新しいアイテムを追加するPOSTリクエスト：
POSTした後に、追加されたデータが表示される
```
curl -X POST -H "Content-Type: application/json" -d '{"item":"バナナ"}' http://localhost:8080/shopping
```

ショッピングリストを取得するGETリクエスト：
```
curl -X GET http://localhost:8080/shopping
```