import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { carriersHelper } from '../../helpers/carriers/carriersHelper';
import { genericHelper } from '../../helpers/generic/genericHelper';
import { CarrierTransitTimesBodyType } from '../../types/carriers';


async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.post<{ Body: CarrierTransitTimesBodyType }>(
        '/transit-times',

        async (request: any, reply: any) => {
            const { carrier_code, start_date, end_date, from_country, to_country } = request.body;
            const cleanData = genericHelper.cleanRequestBody({ carrier_code, start_date, end_date, from_country, to_country })
            const result = await carriersHelper.getCarriersTransitTime(cleanData);
            return reply.send(result);
        }
    );
}

export = routes;