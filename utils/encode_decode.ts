import CryptoJS from "crypto-js";

export const encodeData = (data: object, secretKey: string) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encodeURIComponent(encryptedData);
};

// export const decodeData = (encryptedData: string, secretKey: string) => {
//     const decodedData = decodeURIComponent(encryptedData);
//     const decryptedBytes = CryptoJS.AES.decrypt(decodedData, secretKey);
//     const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
//     return JSON.parse(decryptedText);
// };

export const decodeData = (encryptedData: string, secretKey: string) => {
    try {
        if (!encryptedData) {
            throw new Error('No encrypted data provided');
        }
        const decodedData = decodeURIComponent(encryptedData);
        const decryptedBytes = CryptoJS.AES.decrypt(decodedData, secretKey);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
            throw new Error('Failed to decrypt: empty decrypted text');
        }
        return JSON.parse(decryptedText);
    } 
    catch (error) {
        console.error('decodeData error:', error);
        return null;
    }
};