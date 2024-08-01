import * as OrderType from "../types/orders";
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorHelper } from '../helpers/error/error';
import { orderHelper } from "../helpers/order/order";



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    fastify.get('/',
        async (request: any, reply: any) => {
            const error = new Error(errorHelper.noResourceFoundMsg());
            return reply.code(400).send(error);
        }
    );

    fastify.get('/orders',
        async (request: any, reply: any) => {
            const result = await orderHelper.getOrders();
            return reply.send(result);
        }
    );

    fastify.post<{ Body: OrderType.SingleOrder }>(
        '/order/create/no-label',
        async (request: any, reply: any) => {
            const order = request.body;
            if (!order) {
                throw new Error("Please, provide an order to send");
            }
            order.parcel.request_label = false;
            const result = await orderHelper.createOrderNoLabel(order);
            reply.send(result);
        });

    fastify.post<{ Body: OrderType.SingleOrder }>(
        '/order/create/yes-label',
        async (request: any, reply: any) => {
            const order = request.body;
            if (!order) {
                throw new Error("Please, provide an order to send");
            }
            order.parcel.request_label = true;
            const result = await orderHelper.createOrderNoLabel(order);
            reply.send(result);
        });
}

export = routes;