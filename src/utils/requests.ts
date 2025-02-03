type StringIndexed = Record<string, any>;

// const obj: StringIndexed = {
//     key: 1,
//     key2: 'test',
//     key3: false,
//     key4: true,
//     key5: [1, 2, 3],
//     key6: {a: 1},
//     key7: {b: {d: 2}},
// };

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
