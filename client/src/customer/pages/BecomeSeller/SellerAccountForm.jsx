import React, { useState } from "react";
import { Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const { sellerAuth } = useAppSelector((store) => store);

  const handleStep = (value) => {
    setActiveStep(activeStep + value);
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
      dispatch(createSeller(values));
    },
  });

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? (
            <BecomeSellerFormStep1 formik={formik} handleOtpChange={handleOtpChange} />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button disabled={activeStep === 0} onClick={() => handleStep(-1)} variant="contained">
            Back
          </Button>

          <Button
            disabled={sellerAuth.loading}
            onClick={activeStep === steps.length - 1 ? handleSubmit : () => handleStep(1)}
            variant="contained"
          >
            {activeStep === steps.length - 1
              ? sellerAuth.loading
                ? <CircularProgress size="small" sx={{ width: 27, height: 27 }} />
                : "Create Account"
              : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerAccountForm;
