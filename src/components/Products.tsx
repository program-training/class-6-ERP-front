import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

const Products = () => {
  const navigate = useNavigate();
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const products = [
    {
      id: '1',
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
    },
    {
      id: '2',
      name: 'Smartphone',
      salePrice: 600,
      quantity: 20,
      description: 'Latest smartphone with advanced features.',
      category: 'Electronics',
      discountPercentage: 10,
      image: {
        url: 'https://example.com/smartphone.jpg',
        alt: 'Smartphone Image',
      },
    },
    // ניתן להוסיף מוצרים נוספים כמו כן
  ]

  const [searchTerm, setSearchTerm] = useState('');

  const handleProductClick = (productId : string) => {
    // מתוך המוצר, יש לשלוף את הפרטים של המוצר ולשלוף לדף "פרטי מוצר"
    navigate(`/product/${productId}`);
  };

  const handleAddProduct = () => {
    // יש להעביר לדף "הוספת מוצר"
    navigate('/AddProduct');
  };

  const filteredProducts = products.filter((product) => {
    // סינון לפי מילות חיפוש
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>All Products</h1>
      <button onClick={() => navigate('/')}>Logout</button>
      
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id} onClick={() => handleProductClick(product.id)}>
            {product.name}
          </li>
        ))}
      </ul>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;
