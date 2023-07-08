"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)();
fastify.register(swagger_1.default);
fastify.register(swagger_ui_1.default);
let shopping = ['りんご', 'ぶどう', 'みかん'];
const shoppingRoutes = async (server) => {
    server.get('/', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: { type: 'string' }
                }
            }
        },
        handler: async (request, reply) => {
            return shopping;
        }
    });
    server.addSchema({
        $id: 'addItemSchema',
        type: 'object',
        required: ['item'],
        properties: {
            item: {
                type: 'string',
            },
        },
    });
    server.post('/', {
        schema: {
            body: { $ref: 'addItemSchema#' },
            response: {
                201: {
                    type: 'array',
                    items: { type: 'string' }
                },
            },
        },
        handler: async (request, reply) => {
            const body = request.body;
            shopping.push(body.item);
            return reply.code(201).send(shopping);
        },
    });
};
fastify.register(shoppingRoutes, { prefix: 'shopping' });
async function main() {
    await fastify.listen({
        port: 3000,
        host: '0.0.0.0',
    });
}
main().catch(console.error);
