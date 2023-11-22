import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShopProductInterface {


  product_id?: string;
  name: string;
  sale_price: string; // נשמור את השם של sale_price כמו שהוא במופע שמתקבל
  quantity: number;
  description: string;
  category: string;
  discount_percentage: string; // נשמור את השם של discount_percentage כמו שהוא במופע שמתקבל
  image_url: string;
  image_alt: string;
}

// interface AdminProductInterface extends ShopProductInterface {
//   is_for_sale: boolean;
//   cost_price: number;
//   supplier: string;
// }

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
  const [products, setProducts] = useState<ShopProductInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8200/api/products/inventory');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);



  const handleProductClick = (productId: string | undefined) => {
    console.log(productId);
    navigate(`/Product/${productId}`);
  };

  const handleAddProduct = async () => {
    navigate(`/addProduct`);
  };



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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Sale Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Discount Percentage</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>



            {
              products?.map((product) => (
                <StyledTableRow key={product.product_id} onClick={() => handleProductClick(product.product_id)}>
                <StyledTableCell component="th" scope="row">
                  {product["product.name"] || "No Name"}</StyledTableCell>
                <StyledTableCell align="right">{product['product.sale_price']}</StyledTableCell>
                <StyledTableCell align="right">{product['product.quantity'] || 0}</StyledTableCell>
                <StyledTableCell align="right">{product.discount_percentage || "No Description"}</StyledTableCell>
                <StyledTableCell align="right">{product.discount_percentage || 0}</StyledTableCell>
              </StyledTableRow>
               
              ))
            }


          </TableBody>
        </Table>
      </TableContainer>

      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;