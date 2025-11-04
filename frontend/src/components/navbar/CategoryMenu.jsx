import React from 'react'
import { useMainCategories } from '../../hooks/useCategories'
function CategoryMenu() {
  const { data, isLoading, error } = useMainCategories();

  if (isLoading) return <p>Kategoriler yükleniyor...</p>;
  if (error) return <p>Kategoriler alınırken hata oluştu!</p>;

  return (
      <div className=" hidden lg:flex justify-center gap-4 p-3 mt-2 bg-white border-y border-gray-200  ">
          {data.map((cat) => (
              <button
                  key={cat.id}
                  className="hover:text-blue-600 transition-colors text-sm font-medium"
              >
                  {cat.name}
              </button>
          ))}
      </div>
  );
}

export default CategoryMenu