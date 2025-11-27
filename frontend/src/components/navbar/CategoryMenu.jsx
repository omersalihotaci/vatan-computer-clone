import React, { useState } from "react";
import { useCategoryTree } from "../../hooks/useCategories";

function CategoryMenu() {
    const { data: categories, isLoading, error } = useCategoryTree();
    const [activeId, setActiveId] = useState(null);

    if (isLoading) return null;
    if (error) return <p>Kategoriler alınırken hata oluştu!</p>;

    const activeCategory = categories.find((c) => c.id === activeId);

    return (
        <div className="hidden lg:block bg-white border-y border-gray-200">
            <div className="w-full flex justify-center">
                <div
                    className="relative inline-flex gap-6 px-4 py-3 mt-2"
                    onMouseLeave={() => setActiveId(null)}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onMouseEnter={() => setActiveId(cat.id)}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                                activeId === cat.id ? "text-blue-600" : ""
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}

                    {activeCategory &&
                        activeCategory.children &&
                        activeCategory.children.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t z-20">
                                <div className="grid grid-cols-4 gap-8 p-6 text-sm">
                                    {activeCategory.children.map((child) => (
                                        <div
                                            key={child.id}
                                            className="space-y-1"
                                        >
                                            <div className="font-semibold hover:text-blue-600 cursor-pointer">
                                                {child.name}
                                            </div>
                                            {child.children?.length > 0 && (
                                                <ul className="space-y-1 text-gray-600">
                                                    {child.children.map(
                                                        (sub) => (
                                                            <li
                                                                key={sub.id}
                                                                className="hover:text-blue-600 cursor-pointer"
                                                            >
                                                                {sub.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default CategoryMenu;
