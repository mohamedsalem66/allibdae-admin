import apiClient from "@/lib/ApiClient";
import { Endpoints } from "@/app/api/Endpoints";

const endPoint = `${Endpoints.NEXT_PUBLIC_API_URL}/draft-glasses-orders`;

export const DraftGlassesApi = {
    getAll: () => {
        return apiClient.get(`${endPoint}/all`);
    },

    createOrder: (dto: any) => {
        return apiClient.post(`${endPoint}/create`, dto);
    }

};
