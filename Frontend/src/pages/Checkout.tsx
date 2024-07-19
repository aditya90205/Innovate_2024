// /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import {
//   Elements,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { reserCart } from "../redux/reducer/cartReducer";
// import { RootState } from "../redux/store";
// import { NewOrderRequest } from "../types/api-types";
// import { responseToast } from "../utils/features";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const {
//     shippingInfo,
//     cartItems,
//     subTotal,
//     tax,
//     shippingCharges,
//     discount,
//     total,
//   } = useSelector((state: RootState) => state.cartReducer);

//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

//   const [newOrder] = useNewOrderMutation();

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     setIsProcessing(true);

//     const orderData: NewOrderRequest = {
//       shippingInfo,
//       orderItems: cartItems,
//       subTotal,
//       tax,
//       shippingCharges,
//       discount,
//       total,
//       user: user?._id!,
//     };

//     const { paymentIntent, error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin },
//       redirect: "if_required",
//     });

//     if (error) {
//       setIsProcessing(false);
//       return toast.error(error.message || "Something went wrong");
//     }

//     if (paymentIntent.status === "succeeded") {
//       // console.log("Placing Order");
//       const res = await newOrder(orderData);
//       dispatch(reserCart());
//       responseToast(res, navigate, "/orders");
//     }
//     setIsProcessing(false);
//   };

//   return (
//     <div className="checkout-container">
//       <form onSubmit={submitHandler}>
//         <PaymentElement />
//         <button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const location = useLocation();

//   const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements
//       options={{
//         clientSecret,
//       }}
//       stripe={stripePromise}
//     >
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default Checkout;


import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { reserCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest } from "../types/api-types";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subTotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subTotal,
      tax,
      discount,
      shippingCharges,
      total,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(reserCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;