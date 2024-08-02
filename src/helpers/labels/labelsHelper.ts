import { request } from "undici";
import { BulkPDFLabelPrintingType } from "../../types/labels";

const getLabel = async (orderId: number) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/labels/${orderId}`,
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

const getPDFLabel = async (orderId: number) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/labels/normal_printer/${orderId}`,
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
    const result = await sendcloudRequest.body.arrayBuffer();
    return result;
}

const bulkPDFLabelPrint = async (labels: BulkPDFLabelPrintingType) => {
    let sendcloudRequest;
    try {
        sendcloudRequest = await request(`${process.env.SENDCLOUD_API_V2_BASE_URL}/labels`,
            {
                headers: {
                    "Authorization": `Basic ${process.env.SENDCLOUD_AUTH}`,
                    "Content-Type": "application/json",
                    "User-Agent": "undici/4.12.1"

                },
                method: "POST",
                body: JSON.stringify(labels)
            }
        )
    } catch (e) {
        console.log(JSON.stringify(e));
        return;
    }
    const result = await sendcloudRequest.body.text();
    return JSON.parse(result);
}

export const labelsHelper = {
    getLabel,
    getPDFLabel,
    bulkPDFLabelPrint
}