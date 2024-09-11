import { DocumentsType } from "../../types/documents";
import * as OrderType from "../../types/orders";
import { request } from "undici";

const getOrders = async (id?: number) => {
    let sendcloudRequest;
    try {
        if (id) {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels/${id}`,
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
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels`,
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

const getOrderDocuments = async (orderId: number, documentType: DocumentsType) => {
    let sendcloudRequest;
    try {
            sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels/${orderId}/documents/${documentType}`,
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

const createOrder = async (order: OrderType.SingleOrderType) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels`,
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

const updateOrder = async (order: OrderType.SingleOrderType, orderId?: number) => {
    let sendcloudRequest;
    let orderToUpdate;
    if (orderId) {
        orderToUpdate = {
            ...order,
            parcel: {
                ...order.parcel,
                id: orderId
            }
        };
    }
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels`,
            {
                headers: {
                    "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                    "Content-Type": "application/json",
                    "User-Agent": "undici/4.12.1"

                },
                method: "PUT",
                body: JSON.stringify(orderToUpdate || order)
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
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels/${orderId}/cancel`,
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

const getOrderStatuses = async () => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/parcels/statuses`,
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
};

export const ordersHelper = {
    getOrders,
    createOrder,
    getOrderDocuments,
    updateOrder,
    deleteOrder,
    getOrderStatuses
}