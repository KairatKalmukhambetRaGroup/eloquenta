"use client"
import { useUserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

const page = () => {
    const {login} = useUserContext();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const getUserbyToken = async (token: string) => {
        try {
            const {data, status} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/google-token?token=${token}`, {validateStatus: function (status) { return true }, headers: {"Access-Control-Allow-Origin": "https://server.eloquenta.academy", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}});
            if(status == 200)
                login(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!!token)
            getUserbyToken(token);
    }, [token])
    


    return (
        <div>
            LOADING
        </div>
    )
}

export default page;