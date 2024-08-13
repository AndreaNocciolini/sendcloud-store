import { request } from "undici";

const getReturns = async (id?: number) => {
    let sendcloudRequest;
    try {
        if (id) {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/returns/${id}`,
                {
                    headers: {
                        "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                        "Content-Type": "application/json",
                        "User-Agent": "undici/4.12.1"

                    },
                    method: "GET"
                }
            )
        } else {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/returns`,
                {
                    headers: {
                        "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                        "Content-Type": "application/json",
                        "User-Agent": "undici/4.12.1"

                    },
                    method: "GET"
                }
            )
        }
    } catch (e) {
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
}

export const returnsHelper = {
    getReturns
}