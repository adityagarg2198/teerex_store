import Sidebar from '../../Components/Sidebar/Sidebar';
import ProductCatalog from '../../Containers/ProductCatalog/ProductCatalog';
import './landingPage.css';

const LandingPage = () => {
  return (
    <div className='flex landing-page'>
      <Sidebar />
      <ProductCatalog />
    </div>
  );
};

export default LandingPage;
