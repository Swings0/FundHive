import axios from "axios";

const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_PHONE_API_KEY || '';




export interface PhoneValidationResponse {
    valid: boolean;
    format:{
        international: string;
        national: string;
        e164: string;
    };
    location: string;
    country: string;
    carrier: string;
    type: string;
}


export const validatePhoneNumber = async (
    phoneNumber:string,
    country: string, // Optional country parameter
): Promise<PhoneValidationResponse | null > => {
    try {


        if (country) {
            country = country; // Add country if it's provided
        }
        const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&phone=${phoneNumber}&${country}`, {
            params: {
                apikey: ABSTRACT_API_KEY,
                number: phoneNumber,
            },
            
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log('Error validating phone number:', error.response?.data || error.message);
        } else {
            console.log('Unexpected error:', error);
        }
        return null;
    }
};