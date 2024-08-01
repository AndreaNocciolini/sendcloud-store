const routes = {
    // GET: ["/orders", "/order/:id"],
    // POST: ["/orders/search"],
    PUT: ["/order/create"]
};

const noResourceFoundMsg = () => {
    return  `This resource is not available. Here is a list of possible valid alternatives: ${JSON.stringify(routes, null)}`
}

export const errorHelper = {
    noResourceFoundMsg
}