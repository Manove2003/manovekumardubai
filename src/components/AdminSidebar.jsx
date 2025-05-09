import React from "react";
import homelogo from "../assests/Mansions.svg";
import penthouselogo from "../assests/Penthouse.svg";
import magazinelogo from "../assests/Magazine.svg";
import newletterlogo from "../assests/Newsletters.svg";
import collectible from "../assests/Collectible.svg";
import trafic from "../assests/Traffic.svg";
import logoutIcon from "../assests/Log Out.svg";
import leadslogo from "../assests/Leads White.svg";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ setViewType }) => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName")?.trim() || "";
  const lastName = localStorage.getItem("lastName")?.trim() || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Admin";
  console.log("Sidebar: firstName:", firstName, "lastName:", lastName, "fullName:", fullName); // Debug

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/login");
  };

  return (
    <div className="w-full sm:w-[280px] bg-green-900 text-white items-center justify-center flex flex-col p-4 sm:relative z-10">
      <h2 className="text-xl mb-16">Welcome, {fullName}</h2>
      <ul className="space-y-8 font-inter mb-8">
    
        <li
          onClick={() => setViewType("mansions")}
          className="hover:bg-green-700 p-2 flex border mb-4 gap-4 w-[200px] cursor-pointer items-center"
        >
          <img src={homelogo} alt="Mansions" className="w-6" /> Mansion Listings
        </li>
        <li
          onClick={() => setViewType("penthouses")}
          className="hover:bg-green-700 p-2 border cursor-pointer mb-4 flex w-[200px] gap-4 items-center"
        >
          <img src={penthouselogo} alt="Penthouses" className="w-4" /> Penthouse Listings
        </li>
        <li
          onClick={() => setViewType("luxurycollectibles")}
          className="hover:bg-green-700 p-2 border cursor-pointer w-[200px] flex mb-4 gap-4 items-center"
        >
          <img src={collectible} alt="Collectibles" className="w-4" /> Luxury Collectibles
        </li> 
        <li className="hover:bg-green-700 p-2 w-[200px] flex gap-4 border mb-4 items-center">
          <img src={trafic} alt="Traffic" className="w-4" /> Traffic Analytics
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-24 p-2 bg-red-800 flex w-[200px] gap-4 items-center cursor-pointer"
      >
        <img src={logoutIcon} alt="Logout" className="w-4" /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;