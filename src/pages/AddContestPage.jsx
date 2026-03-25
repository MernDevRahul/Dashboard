import React from 'react'
import MasterLayout from '../masterLayout/MasterLayout'
import Breadcrumb from '../components/Breadcrumb'
import AddContestLayer from '../components/AddContestLayer'

const AddContestPage = () => {
  return (
    <>
    {/* MasterLayout */}
    <MasterLayout>
        {/* BreadCrumb */}
        <Breadcrumb title="Add Contest" />

        {/* AddContest Layer */}
        <AddContestLayer />
        
    </MasterLayout>
    </>
  )
}

export default AddContestPage