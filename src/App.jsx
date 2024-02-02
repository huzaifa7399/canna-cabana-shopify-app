import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SideBar } from "./components";
import { Coupons, Login, Sites } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SideBar />}>
          <Route path="/" element={<Sites />} />
          <Route path="/coupons" element={<Coupons />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
