import axios from 'axios';
import authHeader from "@/http/auth-header";

const API_URL = process.env.VUE_APP_API_URL;

class UserServiceService {
    CreateFreeTrail() {
        return axios.get(API_URL + '/user/create_trail_subscription',{ headers: authHeader() });
    }
    getUserDetails() {
        return axios.get(API_URL + '/user/get_subscription_user',{ headers: authHeader() });
    }
}

export default new UserServiceService();