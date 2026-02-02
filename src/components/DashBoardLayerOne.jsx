// import SalesStatisticOne from "./child/SalesStatisticOne";
// import TotalSubscriberOne from "./child/TotalSubscriberOne";
// import UsersOverviewOne from "./child/UsersOverviewOne";
// import LatestRegisteredOne from "./child/LatestRegisteredOne";
// import TopPerformerOne from "./child/TopPerformerOne";
// import TopCountries from "./child/TopCountries";
// import GeneratedContent from "./child/GeneratedContent";
// import UnitCountOne from "./child/UnitCountOne";

import UnitCountSeven from "./child/UnitCountSeven";
import IncomeVsExpense from "./child/IncomeVsExpense";
import UsersChart from "./child/UsersChart";
import TopSuppliers from "./child/TopSuppliers";
import TopCustomer from "./child/TopCustomer";
import OverallReport from "./child/OverallReport";
import PurchaseAndSales from "./child/PurchaseAndSales";
import RecentTransactions from "./child/RecentTransactions";

const DashBoardLayerOne = () => {
  return (
    // <>
    //   UnitCountOne
    //   <UnitCountOne />

    //   <section className='row gy-4 mt-1'>
    //     {/* SalesStatisticOne */}
    //     <SalesStatisticOne />

    //     {/* TotalSubscriberOne */}
    //     <TotalSubscriberOne />

    //     {/* UsersOverviewOne */}
    //     <UsersOverviewOne />

    //     {/* LatestRegisteredOne */}
    //     <LatestRegisteredOne />

    //     {/* TopPerformerOne */}
    //     <TopPerformerOne />

    //     {/* TopCountries */}
    //     <TopCountries />

    //     {/* GeneratedContent */}
    //     <GeneratedContent />
    //   </section>
    // </>

    <div className='row gy-4'>
      {/* UnitCountSeven */}
      <UnitCountSeven />

      {/* IncomeVsExpense */}
      <IncomeVsExpense />

      {/* UsersChart */}
      <UsersChart />

      {/* TopSuppliers */}
      <TopSuppliers />

      {/* TopCustomer */}
      <TopCustomer />

      {/* OverallReport */}
      <OverallReport />

      {/* PurchaseAndSales */}
      <PurchaseAndSales />

      {/* RecentTransactions */}
      <RecentTransactions />
    </div>
  );
};

export default DashBoardLayerOne;
