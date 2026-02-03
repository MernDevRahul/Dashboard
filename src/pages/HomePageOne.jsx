import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerOne from "../components/DashBoardLayerOne";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePageOne = () => {
  // const { user } = useSelector((state)=>state.auth);
  // const navigate = useNavigate()

  // useEffect(()=>{
  //   if(!user){
  //     navigate('/sign-in')
  //   }
  // },[user])
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />
      </MasterLayout>
    </>
  );
};

export default HomePageOne;
