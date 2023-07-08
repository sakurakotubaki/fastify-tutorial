import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const fastify = Fastify();

fastify.register(fastifySwagger);
fastify.register(fastifySwaggerUi);

let shopping = ['りんご', 'ぶどう', 'みかん']

const shoppingRoutes = async (server: FastifyInstance) => {
  server.get('/', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return shopping
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
    handler: async (
      request: FastifyRequest<{
        Body: {
          item: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
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
