import axios from "axios";
import { useSession } from "next-auth/react";
export default function useAxios() {
    const { data: session } = useSession();
    const apiUrl = process.env.API_URL || "http://localhost:4000/api/v1";  
    const instance = axios.create({
        baseURL: apiUrl,
    })

    const API_HOSTNAME_VERSION = 'v2';
    const contentLanguage = "en";
    const token = session?.user?.token;
    instance.interceptors.request.use((requestConfig) => {
        const updatedConfig = { ...requestConfig };
       

        if (contentLanguage) {
            updatedConfig.headers['content-language'] = contentLanguage;
        }

        updatedConfig.headers['Hostname-Version'] = API_HOSTNAME_VERSION;
        updatedConfig.headers['Accept'] = 'application/json';
        updatedConfig.headers['Access-Control-Allow-Origin'] = '*';


        if (token) {
            updatedConfig.headers.authorization = `Bearer ${token}`;
        }

        if (apiUrl) {
            updatedConfig.headers.tenant = apiUrl;
        }
        updatedConfig.headers['api-name'] = 'barge_diary';
console.log(updatedConfig);
        return updatedConfig;
    });
    return instance;
}
