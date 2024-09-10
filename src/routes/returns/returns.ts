import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { errorsHelper } from '../../helpers/errors/errorsHelper';
import { returnsHelper } from '../../helpers/returns/returnsHelper';
import { returnsPortalHelper } from '../../helpers/returns/returnsPortalHelper';
import { ReturnPortalOPQueryType } from '../../types/returns';



async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get('/',
        async (request: any, reply: any) => {
            const result = await returnsHelper.getReturns();
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
            const returnId = request.params.id;
            if (!returnId) {
                throw new Error("Please, provide a return id to retrieve");
            }
            const result = await returnsHelper.getReturns(returnId);
            return reply.send(result);
        }
    );

    //TODO: add Return Portals!!! https://api.sendcloud.dev/docs/sendcloud-public-api/return-portal/operations/create-a-brand-return-portal-incoming
    //The path indicates /brands, but still, I think I should add the routes here

    fastify.get(
        '/return_portal/:brand_domain',
        {
            schema: {
                params: {
                    properties: {
                        brand_domain: {
                            type: 'string'
                        }
                    },
                    required: ['brand_domain']
                }
            }
        },
        async (request: any, reply: any) => {
            const brandDomain = request.params.brand_domain;
            if (!brandDomain) {
                throw new Error("Please, provide a valid Brand Id");
            }
            const result = await returnsPortalHelper.getReturnsPortalSettings(brandDomain);
            return reply.send(result);
        }
    );

    fastify.post<{ Body: ReturnPortalOPQueryType }>(
        '/return_portal/:brand_domain/outgoing',
        {
            schema: {
                params: {
                    properties: {
                        brand_domain: {
                            type: 'string'
                        }
                    },
                    required: ['brand_domain']
                }
            }
        },
        async (request: any, reply: any) => {
            const brandDomain = request.params.brand_domain;
            if (!brandDomain) {
                throw new Error("Please, provide a valid Brand Id");
            }
            const result = await returnsPortalHelper.getReturnsPortalOutgoingParcels(brandDomain, request.body);
            return reply.send(result);
        }
    );
}

export = routes;