import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { useDispatch } from "react-redux";
import { fetching } from "./store/shopping-cart/fetched";

export const BASE_URL = "https://food-order-hr2h.onrender.com";
function App() {
  var rert;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetching());
  });
  return <Layout />;
}

export default App;
