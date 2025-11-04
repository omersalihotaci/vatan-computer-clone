import React from "react";
import { Link } from "react-router-dom";

function TopInfoBar() {
    const topBarLinks = [
        { label: "Web'e Özel", path: "/web-ozel" },
        { label: "Fırsat", path: "/firsat" },
        { label: "Online Hediye Kartı", path: "/hediye-karti" },
        { label: "Yeni Ürünler", path: "/yeni-urunler" },
        { label: "OEM Paketler", path: "/oem-paketler" },
        { label: "PC Toplama", path: "/pc-toplama" },
        { label: "Outlet", path: "/outlet" },
        { label: "Yenilenmiş Telefon", path: "/yenilenmis-telefon" },
        { label: "Sipariş Takibi", path: "/siparis-takibi" },
        { label: "İade", path: "/iade" },
        { label: "Mağazalar", path: "/magazalar" },
        { label: "İşe Alım", path: "/ise-alim" },
        { label: "Bize Ulaşın", path: "/iletisim" },
    ];

    return (
        <div className="w-full text-xs text-gray-600 py-2 hidden lg:block">
            <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-hidden whitespace-nowrap px-4">
                {topBarLinks.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="hover:text-primary transition text-sm"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TopInfoBar;
