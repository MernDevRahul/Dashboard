import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditContestLayer from "../components/EditContestLayer";

const EditContestPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* BreadCrum */}
        <Breadcrumb title="Edit Contest" />

        {/* EditContestLayer */}
        <EditContestLayer />
      </MasterLayout>
    </>
  );
};

export default EditContestPage;
