import { Type, Static } from '@sinclair/typebox';

const TransitTimesBody = Type.Intersect([
    Type.Object({
        carrier_code: Type.Array(Type.String()), // Array of carrier codes
        start_date: Type.Optional(Type.String({ format: "date" })), // Optional start date (ISO 8601 format)
        end_date: Type.Optional(Type.String({ format: "date" })), // Optional end date (ISO 8601 format)
        from_country: Type.Optional(Type.String({ minLength: 2, maxLength: 2 })), // Optional origin country (ISO 3166-1 alpha-2)
        to_country: Type.Optional(Type.String({ minLength: 2, maxLength: 2 })) // Optional destination country (ISO 3166-1 alpha-2)
    }),
    Type.Object({
        shipping_method_code: Type.Array(Type.String()) // Array of shipping methods
    })
]);

type TransitTimesBodyType = Static<typeof TransitTimesBody>;

export {
    TransitTimesBodyType
}
