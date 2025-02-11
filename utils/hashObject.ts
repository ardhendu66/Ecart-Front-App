import CryptoJS from "crypto-js";

export const encryptUserInfo = (obj: any) => {
    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(obj), "crypto-secret-key"
    ).toString();

    return encodeURIComponent(String(encryptedData));
}

export const decryptUserInfo = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedData), "crypto-secret-key");
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}