import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../../helpers/errors/errorsHelper';
import { addressesHelper } from '../../../helpers/shippings/addressesHelper';



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
            const result = await addressesHelper.getAddresses();
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
            const addressId = request.params.id;
            if (!addressId) {
                throw new Error("Please, provide an address id to retrieve");
            }
            const result = await addressesHelper.getAddresses(addressId);
            return reply.send(result);
        }
    )
}

export = routes;