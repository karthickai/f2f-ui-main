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
    getInvoices() {
        return axios.get(API_URL + '/user/invoices',{ headers: authHeader() });
    }
    getCheckoutSessionID() {
        return axios.get(API_URL + '/user/checkout',{ headers: authHeader() });
    }
    getS3URL(data) {
        return axios.post(API_URL + '/user/get_s3_pre_signed_url',data,{ headers: authHeader() });
    }
    cancelSubscription() {
        return axios.post(API_URL + '/user/cancel_subscription',{}, { headers: authHeader() });
    }
    createFeedback(data) {
        return axios.post(API_URL + '/user/create_feedback',data);
    }
    uploadFile(url, data, headers) {
        return axios.put(url, data, headers)
    }
    uploadSucceed(data) {
        return axios.post(API_URL + '/user/upload_succeeded',data, { headers: authHeader() });
    }
}

export default new UserServiceService();