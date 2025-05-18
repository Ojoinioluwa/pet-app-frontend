import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";

type healthRecord = {
    type: string;
    title: string;
    description: string;
    veterinarian: string;
    cost: number;
    petId: string;
    date: Date;
    healthRecordId?: string;
}

type AddHealthResponse = {
    message: string;
    petId: string;
    healthRecord: {
        _id: string;
        type: string;
        title: string;
        description: string;
        veterinarian: string;
        cost: number;
    };
}

export const addHealthAPI = async ({ type, title, description, veterinarian, cost, petId, date }: healthRecord): Promise<AddHealthResponse> => {
    try {
        const user = await getUserFromStorage()
        const token = user?.token
        const response = await axios.post(`${BASE_URL}/pet/${petId}/health-records`, {
            type, title, description, veterinarian, cost, date
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error: any) {
        if (isAxiosError(error)) {
            console.log("addHealthAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to add health record");
        }
        throw error
    }
}

export const getHealthDetailsAPI = async ({ petId }: { petId: string }) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token
        const response = await axios.get(`${BASE_URL}/pet/${petId}/health-records`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("getHealthDetailsAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to get  health record");
        }
        throw error
    }
}

// const delete pet API
export const DeleteHealthAPI = async ({ healthRecordId }: { healthRecordId: string }) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token
        const response = await axios.delete(`${BASE_URL}/health-records/${healthRecordId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    } catch (error) {
        if (isAxiosError(error)) {
            console.log("getHealthDetailsAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to get  health record");
        }
        throw error
    }
}
// update pet API
export const updateHealthAPI = async ({ healthRecordId, type, title, description, veterinarian, cost, date }: Partial<healthRecord>) => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.put(`${BASE_URL}/health-records/${healthRecordId}`, {
            type, title, description, veterinarian, cost, date
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("getHealthDetailsAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to get  health record");
        }
        throw error
    }
}

export const getHealthRecordByUserAPI = async () => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        const response = await axios.get(`${BASE_URL}/health-records`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("getHealthRecordByUserAPI error", error)
            throw new Error(error.response?.data?.message || "Failed to get  health record");
        }
        throw error
    }
}