export interface CursorPayload {
    createdAt: string;
    id: number;
}

export const encodeCursor = (
    payload: CursorPayload
): string => {
    return Buffer.from(
        JSON.stringify(payload)
    ).toString("base64");
};

export const decodeCursor = (
    cursor: string
): CursorPayload => {
    return JSON.parse(
        Buffer.from(cursor, "base64").toString()
    );
};