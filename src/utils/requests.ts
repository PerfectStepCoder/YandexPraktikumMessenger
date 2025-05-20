type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== "object" || data === null) {
        throw new Error("Input must be an object.");
    }

    const buildQueryString = (obj: StringIndexed, parentKey = ""): string => {
        const queryString: string[] = [];

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                const encodedKey = parentKey
                    ? `${parentKey}[${encodeURIComponent(key)}]`
                    : encodeURIComponent(key);

                if (typeof value === "object" && value !== null) {
                    queryString.push(buildQueryString(value, encodedKey));
                } else {
                    queryString.push(`${encodedKey}=${encodeURIComponent(String(value))}`);
                }
            }
        }

        return queryString.join("&");
    };

    return buildQueryString(data);
}

export default queryStringify
