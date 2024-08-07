import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../../helpers/errors/errorsHelper';
import { shippingMethodsHelper } from '../../../helpers/shippings/shippingMethodsHelper';



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get(
        '/',
        async (request: any, reply: any) => {
            const result = await shippingMethodsHelper.getShippingMethods();
            return reply.send(result);
        }
    );

    fastify.get(
        '/:id',
                {
            schema: {
                params: {
                    properties: {
                        id: {
                            type: 'integer'
                        }
                    },
                    required: ['id']
                }
            }
        },
        async (request: any, reply: any) => {
            const shippingMethodId = request.params.id;
            if (!shippingMethodId) {
                throw new Error("Please, provide a shipping method id to retrieve");
            }
            const result = await shippingMethodsHelper.getShippingMethods(shippingMethodId);
            return reply.send(result);
        }
    )
}

export = routes;