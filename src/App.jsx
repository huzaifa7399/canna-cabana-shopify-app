import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SideBar } from './components';
import { Coupons, Login, Sites, SingleSite, CreateCoupon } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route element={<SideBar />}>
          <Route path="/" element={<Sites />} />
          <Route path="/site/:id" element={<SingleSite />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/coupon/create" element={<CreateCoupon />} />
          <Route path="/coupon/edit/:id" element={<CreateCoupon />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
