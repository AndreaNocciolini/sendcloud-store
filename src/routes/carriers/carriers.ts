import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { genericHelper } from '../../helpers/generic/genericHelpers';
import { mappersHelper } from '../../helpers/generic/mappersHelper';
import { TransitTimesBodyType } from '../../types/generics';


async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

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