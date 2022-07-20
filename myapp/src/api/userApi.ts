import axiosConfig from "./axiosConfig";
import { UserType } from "../type";
import axios from "axios";

const URL = "http://localhost:8080";

const userApi = {
    signUp: (body: UserType) => axiosConfig.post(`${URL}/sign-up`, body),
    login: (body: UserType) => axios.post(`${URL}/login`, body),
    create: (body: UserType) =>
        axiosConfig.post(`${URL}/create-new-user`, body),
    update: (body: UserType) => axiosConfig.put(`/update-user`, body),
    delete: (id: string) => axiosConfig.delete(`${URL}/delete-user/${id}`),
};

export default userApi;
