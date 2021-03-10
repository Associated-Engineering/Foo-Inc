import { API } from "aws-amplify";

export async function insertContractorAPI(payload) {
    // TODO: Fetch query params from payload
    const myInit = {
        queryStringParameters: { LocationPhysical: "Vancouver" },
    };
    // return API.post("ae-api", "contractor", myInit);
}
