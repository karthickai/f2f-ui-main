export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user['id_token']) {
        return { Authorization: 'Bearer ' + user['id_token'] };
    } else {
        return {};
    }
}