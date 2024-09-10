/* 
    Map Legend:
    - OP --> Outgoing Parcel
*/

export type ReturnPortalOPQueryType = {
    identifier: string; // Either the tracking number or the order number of the outgoing parcel. Allowed values >= 1 characters.
    postal_code: string; // The postal code of the outgoing parcel. Allowed values >= 1 characters.
    omit_service_point?: boolean; // If true, exclude response fields with basic service point information (service_point, labelless_service_point, shop_distances). Default: false.
}