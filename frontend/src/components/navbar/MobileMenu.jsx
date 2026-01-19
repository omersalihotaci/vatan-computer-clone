import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryTree } from "../../hooks/useCategories";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const topInfoLinks = [
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
];

export default function MobileMenu({ open, onClose }) {
    const navigate = useNavigate();
    const { data: categories = [], isLoading } = useCategoryTree();
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [open]);

    if (!open || isLoading) return null;

    const go = (path) => {
        onClose();
        setActiveCategory(null);
        navigate(path);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40">
            <div className="absolute inset-0 bg-white flex flex-col">
                {/* HEADER */}
                <div className="h-14 bg-primary text-white flex items-center justify-between px-4">
                    {activeCategory ? (
                        <button onClick={() => setActiveCategory(null)}>
                            <IoChevronBack size={24} />
                        </button>
                    ) : (
                        <div />
                    )}

                    <span className="font-medium">
                        {activeCategory ? activeCategory.name : "Kategoriler"}
                    </span>

                    <button onClick={onClose}>
                        <IoClose size={26} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">
                    {/* 1️⃣ ANA EKRAN */}
                    {!activeCategory && (
                        <>
                            {/* CATEGORIES */}
                            <div>
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() =>
                                            cat.children?.length
                                                ? setActiveCategory(cat)
                                                : go(`/category/${cat.id}`)
                                        }
                                        className="h-12 px-4 flex items-center justify-between border-b border-gray-200 cursor-pointer"
                                    >
                                        <span>{cat.name}</span>
                                        <IoChevronForward />
                                    </div>
                                ))}
                            </div>
                            {/* TOP INFO LINKS */}
                            <div className="border-b bg-gray-800 text-white">
                                {topInfoLinks.map((item) => (
                                    <div
                                        key={item.label}
                                        //onClick={() => go(item.path)}
                                        className="h-12 px-4 flex items-center justify-between border-b border-gray-200 cursor-pointer"
                                    >
                                        <span>{item.label}</span>
                                        <IoChevronForward />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* 2️⃣ CHILD EKRANI */}
                    {activeCategory && (
                        <>
                            {/* Tüm kategori */}
                            <div
                                onClick={() =>
                                    go(`/category/${activeCategory.id}`)
                                }
                                className="h-12 px-4 flex items-center justify-between border-b border-gray-200 font-medium cursor-pointer"
                            >
                                <span>Tüm {activeCategory.name}</span>
                                <IoChevronForward />
                            </div>

                            {activeCategory.children.map((child) => (
                                <div
                                    key={child.id}
                                    onClick={() => go(`/category/${child.id}`)}
                                    className="h-12 px-4 flex items-center justify-between border-b border-gray-200 cursor-pointer"
                                >
                                    <span>{child.name}</span>
                                    <IoChevronForward />
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
