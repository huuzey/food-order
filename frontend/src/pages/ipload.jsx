import React from "react";
import { useState } from "react";
import { BASE_URL } from "../App";
import axios from "axios";

const Ipload = () => {
  const [photo, setphoto] = useState(null);
  const [image, setimage] = useState(null);
  const [succ, setsucc] = useState("");
  const [inputs, setinputs] = useState({
    title: "",
    category: "",
    desc: "",
    price: "",
  });
  const inputHandle = (e) => {
    setsucc("");
    if (e.target.files.length !== 0) {
      setimage(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      setphoto(formData);
    }
  };
  const senddata = async (clo) => {
    try {
      const resp = await axios.post(`${BASE_URL}/api/vv/postfood`, {
        img: clo,
        main: inputs,
      });
      setsucc("The food is uploaded successfully");
      if (resp.data) {
        setphoto(null);
        setinputs({
          title: "",
          desc: "",
          category: "",
          price: "",
        });
      }
      console.log("food sent successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const cloudsend = async (req, res) => {
    if (
      inputs.title &&
      inputs.desc &&
      inputs.price &&
      inputs.category &&
      photo
    ) {
      try {
        const { data } = await axios.post(`${BASE_URL}/image-upload`, photo);
        console.log("image sent successfully");
        if (data) {
          senddata(data);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(photo);
  const subhandler = (e) => {
    setsucc("");

    setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 ">
        <label className="  gap-1   border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={inputHandle}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
      <div>
        <input
          type="text"
          required
          placeholder="title"
          value={inputs.title}
          name="title"
          onChange={subhandler}
          className="flex border-b-2 w-[100%] focus:w-[130%] p-1 focus:outline-none  border-fuchsia-300 rounded-full "
        />
        <input
          type="text"
          required
          value={inputs.category}
          name="category"
          placeholder="category"
          onChange={subhandler}
          className="flex w-[100%] border-b-2 p-1 focus:w-[130%] focus:outline-none  border-fuchsia-300 rounded-full "
        />
        <input
          type="text"
          required
          value={inputs.desc}
          name="desc"
          placeholder="description"
          onChange={subhandler}
          className="flex w-[100%] focus:w-[130%] border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
        />
        <input
          type="number"
          required
          value={inputs.price}
          name="price"
          placeholder="price"
          onChange={subhandler}
          className="flex border-b-2 p-1 focus:w-[50%] focus:flex focus:items-center focus:justify-center focus:outline-none w-[100%]  border-fuchsia-300 rounded-full"
        />
        <p className="text-sm my-2 text-emerald-400">{succ}</p>
      </div>
      <button
        className="bg-red-400 rounded-xl p-1 my-2 hover:bg-red-800 hover:scale-105"
        onClick={cloudsend}
      >
        send
      </button>
    </div>
  );
};

export default Ipload;
