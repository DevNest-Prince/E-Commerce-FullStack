import React, { useState, useEffect } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import OTPInput from "../../components/OtpFild/OTPInput";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { verifyLoginOtp } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { sendLoginSignupOtp } from "../../../Redux Toolkit/Customer/AuthSlice";

const SellerLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sellerAuth } = useAppSelector((store) => store);

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(verifyLoginOtp({ email: values.email, otp, navigate }));
    },
  });

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleSentOtp = () => handleResendOTP();
  const handleLogin = () => formik.handleSubmit();

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <form className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {sellerAuth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm">
              * Enter OTP sent to your email
            </p>
            <OTPInput length={6} onChange={handleOtpChange} error={false} />
            <p className="text-xs space-x-2">
              {isTimerActive ? (
                <span>Resend OTP in {timer} seconds</span>
              ) : (
                <>
                  Didn’t receive OTP?{" "}
                  <span
                    onClick={handleResendOTP}
                    className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold"
                  >
                    Resend OTP
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {sellerAuth.otpSent && (
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        )}

        {!sellerAuth.otpSent && (
          <Button
            disabled={sellerAuth.loading}
            fullWidth
            variant="contained"
            onClick={handleSentOtp}
            sx={{ py: "11px" }}
          >
            {sellerAuth.loading ? <CircularProgress size="small" /> : "Send OTP"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default SellerLoginForm;
