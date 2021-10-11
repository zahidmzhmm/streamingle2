import {Base64} from "js-base64";

export const encryptData = (data) => {
    return Base64.encode(JSON.stringify(data))
}


export const decryptData = (data) => {
    return JSON.parse(Base64.decode(data));
}