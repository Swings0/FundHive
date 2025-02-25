import axios from "axios";

const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_PHONE_API_KEY || '';

export interface PhoneValidationResponse {
  valid: boolean;
  format: {
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
  phoneNumber: string,
  country: string // country parameter available if needed
): Promise<PhoneValidationResponse | null> => {
  try {
    if (!ABSTRACT_API_KEY) {
      throw new Error("Missing Abstract API Key");
    }
    // Build the request using axios params – no extra string concatenation.
    const response = await axios.get("https://phonevalidation.abstractapi.com/v1/", {
      params: {
        api_key: ABSTRACT_API_KEY,
        phone: phoneNumber,
        // Optionally, if the API supports a country code parameter, uncomment the next line:
        // country_code: country,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error validating phone number:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};
