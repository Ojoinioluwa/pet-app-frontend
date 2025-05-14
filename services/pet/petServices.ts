import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";

const token = getUserFromStorage();

type Pet = {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    weight: number;
    description: string;
    image: string;
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

export const AddPetAPI = async(formData: FormData): Promise<AddPetResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/pets`,
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