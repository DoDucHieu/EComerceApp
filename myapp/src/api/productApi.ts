import axiosConfig from "./axiosConfig";
import { ProductType } from "../type";

export const productApi = {
    getAll: () => axiosConfig.get("/get-all-product"),
    update: (body: ProductType) => axiosConfig.put(`/update-product`, body),
    delete: (id: string) => axiosConfig.delete(`/delete-product/${id}`),
};
