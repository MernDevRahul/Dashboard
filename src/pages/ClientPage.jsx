import Breadcrumb from '../components/Breadcrumb'
import ClientLayer from '../components/ClientLayer'
import MasterLayout from '../masterLayout/MasterLayout'

const ClientPage = () => {

  return (
   <>
   <MasterLayout>

    {/* Breadcrumb */}
    <Breadcrumb title = "client page" />

    {/* ClientLayer */}
   <ClientLayer />
   </MasterLayout>
   </>
  )
}

export default ClientPage