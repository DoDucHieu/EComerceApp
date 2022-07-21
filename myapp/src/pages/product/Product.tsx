import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { ProductType } from "../../type";

const Product = () => {
    const [arrProduct, setArrProduct] = useState([]);

    const getAllProduct = async () => {
        const res = await productApi.getAll();
        setArrProduct(res?.data?.data);
    };

    useEffect(() => {
        getAllProduct();
    }, []);
    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {arrProduct &&
                            arrProduct.map((item: ProductType) => {
                                return (
                                    <div className="group" key={item?._id}>
                                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                            <img
                                                src={item?.imgUrl}
                                                alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                                className="w-full h-full object-center object-cover group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">
                                            {item?.productName}
                                        </h3>

                                        <p className="mt-1 text-lg font-medium text-gray-900">
                                            {`${item.price}$`}
                                        </p>
                                        <button className="block w-full px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">
                                            Add to cart
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
