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

    fastify.get('/orders',
        async (request: any, reply: any) => {
            const result = await orderHelper.getOrders();
            return reply.send(result);
        }
    );

    fastify.get('/orders/:id',
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to retrieve");
            }
            const result = await orderHelper.getOrders(orderId);
            return reply.send(result);
        }
    );

    fastify.post<{ Body: OrderType.SingleOrder }>(
        '/orders/create',
        async (request: any, reply: any) => {
            const order = request.body;
            if (!order) {
                throw new Error("Please, provide an order to send");
            }
            const result = await orderHelper.createOrder(order);
            reply.send(result);
        });

    /* 
    DO UPDATE ORDERS
        fastify.post<{ Body: OrderType.SingleOrder }>(
        '/orders/create',
        async (request: any, reply: any) => {
            const order = request.body;
            if (!order) {
                throw new Error("Please, provide an order to send");
            }
            const result = await orderHelper.createOrder(order);
            reply.send(result);
        });
    */

    fastify.delete<{ Body: number }>(
        '/orders/delete/:id',
        async (request: any, reply: any) => {
            const orderId = request.params.id;
            if (!orderId) {
                throw new Error("Please, provide an order id to delete");
            }
            const result = await orderHelper.deleteOrder(orderId);
            reply.send(result);
        }
    );
}

export = routes;