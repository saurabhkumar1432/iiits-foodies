import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";



const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user  }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  

  const login = async () => {
    if (!user){
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
  }
  else{
    setIsMenu(!isMenu);
  }

}
  return (
    <header className="fixed z-50 w-screen bg-slate-400 p-6 px-15 ">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-24 ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              services
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl  " />

            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              referrerpolicy="no-referrer"
              src={user ? user.photoURL : Avatar}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full object-cover drop-shadow-xl cursor-pointer  "
              alt="userProfile"
              onClick={login}
            />
{
  isMenu && (
    <motion.div 
    initial={{ opacity : 0, scale: 0.6 }} 
    animate={{ opacity : 1, scale: 1 }} 
    exit={{ opacity : 0, scale: 0.6 }} 
    className="w-40 bg-grey-50 shadow-xl rounded-lg flex flex-col absolute right-0 top-10  py-2">

{
  user && user.email === "saurabhkumar1432001@gmail.com" && (
    <Link to="/createItem">
      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd /></p>
    </Link>

  )
}

<p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">Log Out <MdLogout />
</p>
</motion.div>
  )
}

          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
