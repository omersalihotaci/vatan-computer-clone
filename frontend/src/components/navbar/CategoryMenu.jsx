import React from 'react'
import { useMainCategories } from '../../hooks/useCategories'
function CategoryMenu() {
  const { data, isLoading, error } = useMainCategories();

  if (isLoading) return <p>Kategoriler yükleniyor...</p>;
  if (error) return <p>Kategoriler alınırken hata oluştu!</p>;

  return (
      <nav className="flex gap-4 p-3 bg-white shadow">
          {data.map((cat) => (
              <button
                  key={cat.id}
                  className="hover:text-blue-600 transition-colors text-sm font-medium"
              >
                  {cat.name}
              </button>
          ))}
      </nav>
  );
}

export default CategoryMenu