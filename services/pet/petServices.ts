import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";



type Pet = {
    _id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    weight: number;
    description: string;
    image: string;
    sex: string,
}

type AddPetResponse = {
    message: string;
    pet: Pet;
}
type UpdatePetResponse = {
    message: string;
    pet: Pet;
}
type DeletePetResponse = {
    message: string;
}

type GetPetsResponse = {
    message: string;
    pets: Pet[];
}
type GetPetByIdResponse = {
    message: string;
    pet: Pet;
}



export const AddPetAPI = async(formData: FormData): Promise<AddPetResponse> => {
  try {
    const token = getUserFromStorage();
    const response = await axios.post(
      `${BASE_URL}/pet`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.log("AddPetAPI error", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to add pet");
    }
    throw error;
  }
}

export const ListPetsAPI = async(): Promise<GetPetsResponse> => {
    try {
        const token = getUserFromStorage();
        const response = await axios.get(`${BASE_URL}/pets`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error: any) {
         if (isAxiosError(error)) {
            console.log("ListPetAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to get pets");
        }
        throw error;
    }
}
export const GetPetByIdAPI = async({petId}: {petId: string}): Promise<GetPetByIdResponse> => {
   try {
        const token = getUserFromStorage();
         const response = await axios.get(`${BASE_URL}/pet/${petId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
   } catch (error: any) {
    if(isAxiosError(error)){
        console.log("ListPetById", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to fetch pet info");    
    }
        throw error
   }
}
export const DeletePetAPI = async({petId}: {petId: string}): Promise<DeletePetResponse> => {
   try {
        const token = getUserFromStorage();
        const response = await axios.delete(`${BASE_URL}/pet/${petId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
   } catch (error: any) {
    if(isAxiosError(error)){
        console.log("DeletePetAPI error", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to delete pet");    
    }
        throw error
   }
}
export const UpdatePetAPI = async({petId, updatedData}: {petId: string, updatedData: Partial<Pet>}): Promise<UpdatePetResponse> => {
   try {
        const token = getUserFromStorage();
        const response = await axios.put(`${BASE_URL}/pet/${petId}`,
            updatedData, 
            {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
   } catch (error: any) {
    if(isAxiosError(error)){
        console.log("ListPetById", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to delete pet");    
    }
        throw error
   }
}



