import * as OrderType from "../../types/orders";
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../helpers/errors/errorsHelper';
import { ordersHelper } from "../../helpers/orders/ordersHelper";
import { DocumentsType } from "../../types/documents";



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get('/',
        async (request: any, reply: any) => {
            const result = await ordersHelper.getOrders();
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
                            type: 'number'
                        }
                    },
                    required: ['id']
                }
            }
        },
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to retrieve");
            }
            const result = await ordersHelper.getOrders(orderId);
            return reply.send(result);
        }
    );

    fastify.get<{ Params: { id: number, documentType: DocumentsType } }>(
        'documents/:id/:documentType',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer'
                        },
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
            const result = await ordersHelper.getOrderDocuments(orderId, documentType);
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
            const result = await ordersHelper.createOrder(order);
            reply.send(result);
        });

    /* 
        TODO This route must not create label for an order. Set "request_label" to false everytime
    */
    fastify.put<{ Body: Partial<OrderType.SingleOrder> }>(
        '/update/:id',
        {
            schema: {
                params: {
                    properties: {
                        id: {
                            type: 'number'
                        }
                    },
                    required: ['id']
                }
            }
        },
        async (request: any, reply: any) => {
            const order = request?.body;
            const orderId = Number(request.params?.id);
            if (!order) {
                throw new Error(`Please, provide data to update for order with parcelId: ${orderId}`);
            };
            if (!orderId || Number.isNaN(orderId)) {
                throw new Error("Please, provide a valid order to update.");
            };
            const result = await ordersHelper.updateOrder(order, orderId);
            reply.send(result);
        });

    fastify.delete<{ Body: number }>(
        '/delete/:id',
        {
            schema: {
                params: {
                    properties: {
                        id: {
                            type: 'number'
                        }
                    },
                    required: ['id']
                }
            }
        },
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to delete");
            }
            const result = await ordersHelper.deleteOrder(orderId);
            reply.send(result);
        }
    );

    fastify.get(
        '/statuses', // get Parcel Statuses. Probably useless :P --> https://api.sendcloud.dev/docs/sendcloud-public-api/parcel-statuses/operations/list-parcel-statuses
        async (request: any, reply: any) => {
            const result = await ordersHelper.getOrderStatuses();
            return reply.send(result);
        }
    );
}

export = routes;