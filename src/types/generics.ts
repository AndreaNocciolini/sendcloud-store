export type TransitTimesBodyType = {
    carrier_code: string[] // Selection of carriers.
    start_date?: string; // First delivery start date. Example: 2020-12-31.
    end_date?: string; // First delivery end date. Example: 2022-12-31.
    from_country?: string; // Origin country. Example: DE.
    to_country?: string; // Destination country. Example: NL.
} & (
    | { shipping_method_code: string[] } // Selections of shipping methods
);