import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <StyledTableRow key={product.id} onClick={() => handleProductClick(product.id)}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">{product.salePrice}</StyledTableCell>
                <StyledTableCell align="right">{product.quantity}</StyledTableCell>
                <StyledTableCell align="right">{product.description}</StyledTableCell>
                <StyledTableCell align="right">{product.discountPercentage}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;
