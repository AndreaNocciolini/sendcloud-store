import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { labelsHelper } from "../../helpers/labels/labelsHelper";



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

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
            const orderId = request.params.id;
            const result = await labelsHelper.getLabel(orderId);
            return reply.send(result);
        }
    );
}

export = routes;