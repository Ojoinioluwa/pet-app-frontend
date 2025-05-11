import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";



type Pet = {
    id: string;
    name: string;
    type: string;
    breed: string;
    age: number;
    weight: number;
    description: string;
    imageUrl: string;
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
type GetPetResponse = {
    message: string;
    pet: Pet;
}

type GetPetsResponse = {
    message: string;
    pets: Pet[];
}
type GetPetByIdResponse = {
    message: string;
    pet: Pet;
}
type GetPetsByUserIdResponse = {
    message: string;
    pets: Pet[];
}
type GetPetsByTypeResponse = {
    message: string;
    pets: Pet[];
}
type GetPetsByBreedResponse = {
    message: string;
    pets: Pet[];
}

export const AddPetAPI = async({name, type, breed, age, weight, description, imageUrl}: {name: string; type: string; breed: string; age: number; weight: number; description: string; imageUrl: string}): Promise<AddPetResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/pets`, 
            {name, type, breed, age, weight, description, imageUrl},
            {headers: {"Content-Type": "application/json"}}
        )
        return response.data;
    }catch (error: any) {
        if (isAxiosError(error)) {
            console.log("AddPetAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to add pet");
        }
        throw error;
    }
}