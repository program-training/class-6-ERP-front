import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

interface Image {
  url: string;
  alt: string;
}

interface ShopProductInterface {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: Image;
}

// const serverUrl = 'ה-URL-של-השרת';
// const token = 'ה-Token-שלך'; // נשים לב לשינוי זה עם המימוש המתאים לך

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const products: ShopProductInterface[] = [
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
  ];

  const handleProductClick = (productId: string) => {
    console.log(productId);
    navigate(`/Product/${productId}`);
  };

  const handleAddProduct = async () => {
navigate(`/addProduct`);
  };

  const filteredProducts = products.filter((product) => {
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

      <div>
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product.id)}>
            {product.name}
          </div>
        ))}
      </div>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;
