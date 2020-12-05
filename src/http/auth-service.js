import axios from 'axios';
import authHeader from "@/http/auth-header";

const API_URL = process.env.VUE_APP_API_URL;

class AuthService {
    login(user) {
        console.log(user)
        return axios
            .post(API_URL + '/auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data["id_token"]) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + '/auth/signup', {
            email: user.email,
            password: user.password
        });
    }

    confirmSignup(user) {
        return axios.post(API_URL + '/auth/confirm_signup', {
            email: user.email,
            password: user.password,
            confirmation_code: user.confirmCode
        });
    }
    ForgotPasswordInit(email) {
        return axios.post(API_URL + '/auth/forgot_password', {
            email:email
        }, {headers: authHeader()});
    }
    ConfirmForgotPasswordInit(email, otp, password) {
        return axios.post(API_URL + '/auth/confirm_password', {
            email: email,
            confirmation_code:otp,
            password: password
        }, {headers: authHeader()});
    }
}

export default new AuthService();