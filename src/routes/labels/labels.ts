import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { labelsHelper } from "../../helpers/labels/labelsHelper";
import { BulkPDFLabelPrintingType, MultiPDFLabels } from '../../types/labels';



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
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

    fastify.post<{ Body: BulkPDFLabelPrintingType }>(
        '/print-labels',
        async (request: any, reply: any) => {
            const labels = request.body;
            const result = await labelsHelper.bulkPDFLabelPrint(labels);
            return reply.send(result);
        }
    );

    /* 
        Retrieve a shipping label for a specific parcel in PDF format for a normal printer.
    */
    fastify.get(
        '/pdf-label/:id',
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
            const result = await labelsHelper.getPDFLabel(orderId);
            return reply
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', `attachment; filename=label-${orderId}.pdf`)
                .send(result ? Buffer.from(result) : {});
        }
    );

    fastify.post<{ Body: MultiPDFLabels }>(
        '/pdf-labels',
        async (request: any, reply: any) => {
            const pdfLabels = request.body;
            const result = await labelsHelper.getMultiplePDFLabel(pdfLabels);
            return reply
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', `attachment; filename=label-${pdfLabels.ids.toString()}.pdf`)
                .send(result ? Buffer.from(result) : {});
        }
    );

    /* 
        Retrieve a shipping label for a specific parcel in PDF format for a specific printer.
        TO CHECK
    */
    fastify.post<{ Body: MultiPDFLabels }>(
        '/label_printer/pdf-label',
        async (request: any, reply: any) => {
            const orderId = request.body.ids;
            const result = await labelsHelper.getPDFLabelSpecificPrinter(orderId);
            return reply
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', `attachment; filename=label-${orderId}.pdf`)
                .send(result ? Buffer.from(result) : {});
        }
    );

    /* 
        Retrieve a shipping label for a specific parcel in PDF format for a specific printer.
        TO CHECK
    */
    fastify.post<{ Body: MultiPDFLabels }>(
        '/label_printer/pdf-labels',
        async (request: any, reply: any) => {
            const pdfLabels = request.body;
            const result = await labelsHelper.getMultiplePDFLabelSpecificPrinter(pdfLabels);
            return reply
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', `attachment; filename=label-${pdfLabels.ids.toString()}.pdf`)
                .send(result ? Buffer.from(result) : {});
        }
    );
}

export = routes;