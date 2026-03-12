import apiClient from "@/lib/ApiClient";
import { Endpoints } from "@/app/api/Endpoints";

const baseUrl = `${Endpoints.NEXT_PUBLIC_API_URL}/whatsapp`;

export const WhatsappApi = {
    getPaid: () => {
        return apiClient.get(`${baseUrl}/paid`);
    },

    getStatus: () => {
        return apiClient.get(`${baseUrl}/status`);
    },

    connect: () => {
        return apiClient.post(`${baseUrl}/connect`);
    },

    getQrCode: () => {
        return apiClient.get(`${baseUrl}/qrcode`);
    }
};

