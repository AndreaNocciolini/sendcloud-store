// TODO: check again the types and remove duplicate code.

export type OriginDetailType = {
    package_location: "front" | "none" | "rear" | "side"; // Provides a location description where the courier/driver will pick up the package.
    building_part: "apartment" | "building" | "department" | "floor" | "room" | "suite"; // Describe package location building part.
    company_close_time: string; // string<time>. Identifies the latest time at which the driver can gain access to pick up the package. Ex: 17:00:00.
    building_part_description?: string; // Additional description of package pickup location.
}

export type UPSPickupItemsType = {
    quantity: number; // Number of pieces to be picked up. Allowed values >= 1 and <= 9007199254740991.
    destination_country: string; // The destination country (ISO 3166-1 alpha-2 country code). Allowed values = 2 carachters (only 2). Example: NL.
    container_code: "01" | "03"; // Container type combined: * 01 - Package * 03 - Pallet.
    shipping_method: "007" | "065" | "011"; // The Service Codes include: * '007' - UPS Express * '065' - UPS Express Saver * '011' - UPS Standard.
}

export type BasePickupType = {
    name?: string; // Contact Person Name. Allowed values >= 1 characters.
    company_name?: string | null; // Allowed values >= 1 characters.
    city: string; //  Allowed values >= 1 characters.
    country: "NL" | "DE" | "ES" | "FR" | "IT" | "AT"; //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2).
    postal_code: string; //  Allowed values >= 1 characters.
    address: string; // Address line 1 of the pickup, this should include the house number. Allowed values >= 1 characters.
    address_2?: string | null; // Address line 2 of the pickup. Allowed values >= 0 characters.
    country_state?: string | null; // Allowed values >= 1 characters.
    telephone?: string | null; // Contact person telephone number.
    email?: string | null; // Contact person email. Allowed values >= 1 characters.
    pickup_from: string; // ISO 8601 DateTime that indicates from what time the pickup can take place. Preferably specified in UTC. When no timezone information is specified, we will use the timezone of the user their invoice address country. Allowed values >= 1 characters.
    pickup_until?: string | null; // ISO 8601 DateTime that indicates until what time the pickup can take place. Preferably specified in UTC. When no timezone information is specified, we will use the timezone of the user their invoice address country.  Allowed values >= 1 characters.
    quantity: number // Number of parcels that should be picked up. Allowed values >= 1 and <= 9007199254740991.
    total_weight?: string | null; // Total weight in kilograms.
    reference?: string | null; // A reference number for your own administration. Allowed values >= 1 characters.
    special_instructions?: string | null; // Special instructions that the driver should take into account.. Allowed values >= 1 characters.
    carrier?: string; // The user selected carrier code for the pickup (ex: dhl_express).
    contract?: number | null; // Id of the contract you want to be used for pickup request.
}

export type FedExPickupType = BasePickupType & {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for FedEx Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for FedEx Pickup.
    country: "AT" | "BE" | "DE" | "ES" | "FR" | "GB" | "IT" | "NL" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for FedEx.
    telephone: string; // Contact person telephone number. Required for FedEx pickup.
    total_weight: string; // Total weight in kilograms. Required for FedEx pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: fedex). Required for FedEx pickup.
    origin_detail: OriginDetailType;
}

export type CorreosExpressPickupType = BasePickupType & {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for Correos Express Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for Correos Express Pickup.
    country: "AT" | "BE" | "DE" | "ES" | "FR" | "GB" | "IT" | "NL" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for Correos Express.
    pickup_until: string; // ISO 8601 DateTime that indicates until what time the pickup can take place. Preferably specified in UTC. Allowed >= 1 carachters. Required for Correos Express.
    telephone: string; // Contact person telephone number. Required for Correos Express pickup.
    total_weight: string; // Total weight in kilograms. Required for Correos Express pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: correos_express). Required for Correos Express pickup.
}

export type DHLPickupType = BasePickupType & {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for DHL Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for DHL Pickup.
    country: "BE" | "NL" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for DHL.
    telephone: string; // Contact person telephone number. Required for DHL pickup.
    pallet_quantity: number; // Number of pallets that should be picked up.The number of parcels or the number of pallets must be specified. Allowed values >= 0 && <= 5.
    total_weight: string; // Total weight in kilograms. Required for DHL pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: dhl). Required for DHL pickup.
}

export type PosteItalianePickupType = BasePickupType & {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for Poste Italiane Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for Poste Italiane Pickup.
    country: "IT" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for Poste Italiane.
    country_state: string; // ISO 3166-2 country state code. Allowed values >= 1 && <= 5 characters. Different values allowed for Poste Italiane.
    telephone: string; // Contact person telephone number. Required for Poste Italiane pickup.
    total_weight: string; // Total weight in kilograms. Required for Poste Italiane pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: poste_it_delivery). Required for Poste Italiane pickup.
}

export type UPSPickupType = {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for UPS Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for UPS Pickup.
    country: "AT" | "BE" | "DE" | "ES" | "FR" | "GB" | "IT" | "NL" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for UPS Pickup.
    pickup_until: string; // ISO 8601 DateTime that indicates until what time the pickup can take place. Preferably specified in UTC. Allowed >= 1 carachters. Required for UPS Pickup.
    telephone: string; // Contact person telephone number. Required for UPS Pickup.
    total_weight: string; // Total weight in kilograms. Required for UPS Pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: upd). Required for UPS Pickup.
    items: UPSPickupItemsType[]; // The container providing the information about how many items should be picked up.
    is_alternate_address?: boolean | null; // Indicates if pickup address is a different address than that specified in a customer's profile.
    is_residential?: boolean | null; // Indicates if the pickup address is commercial or residential.
    is_overweight?: boolean |  null; // Indicates if at least any package is over 70 lbs or 32 kgs.
    room?: string | null; // Room number. Example: 1.
    floor?: string | number; // Floor number. Example: 2.
}

export type DPDPickupType = {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for DPD Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for DPD Pickup.
    country: "DE" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for DPD Pickup.
    telephone: string; // Contact person telephone number. Required for DPD Pickup.
    total_weight: string; // Total weight in kilograms. Required for DPD Pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: upd). Required for DPD Pickup.
}

export type DHLIberiaPickupType = {
    name: string; // Contact Person Name. Allowed values >= 1 characters. Required for DHL Iberia Pickup.
    company_name: string | null; // Allowed values >= 1 characters. Required for DHL Iberia Pickup.
    country: "ES" | "PT" //  ISO 3166-1 alpha-2 country code. Allowed values = 2 characters (only 2). Different values allowed for DHL Iberia Pickup.
    pickup_until: string; // ISO 8601 DateTime that indicates until what time the pickup can take place. Preferably specified in UTC. Allowed >= 1 carachters. Required for DHL Iberia Pickup.
    telephone: string; // Contact person telephone number. Required for DHL Iberia Pickup.
    total_weight: string; // Total weight in kilograms. Required for DHL Iberia Pickup.
    carrier: string; // The user selected carrier code for the pickup (ex: upd). Required for DHL Iberia Pickup.
}