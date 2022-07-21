export type CartType = {
    email: string;
    productId: string;
    quantity: number;
};

export type UserType = {
    email: string;
    password?: string;
    gender?: string;
    age?: string;
    role?: string;
};

export type ProductType = {
    _id?: string;
    productName: string;
    price: string;
    imgUrl?: string;
};
