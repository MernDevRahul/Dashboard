import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "../utils/axios";
import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordLayer = () => {
  const [email, setEmail] = useState("");
  const [ loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/auth/forget-password',{ email});
      if(response?.data?.success){ 
      toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src="/assets/logo/logo.png" alt="Scan to Vote" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div>
              <h4 className="mb-12">Forgot Password</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </p>
            </div>
            <form action="#">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="email"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Enter Email"
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                onClick = {handleSubmit}
              >
                {loading ? "Loading..." : "Continue"}
              </button>
              <div className="text-center">
                <Link to="/sign-in" className="text-primary-600 fw-bold mt-24">
                  Back to Sign In
                </Link>
              </div>
              <div className="mt-120 text-center text-sm">
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="text-primary-600 fw-semibold">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordLayer;
