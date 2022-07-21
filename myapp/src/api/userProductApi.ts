import axiosConfig from "./axiosConfig";
import { CartType } from "../type";

const userProductApi = {
    getAll: (email: CartType) =>
        axiosConfig.get(`/get-all-cart?email=${email}`),
    update: (body: CartType) => axiosConfig.put(`/update-cart`, body),
    delete: (id: string) => axiosConfig.delete(`/delete-cart/${id}`),
};

export default userProductApi;
