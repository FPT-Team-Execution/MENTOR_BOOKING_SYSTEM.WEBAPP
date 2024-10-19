import { jwtDecode } from "jwt-decode";
import { TokenData } from "../types/common.types";

const cleanTokenKeys = (tokenData: { [key: string]: any }, prefixes: string[]): TokenData => {
    return Object.keys(tokenData).reduce((acc: TokenData, key: string) => {
        let newKey = key;

        // Remove each specified prefix from the key
        prefixes.forEach((prefix) => {
            newKey = newKey.replace(prefix, "");
        });

        // Assign the cleaned key and value to the new object
        acc[newKey] = tokenData[key];
        return acc;
    }, {} as TokenData);
};

export const decode = (token: string) => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return cleanTokenKeys(decodedToken, [
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/",
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/"
            ])
        } catch (error) {
            console.error('Invalid token', error);
        }
    }
}




