import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/paginationbtn.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Allfoods = () => {
  const products = useSelector((state) => state.product);

  const [searchandle, setsearchandle] = useState("");
  const [pagenumber, setpagenumber] = useState(0);
  const searchedproduct = products?.products?.filter((item) => {
    if (searchandle === "") return item;
    if (
      item.title.toLocaleLowerCase().includes(searchandle.toLocaleLowerCase())
    )
      return item;
  });
  const productperpage = 4;
  const starterpage = pagenumber * productperpage;
  const dispaly = searchedproduct?.slice(
    starterpage,
    starterpage + productperpage
  );
  const pagecount = Math.ceil(searchedproduct?.length / productperpage);
  const changepage = ({ selected }) => {
    setpagenumber(selected);
  };
  console.log(pagenumber);
  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />
      <div className="flex items-center justify-between mx-4 my-2">
        <div className="flex ">
          <input
            type="text"
            placeholder="I'm looking for..."
            className="flex border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full w-[100%]"
            onChange={(e) => setsearchandle(e.target.value)}
          />
        </div>
      </div>
      <button className="ml-3 bg-red-400 rounded-xl p-1">
        <Link to={"/ipload"}>upload</Link>
      </button>
      <div className="flex  flex-wrap items-center justify-center mb-3 mx-2">
        {dispaly?.map((items) => (
          <ProductCard key={items._id} item={items} />
        ))}
      </div>
      {searchedproduct?.length > productperpage && (
        <div>
          <ReactPaginate
            pageCount={pagecount}
            onPageChange={changepage}
            previousLabel="Prev"
            nextLabel="Next"
            containerClassName="paginationbutton"
          />
        </div>
      )}
    </Helmet>
  );
};

export default Allfoods;
