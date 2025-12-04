import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { verifySellerEmail } from "../../Redux Toolkit/Seller/sellerSlice";

const SellerAccountVerification = () => {
  const { otp } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (otp) {
      dispatch(verifySellerEmail({ otp: Number(otp), navigate }));
    }
  }, [otp, dispatch, navigate]);

  return (
    <div className="h-[80vh] flex justify-center items-center text-xl font-semibold">
      Verifying your seller account...
    </div>
  );
};

export default SellerAccountVerification;
