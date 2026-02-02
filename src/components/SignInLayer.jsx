import axios from "../utils/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchOwner, login } from "../redux/slice/authSlice";

const SignInLayer = () => {
  const [form, setForm] = useState({});
  const [step, setStep] = useState("SEND_OTP");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (step === "SEND_OTP") {
        const res = await axios.post("/auth/send-otp", { email: form.email });
        if (res?.data?.success) {
          toast.success("OTP sent to your email");
          setStep("VERIFY_OTP");
          setTimer(60);
          setCanResend(false);
        }
      } else if (step === "VERIFY_OTP") {
        const res = await axios.post("/auth/verify-otp", {
          email: form.email,
          otp: form.otp,
        });
        if (res?.data?.success) {
          toast.success("OTP verified successfully");
          setStep("LOGIN");
        }
      } else if (step === "LOGIN") {
        dispatch(login(form));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/send-otp", { email: form.email });

      if (res?.data?.success) {
        toast.success("OTP resent successfully");
        setTimer(60);
        setCanResend(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      Navigate("/");
    } else {
      dispatch(fetchOwner());
    }
  }, [user]);

  useEffect(() => {
    let interval;

    if (step === "VERIFY_OTP" && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, canResend]);

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/logo/logo.png" alt="WowDash React Vite" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link className="mb-40 max-w-290-px">
              <img src="assets/logo/logo.png" alt="WowDash React Vite" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
              />
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  placeholder="Password"
                />
              </div>
              <span
                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                data-toggle="#your-password"
              />
            </div>
            {step === "VERIFY_OTP" && (
              <div className="d-flex justify-content-between align-items-center mt-8">
                {!canResend ? (
                  <>
                    <div className="icon-field mb-16">
                      <span className="icon top-50 translate-middle-y">
                        <Icon icon="mage:email" />
                      </span>
                      <input
                        name="otp"
                        type="text"
                        onChange={handleChange}
                        className="form-control h-56-px bg-neutral-50 radius-12"
                        placeholder="Enter Your Otp"
                      />
                    </div>
                    <span className="text-secondary-light text-sm">
                      Resend OTP in <b>{timer}s</b>
                    </span>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="btn btn-link p-0 text-primary-600 fw-medium"
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            )}
            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-center"></div>
                <Link to="/forgot-password" className="text-primary-600 fw-medium">
                  Forgot Password?
                </Link>
              </div>
            </div>
            {/* <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {" "}
              {otp ? "Sign In" : "Send Otp"}
            </button> */}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {loading ? (
                "Please wait..."
              ) : (
                <>
                  {step === "SEND_OTP" && "Send OTP"}
                  {step === "VERIFY_OTP" && "Verify OTP"}
                  {step === "LOGIN" && "Sign In"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
