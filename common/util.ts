export function fromBase64(s: string): string {
    return Buffer.from(s, "base64").toString("utf-8");
}