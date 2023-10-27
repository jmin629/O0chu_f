import axios from "axios";
import { api } from "../config/api";


export const signInApi = async(data: any) => {

    
    const response = await axios.post(`${api}/api/auth/signIn`, data).catch((error)=> null);
    if (!response) return null;

    const result = response.data;
    return result;
}

export const signUpApi = async (data: any) => {

    
    const response = await axios.post(`${api}/api/auth/signUp`, data).catch((error)=> null);

    if (!response) return null;

    const result = response.data.result;

    return result;

}


export const NextClickApi = async (data: any) => {

    
    const response = await axios.post(`${api}/api/auth/nextClick`, data).catch((error)=> null);
    if (!response) return null;
    const result = response.data;
    return result;
}


export const GetUserInfo = async (data: any) => {
    try {
        const response = await axios.get(`${api}/api/users/mypage`, {
            headers: {
                'Authorization': `Bearer ${data}`
            }
        });
        
        return response.data.data;
    } catch (error) {
        console.error(error); // 오류를 콘솔에 출력
        return null; // 오류 발생 시 null 반환
    }
}