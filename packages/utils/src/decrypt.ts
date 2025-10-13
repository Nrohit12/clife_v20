import CryptoJS from "crypto-js";

export function encryptData<T>(data: T, secretKey: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData<T>(cipherText: string | null, secretKey: string): T | null {
    if (!cipherText) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        const str = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(str) as T;
    } catch (e) {
        console.error("Decrypt failed", e);
        return null;
    }
}
