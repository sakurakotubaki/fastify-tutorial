# fastifyの環境構築

はじめに
この例では、FastifyとTypeScriptの使い方を説明します。空白の http Fastify サーバーが作成されます。

新しいnpmプロジェクトを作成し、Fastifyをインストールし、peer dependenciesとしてtypescriptとnode.js typesをインストールします：

```
npm init -y
npm i fastify
npm i -D typescript @types/node
```

package.jsonの "scripts "セクションに以下の行を追加する：
```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node index.js"
  }
}
```
TypeScript 設定ファイルを初期化する：
```
npx tsc --init
```

注意: FastifyDeprecation の警告を回避するには、tsconfig.json の target プロパティを es2017 以上に設定してください。

注意2："moduleResolution" の使用は避けてください：注2：tsconfig.jsonの "moduleResolution": "NodeNext "とpackage.jsonの "type"：package.json の "type": "module" との併用は避けてください。ts(2349) 警告。

index.tsファイルを作成してください。

以下のコードブロックをファイルに追加してください：
```ts
import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

npm run buildを実行します。これでindex.tsがindex.jsにコンパイルされ、Node.jsで実行できるようになります。エラーが発生した場合は、fastify/helpにissueを登録してください。

npm run start を実行して Fastify サーバーを実行します。

コンソールにServer listening at http://127.0.0.1:8080 と表示されるはずです。

curl localhost:8080/ping を使ってサーバーを試してみてください。

curlコマンドでエンドポイントにアクセスする。
```
curl localhost:8080/ping
```