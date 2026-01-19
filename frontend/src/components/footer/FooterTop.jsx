import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa6";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";

export default function FooterTop() {
    return (
        <div className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Mağaza */}
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <IoLocationOutline size={20} />
                        <span className="font-medium">Mağaza Bul</span>
                    </div>

                    {/* Telefon */}
                    <div className="flex items-center gap-2 justify-center">
                        <IoCallOutline size={20} />
                        <span className="font-medium">0850 222 56 56</span>
                    </div>

                    {/* Sosyal Medya */}
                    <div className="flex items-center gap-4 justify-center md:justify-end text-lg">
                        <FaFacebookF className="hover:opacity-80 cursor-pointer" />
                        <FaXTwitter className="hover:opacity-80 cursor-pointer" />
                        <FaLinkedinIn className="hover:opacity-80 cursor-pointer" />
                        <FaYoutube className="hover:opacity-80 cursor-pointer" />
                        <FaInstagram className="hover:opacity-80 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
