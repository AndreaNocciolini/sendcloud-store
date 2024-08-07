import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { shippingPricesHelper } from '../../../helpers/shippings/shippingPricesHelper';

const shippingPricesSchema = {
    querystring: {
        type: "object",
        properties: {
            "from_country": {
                type: "string",
                enum: ["AW", "AF", "AO", "AI", "AX", "AL", "AD", "AE", "AR", "AM", "AS", "AQ", "TF", "AG", "AU", "TA", "ZB", "IB", "EB", "JB", "QB", "FB", "DB", "GB", "HB", "SB", "AB", "LB", "BY", "BZ", "BM", "BO", "BR", "BB", "NB", "TB", "VB", "WC", "FC", "AC", "CC", "HC", "LC", "NC", "IC", "MC", "CD", "CG", "CK", "CO", "KM", "CV", "CR", "CU", "CW", "CX", "KY", "YC", "YZ", "DE", "DJ", "MD", "KD", "OD", "ZE", "CE", "GE", "RE", "HE", "SE", "ET", "FI", "FJ", "FK", "FR", "FO", "FM", "GA", "EG", "GG", "HG", "IG", "NG", "PG", "MG", "WG", "QG", "RG", "GD", "GL", "GT", "FG", "UG", "YH", "KH", "MH", "HN", "HR", "HT", "HU", "ID", "IM", "IN", "IO", "IE", "IR", "IQ", "IS", "IL", "IT", "JM", "JE", "JO", "JP", "KZ", "KE", "KG", "IK", "NK", "KR", "KW", "LA", "LR", "LY", "KL", "SL", "TL", "UL", "VM", "OM", "CM", "DM", "GM", "XM", "HM", "ML", "MT", "MM", "EM", "NM", "PM", "ZP", "MR", "MS", "MQ", "MU", "YY", "TN", "AN", "CN", "EN", "FN", "UN", "NL", "NO", "NP", "RN", "NZ", "PK", "PA", "PN", "PE", "PH", "PW", "PL", "PR", "KP", "PT", "PY", "PS", "PF", "QA", "OR", "UR", "WS", "DS", "NS", "SS", "HS", "JS", "BS", "LS", "VS", "OP", "ST", "RS", "KS", "SZ", "XS", "CS", "YT", "CT", "DT", "JT", "KT", "LT", "OT", "TT", "NR", "TV", "TW", "TZ", "UA", "UM", "UY", "US", "UZ", "VA", "VC", "VE", "VG", "VI", "NV", "UW", "FW", "SY", "EZ", "AZ", "MZ", "WI"]
            },
            "shipping_method_id": {
                type: "number"
            },
            "weight": {
                type: "number"
            },
            "weight_unit": {
                type: "string",
                enum: ["kilogram", "gram"]
            },
        },
        required: ["from_country", "shipping_method_id", "weight", "weight_unit"]
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
        '/',
        {
            schema: shippingPricesSchema
        },
        async (request: any, reply: any) => {
            const { from_country, shipping_method_id, weight, weight_unit } = request.query;
            const result = await shippingPricesHelper.getShippingPrices({from_country, shipping_method_id, weight, weight_unit});
            return reply.send(result);
        }
    );
}

export = routes;