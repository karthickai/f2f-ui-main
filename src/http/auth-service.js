import axios from 'axios';

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
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();