// import axios from "axios";

// const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_PHONE_API_KEY || "7f3720b5df1b4b40a017bd0ea49a7ba9";

// export interface PhoneValidationResponse {
//   valid: boolean;
//   format: {
//     international: string;
//     national: string;
//     e164: string;
//   };
//   location: string;
//   carrier: string;
//   type: string;
// }

// export const validatePhoneNumber = async (
//   phoneNumber: string
// ): Promise<PhoneValidationResponse | null> => {
//   try {
//     if (!ABSTRACT_API_KEY) {
//       throw new Error("Missing Abstract API Key");
//     }

//     const response = await axios.get("https://phonevalidation.abstractapi.com/v1/", {
//       params: {
//         api_key: ABSTRACT_API_KEY,
//         phone: phoneNumber,
//       },
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "Error validating phone number:",
//         error.response?.data || error.message
//       );
//     } else {
//       console.error("Unexpected error during phone number validation:", error);
//     }
//     return null;
//   }
// };
