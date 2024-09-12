import { Type, Static } from '@sinclair/typebox';

// Define BasePickupType with Typebox
const BasePickup = Type.Object({
    name: Type.Optional(Type.String({ minLength: 1 })), // Optional, minimum 1 character
    company_name: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional, string or null, minimum 1 character
    city: Type.String({ minLength: 1 }), // Required, minimum 1 character
    country: Type.Union([
        Type.Literal("NL"),
        Type.Literal("DE"),
        Type.Literal("ES"),
        Type.Literal("FR"),
        Type.Literal("IT"),
        Type.Literal("AT")
    ]), // Required, country code (ISO 3166-1 alpha-2)
    postal_code: Type.String({ minLength: 1 }), // Required, minimum 1 character
    address: Type.String({ minLength: 1 }), // Required, minimum 1 character
    address_2: Type.Optional(Type.Union([Type.String(), Type.Null()])), // Optional, can be null
    country_state: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional, can be null
    telephone: Type.Optional(Type.Union([Type.String(), Type.Null()])), // Optional telephone, can be null
    email: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional email, can be null
    pickup_from: Type.String({ minLength: 1 }), // Required, ISO 8601 DateTime, minimum 1 character
    pickup_until: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional, can be null
    quantity: Type.Integer({ minimum: 1, maximum: 9007199254740991 }), // Required, between 1 and max safe integer
    total_weight: Type.Optional(Type.Union([Type.String(), Type.Null()])), // Optional total weight in kg, can be null
    reference: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional reference number, can be null
    special_instructions: Type.Optional(Type.Union([Type.String({ minLength: 1 }), Type.Null()])), // Optional special instructions
    carrier: Type.Optional(Type.String()), // Optional carrier code
    contract: Type.Optional(Type.Union([Type.Integer(), Type.Null()])) // Optional contract ID
});

// OriginDetailType for pickup location details
const OriginDetail = Type.Object({
    package_location: Type.Union([
        Type.Literal("front"),
        Type.Literal("none"),
        Type.Literal("rear"),
        Type.Literal("side")
    ]), // Pickup location
    building_part: Type.Union([
        Type.Literal("apartment"),
        Type.Literal("building"),
        Type.Literal("department"),
        Type.Literal("floor"),
        Type.Literal("room"),
        Type.Literal("suite")
    ]), // Building part for pickup
    company_close_time: Type.String(), // Latest time the driver can pick up
    building_part_description: Type.Optional(Type.String()) // Optional description of building part
});

// FedExPickupType extending BasePickupType
const FedExPickup = Type.Intersect([
    BasePickup,
    Type.Object({
        name: Type.String({ minLength: 1 }), // Required name for FedEx, minimum 1 character
        company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Required company name, can be null
        country: Type.Union([
            Type.Literal("AT"),
            Type.Literal("BE"),
            Type.Literal("DE"),
            Type.Literal("ES"),
            Type.Literal("FR"),
            Type.Literal("GB"),
            Type.Literal("IT"),
            Type.Literal("NL")
        ]), // Required country for FedEx
        telephone: Type.String(), // Required telephone for FedEx
        total_weight: Type.String(), // Required total weight for FedEx
        carrier: Type.String(), // Required carrier code for FedEx
        origin_detail: Type.Object(OriginDetail)
    })
]);

// UPSPickupItemsType for UPS-specific item details
const UPSPickupItems = Type.Object({
    quantity: Type.Integer({ minimum: 1, maximum: 9007199254740991 }), // Number of items, >= 1
    destination_country: Type.String({ minLength: 2, maxLength: 2 }), // ISO 3166-1 alpha-2 country code
    container_code: Type.Union([Type.Literal("01"), Type.Literal("03")]), // Container type
    shipping_method: Type.Union([Type.Literal("007"), Type.Literal("065"), Type.Literal("011")]) // Shipping method
});

// CorreosExpressPickupType extending BasePickupType
const CorreosExpressPickup = Type.Intersect([
    BasePickup,
    Type.Object({
        name: Type.String({ minLength: 1 }), // Required name
        company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Company name, can be null
        country: Type.Union([Type.Literal("AT"), Type.Literal("BE"), Type.Literal("DE"), Type.Literal("ES"), Type.Literal("FR"), Type.Literal("GB"), Type.Literal("IT"), Type.Literal("NL")]), // Required country
        pickup_until: Type.String(), // Required pickup end time
        telephone: Type.String(), // Required telephone
        total_weight: Type.String(), // Required total weight
        carrier: Type.String() // Required carrier
    })
]);

// DHLPickupType extending BasePickupType
const DHLPickup = Type.Intersect([
    BasePickup,
    Type.Object({
        name: Type.String({ minLength: 1 }), // Required name
        company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Required company name, can be null
        country: Type.Union([Type.Literal("BE"), Type.Literal("NL")]), // Country for DHL
        telephone: Type.String(), // Required telephone
        pallet_quantity: Type.Integer({ minimum: 0, maximum: 5 }), // Number of pallets
        total_weight: Type.String(), // Required total weight
        carrier: Type.String() // Required carrier
    })
]);

// PosteItalianePickupType extending BasePickupType
const PosteItalianePickup = Type.Intersect([
    BasePickup,
    Type.Object({
        name: Type.String({ minLength: 1 }), // Required name
        company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Company name, can be null
        country: Type.Literal("IT"), // Required country
        country_state: Type.String({ minLength: 1, maxLength: 5 }), // State code
        telephone: Type.String(), // Required telephone
        total_weight: Type.String(), // Required total weight
        carrier: Type.String() // Required carrier
    })
]);

// UPSPickupType with item details
const UPSPickup = Type.Object({
    name: Type.String({ minLength: 1 }), // Required name
    company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Company name, can be null
    country: Type.Union([Type.Literal("AT"), Type.Literal("BE"), Type.Literal("DE"), Type.Literal("ES"), Type.Literal("FR"), Type.Literal("GB"), Type.Literal("IT"), Type.Literal("NL")]), // Country
    pickup_until: Type.String(), // Required pickup end time
    telephone: Type.String(), // Required telephone
    total_weight: Type.String(), // Required total weight
    carrier: Type.String(), // Required carrier
    items: Type.Array(UPSPickupItems), // Item details array
    is_alternate_address: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])), // Optional flag for alternate address
    is_residential: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])), // Optional flag for residential address
    is_overweight: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])), // Optional flag for overweight packages
    room: Type.Optional(Type.Union([Type.String(), Type.Null()])), // Optional room number
    floor: Type.Optional(Type.Union([Type.String(), Type.Integer(), Type.Null()])) // Optional floor number
});

// DPDPickupType
const DPDPickup = Type.Object({
    name: Type.String({ minLength: 1 }), // Required name
    company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Company name, can be null
    country: Type.Literal("DE"), // Required country
    telephone: Type.String(), // Required telephone
    total_weight: Type.String(), // Required total weight
    carrier: Type.String() // Required carrier
});

// DHLIberiaPickupType
const DHLIberiaPickup = Type.Object({
    name: Type.String({ minLength: 1 }), // Required name
    company_name: Type.Union([Type.String({ minLength: 1 }), Type.Null()]), // Company name, can be null
    country: Type.Union([Type.Literal("ES"), Type.Literal("PT")]), // Required country
    pickup_until: Type.String(), // Required pickup end time
    telephone: Type.String(), // Required telephone
    total_weight: Type.String(), // Required total weight
    carrier: Type.String() // Required carrier
});

type BasePickupType = Static<typeof BasePickup> ;
type FedExPickupType = Static<typeof FedExPickup> ;
type CorreosExpressPickupType = Static<typeof CorreosExpressPickup> ;
type DHLPickupType = Static<typeof DHLPickup> ;
type PosteItalianePickupType = Static<typeof PosteItalianePickup> ;
type DPDPickupType = Static<typeof DPDPickup> ;
type DHLIberiaPickupType = Static<typeof DHLIberiaPickup> ;

// PickupBodyType covering all pickup types
type PickupBodyType = BasePickupType | FedExPickupType | CorreosExpressPickupType | DHLPickupType | PosteItalianePickupType | DPDPickupType | DHLIberiaPickupType;

export {
    PickupBodyType
}