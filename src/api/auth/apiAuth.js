import axios from "axios";
import {BASE_URL} from "@/api/urls";

export default {
    async register (login, password) {
        return axios({
            method: 'POST',
            url: `${BASE_URL}/api/register`,
            data: {
                email: login,
                password: password
            }
        })
    },
    async login (login, password) {
        return axios({
            method: 'POST',
            url: `${BASE_URL}/api/login_check`,
            data: {
                email: login,
                password: password
            }
        })
    }
}