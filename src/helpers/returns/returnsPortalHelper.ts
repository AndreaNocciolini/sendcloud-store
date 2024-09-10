import { request } from "undici";
import { ReturnPortalOPQueryType } from "../../types/returns";

const getReturnsPortalSettings = async (brandDomain?: number) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/brand/${brandDomain}/return-portal`,
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

const getReturnsPortalOutgoingParcels = async (brandDomain: string, query: ReturnPortalOPQueryType) => {
    let sendcloudRequest;
    const queryStringObject = Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, String(value)])
    );
    const queryParams = new URLSearchParams(queryStringObject).toString();
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/brand/${brandDomain}/return-portal/outgoing?${queryParams}`,
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

export const returnsPortalHelper = {
    getReturnsPortalSettings,
    getReturnsPortalOutgoingParcels
}