import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
    const productData = useSelector((state: any) => state.userReducer.cart);
    console.log("check: ", productData);

    return (
        <>
            {productData.map((item: string) => {
                return <h1 className="px-20 ">{item}</h1>;
            })}
        </>
    );
};

export default Cart;
