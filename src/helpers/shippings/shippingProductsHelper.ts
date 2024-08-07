import { request } from "undici";

const getShippingProducts = async (from_country: string) => {
    const queryParams = `?from_country=${encodeURI(from_country)}`

    let sendcloudRequest;
    try {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/shipping-products${queryParams}`,
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

export const shippingProductsHelper = {
    getShippingProducts
}