import axiosConfig from "./axiosConfig";
import { CartType } from "../type";

const URL = "http://localhost:8080";

const userProductApi = {
    getAll: (email: CartType) =>
        axiosConfig.get(`/get-all-cart?email=${email}`),
    update: (body: CartType) => axiosConfig.put(`/update-cart`, body),
    delete: (id: string) => axiosConfig.delete(`${URL}/delete-cart/${id}`),
};

export default userProductApi;
