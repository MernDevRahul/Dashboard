import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ContestsListLayer from "../components/ContestsListLayer";

const ContestsListPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Contests List' />

        {/* ContestsListLayer */}
        <ContestsListLayer />
      </MasterLayout>
    </>
  );
};

export default ContestsListPage;
