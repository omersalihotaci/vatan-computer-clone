import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import logoB from "../../assets/logo/logoBlue.png";
import logoW from "../../assets/logo/logoWhite.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MainNavbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between h-16  relative w-full px-6 lg:px-8 xl:px-42  lg:mt-4 ">
            {/* Mobile hamburger menu */}
            <button className="lg:hidden p-2">
                <RxHamburgerMenu className="text-white" size={38} />
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 shrink-0  lg:mr-8 ">
                <a href="/">
                    <img
                        className="lg:hidden w-[108px] h-auto shrink-0"
                        src={logoB}
                        alt="Vatan Logo"
                    />
                    <img
                        className="hidden lg:block w-[122px] h-auto shrink-0 "
                        src={logoW}
                        alt="Vatan Logo"
                    />
                </a>
            </div>

            {/* Desktop search and buttons */}
            <div className="hidden lg:flex items-center justify-end flex-1 gap-8">
                {/* Search input - sağ tarafa yakın */}
                <div className="relative max-w-md flex-1">
                    <input
                        type="text"
                        name="search"
                        placeholder="Aramak istediğiniz ürünü yazın"
                        className="w-full px-4 py-2 border border-cardBorder bg-cardBorder rounded-full focus:outline-none"
                    />
                    <IoSearch
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                        size={18}
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* BUTTON + DROPDOWN WRAPPER */}
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center justify-between px-6 py-2 gap-2 bg-cardBorder rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <FiUser className="text-black" size={18} />
                            <span className="whitespace-nowrap">Giriş Yap</span>
                            <MdKeyboardArrowDown size={18} />
                        </button>

                        {/*  DROPDOWN (Butonun altına hizalı) */}
                        {open && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() =>{ setOpen(false); navigate("/auth?tab=login")}}
                                >
                                    Giriş Yap
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() =>{ setOpen(false); navigate("/auth?tab=register")}}
                                >
                                    Kaydol
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="flex items-center justify-between px-6 py-2 gap-2 bg-cardBorder rounded-full hover:bg-gray-200 transition-colors">
                        <AiOutlineShoppingCart
                            className="text-black"
                            size={18}
                        />
                        <span className="whitespace-nowrap">Sepetim</span>
                        <MdKeyboardArrowDown size={18} />
                    </button>
                </div>
            </div>

            {/* Mobile icons */}
            <div className="flex items-center justify-end gap-4 lg:hidden">
                <div className="p-2  cursor-pointer text-white hover:bg-gray-800 hover:text-white transition">
                    <FiUser size={28} />
                </div>

                <div className="p-2  cursor-pointer text-white hover:bg-gray-800 hover:text-white transition">
                    <AiOutlineShoppingCart size={28} />
                </div>
            </div>
        </div>
    );
}

export default MainNavbar;
