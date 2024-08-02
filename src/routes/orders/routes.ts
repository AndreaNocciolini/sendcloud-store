import * as OrderType from "../../types/orders";
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorHelper } from '../../helpers/error/error';
import { orderHelper } from "../../helpers/order/order";



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get('/',
        async (request: any, reply: any) => {
            const result = await orderHelper.getOrders();
            return reply.send(result);
        }
    );

    fastify.get('/:id',
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to retrieve");
            }
            const result = await orderHelper.getOrders(orderId);
            return reply.send(result);
        }
    );

    fastify.get<{ Params: { id: number, documentType: DocumentType } }>(
        'documents/:id/:documentType',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        documentType: { 
                            type: 'string',
                            enum: ["air-waybill", "cn23", "cn23-default", "commercial-invoice", "cp71", "label", "qr"] // double check for documentType
                        }
                    },
                    required: ['id', 'documentType']
                }
            }
        },
        async (request: any, reply: any) => {
            const orderId = Number(request.params.id);
            const documentType = request.params.documentType;
            const result = await orderHelper.getOrderDocuments(orderId, documentType);
            return reply.send(result);
        }
    );

    fastify.post<{ Body: OrderType.SingleOrder }>(
        '/create',
        async (request: any, reply: any) => {
            const order = request.body;
            if (!order) {
                throw new Error("Please, provide an order to send");
            }
            const result = await orderHelper.createOrder(order);
            reply.send(result);
        });


    fastify.put<{ Body: Partial<OrderType.SingleOrder> }>(
        '/update/:id',
        async (request: any, reply: any) => {
            const order = request?.body;
            const orderId = Number(request.params?.id);
            if (!order) {
                throw new Error(`Please, provide data to update for order with parcelId: ${orderId}`);
            };
            if (!orderId || Number.isNaN(orderId)) {
                throw new Error("Please, provide a valid order to update.");
            };
            const result = await orderHelper.updateOrder(order, orderId);
            reply.send(result);
        });

    fastify.delete<{ Body: number }>(
        '/delete/:id',
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to delete");
            }
            const result = await orderHelper.deleteOrder(orderId);
            reply.send(result);
        }
    );

    fastify.get(
        '/statuses', // get Parcel Statuses. Probably useless :P --> https://api.sendcloud.dev/docs/sendcloud-public-api/parcel-statuses/operations/list-parcel-statuses
        async (request: any, reply: any) => {
            const result = await orderHelper.getOrderStatuses();
            return reply.send(result);
        }
    );
}

export = routes;