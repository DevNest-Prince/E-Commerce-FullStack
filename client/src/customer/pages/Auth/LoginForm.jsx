import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: (values) => {
      dispatch(signin({ email: values.email, otp, navigate }));
    },
  });

  const handleOtpChange = (value) => setOtp(value);

  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: `signing_${formik.values.email}` }));
    setTimer(30);
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsTimerActive(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">Login</h1>
      <form className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={auth.otpSent}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : undefined}
        />

        {auth.otpSent && (
          <div className="space-y-2">
            <p className="font-medium text-sm">* Enter OTP sent to your email</p>
            <OTPInput length={6} onChange={handleOtpChange} error={false} />
            <p className="text-xs space-x-2">
              {isTimerActive ? (
                <span>Resend OTP in {timer} seconds</span>
              ) : (
                <>
                  Didn’t receive OTP?{' '}
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

        <div>
          <Button
            disabled={auth.loading || (!auth.otpSent && !formik.values.email)}
            fullWidth
            variant="contained"
            sx={{ py: '11px' }}
            onClick={auth.otpSent ? formik.handleSubmit : handleResendOTP}
          >
            {auth.loading ? <CircularProgress /> : auth.otpSent ? 'Login' : 'Send OTP'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
