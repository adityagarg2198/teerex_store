import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import LandingPage from './Page/LandingPage/LandingPage';
import Checkout from './Page/Checkout/Checkout';
import StoreProvider from './Context/store';

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/cart' element={<Checkout />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
