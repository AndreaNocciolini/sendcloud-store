import * as OrderType from "../../types/orders";
import { request } from "undici";

const getOrders = async (id?: number) => {
    let sendcloudRequest;
    try {
        if (id) {
            sendcloudRequest = await request(`https://panel.sendcloud.sc/api/v2/parcels/${id}`,
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
            sendcloudRequest = await request(`https://panel.sendcloud.sc/api/v2/parcels`,
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

const createOrder = async (order: OrderType.SingleOrder) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`https://panel.sendcloud.sc/api/v2/parcels`,
            {
                headers: {
                    "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                    "Content-Type": "application/json",
                    "User-Agent": "undici/4.12.1"

                },
                method: "POST",
                body: JSON.stringify(order)
            }
        )
    } catch (e) {
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
};

const deleteOrder = async (orderId: number) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`https://panel.sendcloud.sc/api/v2/parcels/${orderId}/cancel`,
            {
                headers: {
                    "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                    "Content-Type": "application/json",
                    "User-Agent": "undici/4.12.1"

                },
                method: "POST"
            }
        )
    } catch (e) {
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
};

export const orderHelper = {
    getOrders,
    createOrder,
    deleteOrder
}