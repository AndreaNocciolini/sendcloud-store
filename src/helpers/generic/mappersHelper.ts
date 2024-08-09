const cleanRequestBody = (data: Record<string | number, any>): any => {
    for (const key in data) {
        if (data.hasOwnProperty(key) && (!data[key] || data[key] === '')) {
            delete data[key];
        }
    }
    return data;
};

export const mappersHelper = {
    cleanRequestBody
}