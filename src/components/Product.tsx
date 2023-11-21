import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Image {
  url: string;
  alt: string;
}

interface ShopProductInterface {
  id: string | undefined;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: Image;
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // הנתונים מתוך מקור חיצוני או אובטני
  const productDetails: ShopProductInterface = {
    id: productId,
    name: 'Laptop',
    salePrice: 1200,
    quantity: 10,
    description: 'High-performance laptop for work and gaming.',
    category: 'Electronics',
    discountPercentage: 5,
    image: {
      url: 'https://example.com/laptop.jpg',
      alt: 'Laptop Image',
    },
  };

  const handleDelete = () => {
    // כאן יש לבצע שליחת המידע לשרת ומחיקה מהמסד הנתונים
    // אחרי מחיקה מוצלחת, יש לנווט לדף "כל המוצרים"
    console.log('Deleting product with ID:', productDetails.id);
    // ניתן להשתמש בפונקציות של fetch או axios כדי לבצע את הפעולה
    navigate('/Products');
  };

  const handleEdit = () => {
    // יש להעביר לדף "ערוך מוצר" ולשלוף מידע על המוצר לפי ה-ID
    navigate(`/EditProduct/${productDetails.id}`);
  };

  return (
    <div>
      <h1>Product Details</h1>
      <button onClick={() => navigate('/')}>Logout</button>
      <button onClick={() => navigate('/Products')}>All Products</button>

      <div>
        <p>ID: {productDetails.id}</p>
        <p>Name: {productDetails.name}</p>
        <p>Sale Price: {productDetails.salePrice}</p>
        <p>Quantity: {productDetails.quantity}</p>
        <p>Description: {productDetails.description}</p>
        <p>Category: {productDetails.category}</p>
        <p>Discount Percentage: {productDetails.discountPercentage}</p>
        <img src={productDetails.image.url} alt={productDetails.image.alt} />
      </div>

      <button onClick={handleDelete}>Delete Product</button>
      <button onClick={handleEdit}>Edit Product</button>
    </div>
  );
};

export default ProductDetails;
