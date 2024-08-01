export type ShipmentObject = {
    id: number; // ID of shipping method
    name?: string; // Name of shipping method
}

export type ParcelItemObjectProperties = {
    [key: string]: string;
}

export type CustomsShipmentType = 0 | 1 | 2 | 3 | 4;  // Customs shipment type. Allowed values: 0(Gift), 1(Documents),2(Commercial Goods),3(Commercial Sample),4(Returned Goods).

export type ExportType = "private" | "commercial_b2c" | "commercial_b2b"; // Export type documentation serves to categorize international shipments into three primary classifications: Private exports, intended for personal use; Commercial B2C exports, directed towards individual consumers; and Commercial B2B exports, involving business-to-business transactions. These distinctions facilitate adherence to regulatory requirements and ensure the orderly movement of goods across international boundaries. Default: commercial_b2c;

export type ImporterOfRecordType = {
    name: string; // Name of IOR (Importer Of Record). Allowed values <= 75 characters.
    address_1: string; // Address of IOR. Allowed values <= 150 characters.
    city: string; // City of IOR. Allowed values <= 30 characters.
    postal_code: string; // IOR's postal code. Allowed value >= 12 characters.
    country_code: string; // IOR's country. ISO 3166-1 alpha-2 code. Allowed values <= 2 characters.
    company_name?: string; // IOR's company name. Allowed value <= 50 characters.
    address_2?: string; // Additional address information, e.g. 2nd level. Allowed values <= 150 characters.
    house_number?: string; // IOR house number. Allowed values <= 20 characters.
    country_state?: string; // Code of the state (e.g. NY for New York) or province (e.g. RM for Rome). Destinations that require this field are USA, Canada, Italy and Australia. Format ISO-3166-2. (Ex: IT-RM). Allowed values <= 14 characters.
    telephone?: string; // IOR's phone number in E.164 format. Allowed values <= 20 characters.
    email?: string; // IOR's email. Allowed values <= 320 characters.
}

/* 
    Tax Number Abbreviation:

    VAT - Value-Added Tax → VOEC number for Norway should be shared here as advised by the Norwegian Tax Authorities
    EIN - Employer Identification Number
    GST - Goods and Service Tax
    SSN - Social Security Number
    EORI - Economic Operators Registration and Identification for the European Union
    DUN - Data Universal Numbering System
    FED - Federal Tax ID
    STA - State Tax ID
    CNP - Brazil CNPJ/CPF Federal Tax
    IE - Brazil type IE/RG Federal Tax
    INN - Russia bank details section INN
    KPP - Russia bank details section KPP
    OGR - Russia bank details section OGRN
    OKP - Russia bank details section OKPO
    IOSS - SDT or Overseas Registered Supplier or Import One-Stop-Shop or GB VAT (foreign) registration or AUSid GST Registration or VAT on E-Commerce
    FTZ - Free Trade Zone ID
    DAN - Deferment Account Duties Only
    TAN - Deferment Account Tax Only
    DTF - Deferment Account Duties, Taxes and Fees Only
    RGP - EU Registered Exporters Registration ID
    DLI - Driver's License
    NID - National Identity Card
    PAS - Passport
    MID - Manufacturer ID
*/
export type TaxNumberAbbreviationType = "VAT" | "EIN" | "GST" | "SSN" | "EORI" | "DUN" | "FED" | "STA" | "CNP" | "IE" | "INN" | "KPP" | "OGR" | "OKP" | "IOSS" | "FTZ" | "DAN" | "TAN" | "DTF" | "RGP" | "DLI" | "NID" | "PAS" | "MID"

export type TaxNumberInfo = {
    name: TaxNumberAbbreviationType;
    country_code: string; // Issuing country code (ISO 3166-1 alpha-2 code). Ex: NL. Allowed values <= 2 characters.
    value: string; // Number Itself (ex: NL123456789B01). Allowed values <= 100 characters.
}

export type TaxNumbersType = {
    sender: TaxNumberInfo[]; // Sender's list of identification number objects. Allowed values <= 100 items.
    receiver: TaxNumberInfo[]; // receiver's list of identification number objects. Allowed values <= 100 items.
    importer_of_record: TaxNumberInfo[]; // IOR's list of identification number objects. Allowed values <= 100 items.
}

export type ReturnDataObject = {
    return_postal_code?: string; // The Postcode of the customer to whom the parcel was originally shipped. Allowed values <= 12 characters.
    outbound_tracking_number?: string; // Tracking number of outbound shipment (ex: BE123456789). Allowed values <= 40 characters.
    outbound_shipment_date?: string; // Data of outbound shipment (ex: 2020-11-27).
    outbound_carrier_name?: string; // The name of the carrier used for outbound shipment (ex: DHL). Allowed values <= 50 characters.
}

export type ParcelCustomsInformation = {
    customs_invoice_nr: string; // Customs invoice number (ex: INV-123).
    customs_shipment_type: CustomsShipmentType;
    export_type?: ExportType;
    invoice_date?: string; // The date when the commercial invoice for the goods was issued (ISO 8601). If not provided, the announcement date will be used by default.
    discount_granted?: string; // Shipper's granted discount amount to user (ex: 14.99).
    freight_costs?: string; // Charges associated with the transportation of the goods to their destination paid by the receiver (ex: 4.99).
    insurance_costs?: string; // The costs of insurance coverage for the goods during transit paid by the receiver (ex: 3.60).
    other_costs?: string; // Additional costs or charges associated with the shipment that are not covered by freight and insurance paid by the receiver (ex: 1.20).
    general_notes?: string; // Exporter or shipper can include any additional information or special instructions related to the goods being shipped. This section is used to provide details that may not be covered in other parts of the invoice but are relevant for customs clearance (ex: Compliance: Goods comply with international safety standards (CE certified). Allowed values <= 500 characters.
    additional_declaration_statements?: string[]; // List of additional declaration statements. Each statement may contain specific details about the nature of the goods being shipped, their origin, or any additional information required by customs authorities. The content of an additional declaration statement can vary based on the requirements of the importing and exporting countries, as well as the nature of the goods being transported. Allowed values <= 100 items.
    importer_of_record?: ImporterOfRecordType; // Importer of Record (IOR) information. A customs-connected record importer specializes in importing goods and managing the associated customs documentation. If not provided, the receiver's address will be used instead.
    tax_numbers?: TaxNumbersType; // Identification numbers and codes related to sender, receiver and importer of record provider.
    return_data: ReturnDataObject; // Additional information that should be provided for return parcels.
}

export type ParcelItemObject = {
    hs_code: string; // Harmonized System Code. Providing a complete HS code with more characters increases the delivery rate. (https://en.wikipedia.org/wiki/Harmonized_System)
    weight: string; // Weight of a single item in kilograms.
    quantity: string // Quantity of items shipped. Allowed values >= 1
    description: string; // Description of the item. Allowed values <= 255 characters
    value: number; // Value of a single item
    origin_country?: string | null; // ISO-2 code of the country where the items were originally produced. (https://www.nationsonline.org/oneworld/country_code_list.htm)
    sku?: string; // The SKU (Stock Keeping Unit) of the product. Allowed values <= 255 characters
    product_id?: string; // The internal ID of the product.Allowed values <= 255 characters
    properties?: ParcelItemObjectProperties; // The list of properties of the product. Used as a JSON object with {‘key’: ‘value’}.
    item_id?: string | null; // External ID of the item generated by a shop system or similar. Allowed values <= 255 characters
    return_reason?: number | null; // The return reason identifier matching the ones provided from Sendcloud. Only applicable for returns. Allowed values >= 255 characters
    return_message?: string | null; // Optional a message relating to the return. Only applicable for returns.
    mid_code?: string; // Code to identify the manufacturer of the product. It is required when shipping to the US and is used for generating commercial invoice (ex: US1234567). Allowed values <= 15 characters
    material_content?: string; // Composition of the items. Used for commercial invoice generation (ex: 100% Cotton). Allowed values <= 255 characters
    intended_use?: string; // Text that identifies the Intended Use of the item. This will be used to classify the item based on the new ICS2 system. Used for commercial invoice generation (ex: Personal use). Allowed values <= 255 characters
}

export type ParcelCreationObject = {
    id?: number; // Identifier of the parcel (ignored when creating)
    name: string; // Name of the recipient
    company_name?: string; // Company name of the recipient the parcel will be shipped to
    contract?: number; // Id of the contract that you would like to use to create the parcel with.
    address: string; // Address of the recipient
    address_2?: string; // Additional address information, e.g. 2nd level
    house_number?: string; // House number of the recipient
    city: string; // City of the recipient
    postal_code: string; // Zip code of the recipient
    telephone?: string; // Phone number of the recipient
    request_label?: boolean; // Should the parcel request a label. This property used to be called requestLabel. We kept it backwards compatible by still accepting the previous name.
    email?: string; // E-mail address of the recipient
    country: string; // Country of the recipient
    shipment?: ShipmentObject;
    weight?: string; // Weight of the parcel in kilograms, if none given the default weight from settings is used. If you provide no weight in your request we’ll use the default weight set in your settings.
    order_number?: string; // Order number of your order
    insured_value?: number; // This field is mutually exclusive with the total_insured_value. Amount of Sendcloud Insurance to add. For XCover, this must be a positive value, larger than 2. If a value between 0 and 2 is sent, it is rounded up to 2. For Insureship (legacy): this must be a multiple of 100, for example, 100, 200, 300, etc. The maximum insurance is 5000. This field does not take the carrier provided shipping method insurance into consideration. Note: this value is an integer. If decimal numbers are sent, these are rounded up to the nearest whole number. Example: sending 72.35 results in a insured_value of 73.
    total_order_value_currency?: string; // The currency of the total order value. Validated against a format of “XYZ” (ISO 4217).
    total_order_value?: string; // The value paid by the buyer (via various payment methods supported by the shop(cash on delivery, pre-paid or post-paid), it will also be used for the cash on delivery amount for example “99.99”.
    quantity?: number; // Create a multi-collo shipment. Default value: 1. Minimal value: 1. Maximal value: 20. When request_label is true, it is required to use the Create multiple parcels method, since multiple parcels will be returned. When request_label is false, the number of parcels will be set according to this value in the incoming order overview.
    shipping_method_checkout_name?: string; // Shipping method name selected by buyer during the checkout.
    to_post_number?: string; // Code required in case of PO Box or post locker delivery.
    country_state?: string; // Code of the state (e.g. NY for New York) or province (e.g. RM for Rome). Destinations that require this field are USA, Canada, Italy and Australia. Errors related to this field will mention the to_state field.
    sender_address?: number; // ID of the SenderAddress.
    customs_invoice_nr?: string; // Customs invoice number.
    customs_shipment_type?: CustomsShipmentType;
    external_reference?: string | null; // A reference to be assigned to this parcel. Must be unique across parcels. This field is used to create idempotence.
    reference?: string | null; // A reference to be assigned to this parcel. Multiple parcels can have the same reference. Default: 0.
    to_service_point?: number; // ID of the selected service point.
    total_insured_value?: number; // This field is mutually exclusive with the insured_value. Amount of total insurance to add. For XCover, this must be a positive value, larger than 2. If a value between 0 and 2 is sent, it is rounded up to 2. For Insureship (legacy): this must be a multiple of 100, for example, 100, 200, 300, etc. The maximum insurance is 5000 plus your shipping method’s insurance depending on the carrier. This field works by automatically calculating how much Sendcloud Insurance you’d need to add plus your shipping method’s insurance so it matches the exact value you’ve given. As an example, DPD insures all their shipments by 520€ by default. If you pass the total_insured_value: 5000 your shipment will have a total insurance coverage of 5000€, but you’re only paying for 4480€. Note: this value is an integer. If decimal numbers are sent, these are rounded up to the nearest whole number. Example: sending 72.35 results in a total_insured_value of 73.
    shipment_uuid?: string; // Unique identifier that we assign to your shipment within the Sendcloud system.
    parcel_items?: ParcelItemObject[]; // List of items the order contains;
    is_return?: boolean; // Set to true if this parcel is a return;
    length?: string; // Parcel length in centimeters (will be used for volumetric weight calculation)
    width?: string; // Parcel width in centimeters (will be used for volumetric weight calculation)
    height?: string; // Parcel height in centimeters (will be used for volumetric weight calculation). Note: You must provide length, width and height all at once for calculating volumetric weight or passing them as-is to carriers that require these properties Parcel height in centimeters (will be used for volumetric weight calculation). Note: You must provide length, width and height all at once for calculating volumetric weight or passing them as-is to carriers that require these properties.
    request_label_async?: boolean; // Makes sure that the label is requested asynchronously. The parcel is returned, but without label. You will need to poll for status changes on the parcel.
    apply_shipping_rules?: boolean; // When set to True configured shipping rules will be applied before creating the label and announcing the Parcel.
    from_name?: string; // Name of the sender (WHEN CREATING A RETURN PARCEL)
    from_company_name?: string; // Company name of the sender the parcel will be shipped from (WHEN CREATING A RETURN PARCEL)
    from_address_1?: string; // Address of the sender (WHEN CREATING A RETURN PARCEL)
    from_address_2?: string; // Additional address information of the sender (WHEN CREATING A RETURN PARCEL)
    from_house_number?: string; // House number of the sender (WHEN CREATING A RETURN PARCEL)
    from_city?: string; // City of the sender (WHEN CREATING A RETURN PARCEL)
    from_postal_code?: string; // Zip code of the sender (WHEN CREATING A RETURN PARCEL)
    from_country?: string; // Country of the sender (WHEN CREATING A RETURN PARCEL)
    from_telephone?: string; // Phone number of the sender (WHEN CREATING A RETURN PARCEL)
    from_email?: string; // E-mail address of the sender (WHEN CREATING A RETURN PARCEL)
    from_vat_number?: string; // VAT number of the sender (WHEN CREATING A RETURN PARCEL)
    from_eori_number?: string; // EORI number of the sender (WHEN CREATING A RETURN PARCEL)
    from_inbound_vat_number?: string; // GB VAT number - needed for shipments from Europe to GB (WHEN CREATING A RETURN PARCEL)
    from_inbound_eori_number?: string; // GB EORI number - needed for shipments from Europe to GB (WHEN CREATING A RETURN PARCEL)
    from_ioss_number?: string; // IOSS(Import One-Stop Shop) number of the sender (WHEN CREATING A RETURN PARCEL)
    customs_information?: ParcelCustomsInformation; // Optional customs information that should be provided for international parcels. This information is used for generating customs documents. This functionality is available only for beta feature users. If you want to use it, reach out to customer support or your Customer Success Manager.
}
export type SingleOrder = {
    parcel: ParcelCreationObject;
}

export type BatchOrders = {
    parcels: ParcelCreationObject[];
}