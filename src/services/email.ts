import { axiosInstance } from "@/lib/axios";

export interface Email {
  id: string;
  subject: string;
  short_description: string;
  date: number;
  from: {
    email: string;
    name: string;
  };
  favorite: boolean;
  read: boolean;
}

export interface EmailResponse {
  list: Email[];
  total: number;
}

export const fetchEmails = async (page: number): Promise<EmailResponse> => {
  try {
    const response = await axiosInstance.request<EmailResponse>({
      url: `/?page=${page}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error(`Error while fetching emails: ${JSON.stringify(error)}`);

    throw error;
  }
};

interface EmailDetail {
  id: string;
  body: string;
}

export const fetchEmail = async (id: string): Promise<EmailDetail> => {
  try {
    const response = await axiosInstance.request<EmailDetail>({
      url: `/?id=${id}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error(`Error while fetching email with id ${id}: ${JSON.stringify(error)}`);

    throw error;
  }
};
