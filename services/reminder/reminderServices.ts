import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";

type Reminder = {
    id: string
    petId: string;
    title: string;
    type: string;
    description: string;
    date: Date;
    veterinarian: string;
}

type addReminder = {
    petId: string;
    title: string;
    type: string;
    description: string;
    date: Date;
    veterinarian: string;
}

type getRemindersResponse = {
    message: string;
    reminders: Reminder[]
}

type AddReminderResponse = {
    message: string,
    reminder: Reminder
}


export const AddReminderAPI = async({petId, type, title, description, date, veterinarian }: addReminder): Promise<AddReminderResponse>=> {
    try {
        const user = await getUserFromStorage();
        const token = user?.token
        if (!token) throw new Error("Unauthorized");
        const response = await axios.post(`${BASE_URL}/pet/${petId}/reminders`, {
            type, 
            title, 
            description, 
            date, 
            veterinarian,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        if(isAxiosError(error)){
            console.log("AddREminderAPI error", error);
            throw new Error(error.response?.data?.message || "Failed to add reminder");
        }
        throw error
    }
}

export const GetRemindersForPetAPI = async ({petId}: {petId: string}): Promise<getRemindersResponse> => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token;
        if (!token) throw new Error("Unauthorized");
        const response = await axios.get(`${BASE_URL}/pet/${petId}/reminders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if(isAxiosError(error)){
            console.log("GetAllRemindersAPI error", error);
            throw new Error(error.response?.data?.message || "Failed to get all reminders");
        }
        throw error
    }
}