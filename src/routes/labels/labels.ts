import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { labelsHelper } from "../../helpers/labels/labelsHelper";
import { BulkPDFLabelPrintingType } from '../../types/labels';



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

    fastify.post<{Body: BulkPDFLabelPrintingType}>(
        '/print-labels',
        async (request: any, reply: any) => {
            const labels = request.body;
            const result = await labelsHelper.bulkPDFLabelPrint(labels);
            return reply.send(result);
        }
    );
}

export = routes;