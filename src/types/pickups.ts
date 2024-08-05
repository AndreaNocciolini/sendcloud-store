export type BasePickupType = {
    name?: string; // Contact Person Name. Allowed values >= 1 characters.
    company_name?: string | null; // Allowed values >= 1 characters.
    city: string; //  Allowed values >= 1 characters.
    country: string; //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2).
    postal_code: string; //  Allowed values >= 1 characters.
    address: string; // Address line 1 of the pickup, this should include the house number. Allowed values >= 1 characters.
    address_2?: string | null; // Address line 2 of the pickup. Allowed values >= 0 characters.
    country_state?: string | null; // Allowed values >= 1 characters.
    telephone?: string | null; // Contact person telephone number.
    email?: string | null; // Contact person email. Allowed values >= 1 characters.
    pickup_from: string; // ISO 8601 DateTime that indicates from what time the pickup can take place. Preferably specified in UTC. When no timezone information is specified, we will use the timezone of the user their invoice address country. Allowed values >= 1 characters.
    pickup_until?: string | null; // ISO 8601 DateTime that indicates until what time the pickup can take place. Preferably specified in UTC. When no timezone information is specified, we will use the timezone of the user their invoice address country.  Allowed values >= 1 characters.
    quantity: number // Number of parcels that should be picked up. Allowed values >= 1 and <= 9007199254740991.
    total_weight: string | null; // Total weight in kilograms.
    reference?: string | null; // A reference number for your own administration. Allowed values >= 1 characters.
    special_instructions?: string | null; // Special instructions that the driver should take into account.. Allowed values >= 1 characters.
    carrier?: string; // The user selected carrier code for the pickup (ex: dhl_express).
    contract?: number | null; // Id of the contract you want to be used for pickup request.
}

export type FedExPickupType = {

}

export type CorreosExpressPickupType = {

}

export type DHLPickupType = {

}

export type PosteItalianePickupType = {

}

export type UPSPickupType = {

}

export type DPDPickupType = {

}

export type DHLIberiaPickupType = {

}