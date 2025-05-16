import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";

type healthRecord = {
    type:string; 
    title: string; 
    description: string; 
    veterinarian: string; 
    cost : number;
    petId: string;
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

export const addHealthAPI = async ({type, title, description, veterinarian, cost, petId }: healthRecord): Promise<AddHealthResponse> => {
    try {
        const token = getUserFromStorage()
        const response = await axios.post(`${BASE_URL}/pet/${petId}/health-records`,{
            type, title, description, veterinarian, cost 
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
    } catch (error: any) {
       if(isAxiosError(error)){
               console.log("addHealthAPI error", error.response?.data);
               throw new Error(error.response?.data?.message || "Failed to add health record");
           }
               throw error
          }
}

export const getHealthDetailsAPI = async ({petId}: {petId: string})=> {
    try {
        const token = getUserFromStorage();
        const response = await axios.get(`${BASE_URL}/health-records/${petId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if(isAxiosError(error)){
        console.log("getHealthDetailsAPI error", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to get  health record");    
    }
        throw error
   }
}

// getPetHealth