import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { useDispatch } from "react-redux";
import { fetching } from "./store/shopping-cart/fetched";

export const BASE_URL = "http://localhost:7000";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetching());
  });
  return <Layout />;
}

export default App;
