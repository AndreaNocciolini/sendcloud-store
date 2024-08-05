import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../helpers/errors/errorsHelper';
import { pickupsHelper } from "../../helpers/pickups/pickupsHelper";



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get('/',
        async (request: any, reply: any) => {
            const result = await pickupsHelper.getPickups();
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
            const pickupId = request.params.id;
            if (!pickupId) {
                throw new Error("Please, provide a pickup id to retrieve");
            }
            const result = await pickupsHelper.getPickups(pickupId);
            return reply.send(result);
        }
    )

    fastify.post(
        '/create',
        async (request: any, reply: any) => {
            const result = await pickupsHelper.getPickups();
            return reply.send(result);
        }
    )
}

export = routes;