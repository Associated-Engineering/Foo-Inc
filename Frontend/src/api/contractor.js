import { API } from "aws-amplify";

// TODO: Update query params
export async function insertContractorAPI(payload) {
    // TODO: Fetch query params from payload
    const myInit = {
        queryStringParameters: { LocationPhysical: "Vancouver" },
    };
    return API.post("ae-api", "contractor", myInit);
}
