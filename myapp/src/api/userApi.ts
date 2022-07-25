import axiosConfig from "./axiosConfig";
import { UserType } from "../type";

export const userApi = {
    signUp: (body: UserType) => axiosConfig.post("/sign-up", body),
    login: (body: UserType) => axiosConfig.post("/login", body),
    create: (body: UserType) => axiosConfig.post("/create-new-user", body),
    update: (body: UserType) => axiosConfig.put("/update-user", body),
    delete: (id: string) => axiosConfig.delete(`/delete-user/${id}`),
};
