/**
 * If string can be parsed, returns JSON if not returns false.
 * @param value String to be parsed.
 * @returns JSON or false
 */
export const getJsonOrFalse = (value: string | null) => {
    if (!value) return false;
    try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "object") {
            return parsedValue;
        }
    } catch (error: any) {
        return false;
    }
};
