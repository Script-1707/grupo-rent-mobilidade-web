import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactInquiryResponse {
  success: boolean;
  message: string;
}

export async function sendContactInquiry(payload: ContactInquiryPayload, token: string): Promise<ContactInquiryResponse> {
  const options = {
    method: 'POST',
    url: `${API_URL}/contact-inquiries`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: payload
  };
  const { data } = await axios.request(options);
  return {
    success: data.success,
    message: data.message
  };
}
