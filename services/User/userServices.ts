import getUserFromStorage from "@/utils/getUserFromStorage";
import BASE_URL from "@/utils/url";
import axios, { isAxiosError } from "axios";

type User = {
    id: string
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    address: string;
}

type LoginResponse = {
    message: string;
    token: string;
    user: User;
}

type RegisterResponse = {
    message: string;
    user?: User;
    stack?: string;
}


export const LoginAPI = async ({ email, password }: { email: string, password: string }): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
        )
        return response.data;
    } catch (error: any) {
        if (isAxiosError(error)) {
            console.log("LoginAPI error", error.response?.data);
            throw new Error(error.response?.data?.message || "Failed to login");
        }
        throw error;
    }

}


export const RegisterAPI = async ({ email, password, name, phoneNumber, address }: { email: string, password: string, name: string, phoneNumber: string, address: string }): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/register`,
            { email, password, name, phoneNumber, address },
            { headers: { "Content-Type": "application/json" } }
        )
        return response.data;
    } catch (error) {
        console.log("RegisterAPI error", error)
        throw new Error("Failed to register");
    }
}

export const GetProfileAPI = async () => {
    try {
        const user = await getUserFromStorage();
        const token = user?.token
        if (!token) {
            throw new Error("No user token found");
        }

        const response = await axios.get(`${BASE_URL}/getProfile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("GetprofileAPI error", error)
            throw new Error(`Failed to fetch user profile`)
        }
        throw error;
    }
}

export const UpdateProfile = async ({ email, name, phoneNumber, address }: Partial<User>) => {
    try {
        const user = await getUserFromStorage()
        const token = user?.token

        const response = await axios.put(`${BASE_URL}`,
            {
                email,
                name,
                phoneNumber,
                address
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log("UpdateAPi error", error);
            throw new Error("Failed to update the users profile");
        }
        throw error
    }
}