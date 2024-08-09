import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { genericHelper } from '../../helpers/generic/genericHelpers';
import { mappersHelper } from '../../helpers/generic/mappersHelper';
import { TransitTimesBodyType } from '../../types/generics';
import { carriersHelper } from '../../helpers/carriers/carriersHelper';


async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    //TODO: check for Deutsch Post International. AWB (https://api.sendcloud.dev/docs/sendcloud-public-api/air-waybill). Seems useless to me right now, but I should implement it.
    fastify.get(
        '/contracts',
        async (request: any, reply: any) => {
            const result = await carriersHelper.getContracts();
            return reply.send(result);
        }
    );

    fastify.get(
        '/contracts/:id',
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
            const contractId = request.params.id;
            if (!contractId) {
                throw new Error("Please, provide an address id to retrieve");
            }
            const result = await carriersHelper.getContracts(contractId);
            return reply.send(result);
        }
    )

    fastify.post<{ Body: TransitTimesBodyType }>(
        '/transit-times',

        async (request: any, reply: any) => {
            const { carrier_code, start_date, end_date, from_country, to_country } = request.body;
            const cleanData = mappersHelper.cleanRequestBody({ carrier_code, start_date, end_date, from_country, to_country })
            const result = await genericHelper.getTransitTime(cleanData, "carriers");
            return reply.send(result);
        }
    );
}

export = routes;