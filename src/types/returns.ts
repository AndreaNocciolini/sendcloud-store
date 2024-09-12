import { Type, Static } from '@sinclair/typebox';

/* 
    Map Legend:
    - OP --> Outgoing Parcel
*/

const ReturnPortalOPQuery = Type.Object({
    identifier: Type.String({ minLength: 1 }), // Required identifier, must be at least 1 character
    postal_code: Type.String({ minLength: 1 }), // Required postal code, must be at least 1 character
    omit_service_point: Type.Optional(Type.Boolean()) // Optional boolean to omit service point info, defaults to false
});

type ReturnPortalOPQueryType = Static<typeof ReturnPortalOPQuery>;

export {
    ReturnPortalOPQueryType
}