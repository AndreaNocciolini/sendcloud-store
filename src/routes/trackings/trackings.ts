import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../helpers/errors/errorsHelper';
import { trackingsHelper } from "../../helpers/trackings/trackingsHelper"



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get(
        '/:trackingNumber',
        {
            schema: {
                params: {
                    properties: {
                        trackingNumber: {
                            type: 'string'
                        }
                    },
                    required: ['trackingNumber']
                }
            }
        },
        async (request: any, reply: any) => {
            const trackingNumber = request.params.trackingNumber;
            if (!trackingNumber) {
                throw new Error("Please, provide a tracking number.");
            }
            const result = await trackingsHelper.getTrackings(trackingNumber);
            return reply.send(result);
        }
    );
}

export = routes;