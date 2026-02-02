import { Icon } from "@iconify/react/dist/iconify.js";

import { Link } from "react-router-dom";

const ResetPasswordLayer = () => {
  return (
    <>
      <section className='auth forgot-password-page bg-base d-flex flex-wrap'>
        <div className='auth-left d-lg-block d-none'>
          <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
            <img
              src='assets/logo/logo.png'
              alt='Scan to Vote'
            />
          </div>
        </div>
        <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
          <div className='max-w-464-px mx-auto w-100'>
            <div>
              <h4 className='mb-12'>Reset Password</h4>
              <p className='mb-32 text-secondary-light text-lg'>
                Enter Your New Password
              </p>
            </div>
            <form action='#'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='mage:lock' />
                </span>
                <input
                  type='text'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  placeholder='Enter Password'
                />
              </div>
              <button
                type='button'
                className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
              >
                Change Password
              </button>
              <div className='text-center'>
                <Link to='/sign-in' className='text-primary-600 fw-bold mt-24'>
                  Back to Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordLayer;
