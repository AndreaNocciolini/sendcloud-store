import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { carriersHelper } from '../../helpers/carriers/carriersHelper';

//TODO: fix schema
const carriersTransitTimesSchema = {
    querystring: {
        type: "object",
        properties: {
            "carrier_code": {
                type: "array",
                items: {
                    type: "string"
                }
            },
            "start_date": {
                type: "string"
            },
            "end_date": {
                type: "string"
            },
            "from_country": {
                type: "string"
            },
            "to_country": {
                type: "string"
            },
        },
        required: ["carrier_code"]
    }
}

async function routes(fastify: FastifyInstance, options: FastifyServerOptions) {
    // fastify.get('/',
    //     async (request: any, reply: any) => {
    //         const error = new Error(errorHelper.noResourceFoundMsg());
    //         return reply.code(400).send(error);
    //     }
    // );

    fastify.get(
        '/transit-times',
        {
            schema: carriersTransitTimesSchema
        },
        async (request: any, reply: any) => {
            const { carrier_code, start_date, end_date, from_country, to_country } = request.query;

            const result = await carriersHelper.getCarriersTransitTime({ carrier_code, start_date, end_date, from_country, to_country });
            return reply.send(result);
        }
    );
}

export = routes;