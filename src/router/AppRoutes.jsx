import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import New from "../pages/New";
import History from "../pages/History";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<New />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}