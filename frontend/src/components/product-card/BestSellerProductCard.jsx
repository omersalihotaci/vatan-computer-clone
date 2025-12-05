import React from 'react'
import { Link } from 'react-router-dom';
import BaseProductCard from './BaseProductCard';

function BestSellerProductCard({product}) {
  return (
      <Link to={`/product/${product.id}`} key={product.id}>
          <BaseProductCard product={product} size="small" />
      </Link>
  );
}

export default BestSellerProductCard