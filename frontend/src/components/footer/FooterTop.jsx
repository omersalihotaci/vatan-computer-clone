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
        <div className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="flex items-center gap-2">
                    <IoLocationOutline size={20} />
                    <span className="font-medium">Mağaza Bul</span>
                </div>

                <div className="flex items-center gap-2">
                    <IoCallOutline size={20} />
                    <span className="font-medium">0850 222 56 56</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaFacebookF />
                    <FaXTwitter />
                    <FaLinkedinIn />
                    <FaYoutube />
                    <FaInstagram />
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src="/google-play.svg"
                        alt="Google Play"
                        className="h-8"
                    />
                    <img src="/app-store.svg" alt="App Store" className="h-8" />
                    <img
                        src="/app-gallery.svg"
                        alt="App Gallery"
                        className="h-8"
                    />
                </div>
            </div>
        </div>
    );
}
