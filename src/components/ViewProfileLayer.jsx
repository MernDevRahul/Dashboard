import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useFetchOwnerQuery, useUpdateLoggedInUserMutation } from "../redux/services/authService";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_MODE== "DEV" ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL;
console.log(baseUrl)
const ViewProfileLayer = () => {
  const { data, isLoading } = useFetchOwnerQuery()
  const [imagePreview, setImagePreview] = useState("https://cdn-icons-png.flaticon.com/512/9187/9187604.png");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [form, setForm ] = useState({})
  const [file, setFile] = useState(null)
  const [updateLoggedInUser, { isLoading: isUpdating }] = useUpdateLoggedInUserMutation();

  // Toggle function for password field
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle function for confirm password field
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
      setFile(input.target.files[0]);
    }
  };

  useEffect(()=>{
    if(data?.data){
      setImagePreview(`${baseUrl}${data?.data?.profile}`)
      setForm({
        name:data?.data?.name,
        email:data?.data?.email,
        phone:data?.data?.phone,
        role:data?.data?.role,
      })
    }
  },[data])

  const handleUpdateProfile = async (e)=>{
    e.preventDefault();
    if (!data?.data?._id) return toast.error("User ID is missing!");

    const formData = new FormData();
    if (form.name) formData.append("name", form.name);
    if (form.email) formData.append("email", form.email);
    if (form.phone) formData.append("phone", form.phone);
    if (form.password) formData.append("password", form.password);
    if (form.confirmPassword) formData.append("confirmPassword", form.confirmPassword);
    
    if (file) {
      formData.append("userImage", file);
    }
    
    try {
      const response = await updateLoggedInUser({
        id: data.data._id,
        data: formData
      }).unwrap();
      
      toast.success(response?.message || "Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }

  // Loading Fallback
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className='row gy-4'>
      <div className='col-lg-4'>
        <div className='user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100'>
          <img
            src='/assets/logo/logo.png'
            alt={ data?.data?.name }
            className='w-100 object-fit-cover'
          />
          <div className='pb-24 ms-16 mb-24 me-16  mt--100'>
            <div className='text-center border border-top-0 border-start-0 border-end-0'>
              <img
                src={`${imagePreview}`}
                alt={data?.data?.name}
                className='border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover'
              />
              <h6 className='mb-0 mt-16'>{ data?.data?.name }</h6>
              <span className='text-secondary-light mb-16'>
                { data?.data?.email }
              </span>
            </div>
            <div className='mt-24'>
              <h6 className='text-xl mb-16'>Personal Info</h6>
              <ul>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    Full Name
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : { data?.data?.name }
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Email
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : { data?.data?.email }
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Phone Number
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : { data?.data?.phone }
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Role
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : { data?.data?.role }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-8'>
        <div className='card h-100'>
          <div className='card-body p-24'>
            <ul
              className='nav border-gradient-tab nav-pills mb-20 d-inline-flex'
              id='pills-tab'
              role='tablist'
            >
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link d-flex align-items-center px-24 active'
                  id='pills-edit-profile-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-edit-profile'
                  type='button'
                  role='tab'
                  aria-controls='pills-edit-profile'
                  aria-selected='true'
                >
                  Edit Profile
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='nav-link d-flex align-items-center px-24'
                  id='pills-change-passwork-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#pills-change-passwork'
                  type='button'
                  role='tab'
                  aria-controls='pills-change-passwork'
                  aria-selected='false'
                  tabIndex={-1}
                >
                  Change Password
                </button>
              </li>
            </ul>
            <div className='tab-content' id='pills-tabContent'>
              <div
                className='tab-pane fade show active'
                id='pills-edit-profile'
                role='tabpanel'
                aria-labelledby='pills-edit-profile-tab'
                tabIndex={0}
              >
                <h6 className='text-md text-primary-light mb-16'>
                  Profile Image
                </h6>
                {/* Upload Image Start */}
                <div className='mb-24 mt-16'>
                  <div className='avatar-upload'>
                    <div className='avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer'>
                      <input
                        type='file'
                        id='imageUpload'
                        accept='.png, .jpg, .jpeg'
                        hidden
                        onChange={readURL}
                      />
                      <label
                        htmlFor='imageUpload'
                        className='w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle'
                      >
                        <Icon
                          icon='solar:camera-outline'
                          className='icon'
                        ></Icon>
                      </label>
                    </div>
                    <div className='avatar-preview'>
                      <div
                        id='imagePreview'
                        style={{
                          backgroundImage: `url(${imagePreview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Upload Image End */}
                <form action='#' onSubmit={handleUpdateProfile}>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='name'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Full Name
                          <span className='text-danger-600'>*</span>
                        </label>
                        <input
                        value={form.name}
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                          type='text'
                          className='form-control radius-8'
                          id='name'
                          placeholder='Enter Full Name'
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='email'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Email <span className='text-danger-600'>*</span>
                        </label>
                        <input
                        value={form.email}
                        onChange={(e)=>setForm({...form,email:e.target.value})}
                          type='email'
                          className='form-control radius-8'
                          id='email'
                          placeholder='Enter email address'
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='number'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Phone
                        </label>
                        <input
                        value={form.phone}
                        onChange={(e)=>setForm({...form,phone:e.target.value})}
                          type='number'
                          className='form-control radius-8'
                          id='number'
                          placeholder='Enter phone number'
                        />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='mb-20'>
                        <label
                          htmlFor='desig'
                          className='form-label fw-semibold text-primary-light text-sm mb-8'
                        >
                          Role
                          <span className='text-danger-600'>*</span>{" "}
                        </label>
                        < input
                        type="text"
                        value={form.role}
                        onChange={(e)=>setForm({...form,role:e.target.value})}
                          className='form-control radius-8'
                          id='desig'
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-center gap-3'>
                    <button
                      type='button'
                      className='border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8'
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isUpdating}
                      type='submit'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
              <div
                className='tab-pane fade'
                id='pills-change-passwork'
                role='tabpanel'
                aria-labelledby='pills-change-passwork-tab'
                tabIndex='0'
              >
                <form action="#" onSubmit={handleUpdateProfile}>
                  <div className='mb-20'>
                  <label
                    htmlFor='your-password'
                    className='form-label fw-semibold text-primary-light text-sm mb-8'
                  >
                    New Password <span className='text-danger-600'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      name="password"
                      onChange={(e)=>setForm({...form,password:e.target.value})}
                      type={passwordVisible ? "text" : "password"}
                      className='form-control radius-8'
                      id='your-password'
                      placeholder='Enter New Password*'
                    />
                    <span
                      className={`toggle-password ${
                        passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                      } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                      onClick={togglePasswordVisibility}
                    ></span>
                  </div>
                </div>

                <div className='mb-20'>
                  <label
                    htmlFor='confirm-password'
                    className='form-label fw-semibold text-primary-light text-sm mb-8'
                  >
                    Confirm Password <span className='text-danger-600'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      name="confirmPassword"
                      onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
                      type={confirmPasswordVisible ? "text" : "password"}
                      className='form-control radius-8'
                      id='confirm-password'
                      placeholder='Confirm Password*'
                    />
                    <span
                      className={`toggle-password ${
                        confirmPasswordVisible
                          ? "ri-eye-off-line"
                          : "ri-eye-line"
                      } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                      onClick={toggleConfirmPasswordVisibility}
                    ></span>
                  </div>
                </div>

                <div className='d-flex align-items-center justify-content-center gap-3'>
                    <button
                      type='button'
                      className='border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8'
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isUpdating}
                      type='submit'
                      className='btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8'
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileLayer;
