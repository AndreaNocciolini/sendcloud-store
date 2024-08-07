import { request } from "undici";
import { ShippingPricesQuery } from "../../types/shippings";

const getShippingPrices = async (query: ShippingPricesQuery) => {
    const queryStringObject = Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, String(value)])
    );
    const queryParams = new URLSearchParams(queryStringObject).toString();

    let sendcloudRequest;
    try {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/shipping-price?${queryParams}`,
                {
                    headers: {
                        "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                        "Content-Type": "application/json",
                        "User-Agent": "undici/4.12.1"

                    },
                    method: "GET"
                }
            )
    } catch (e) {
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
}

export const shippingPricesHelper = {
    getShippingPrices
}