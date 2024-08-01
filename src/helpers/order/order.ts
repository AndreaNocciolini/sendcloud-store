import * as OrderType from "../../types/orders";
import { request } from "undici";

const getOrders = async () => {
    let sendcloudRequest;
    try {
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
    } catch(e){
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
}

const createOrderNoLabel = async (order: OrderType.SingleOrder) => {
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
    } catch(e){
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
};

const createOrderYesLabel = async (order: OrderType.SingleOrder) => {
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
    } catch(e){
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
};

export const orderHelper = {
    getOrders,
    createOrderNoLabel,
    createOrderYesLabel
}