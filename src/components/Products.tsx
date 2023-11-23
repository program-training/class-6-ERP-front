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

export interface ShopProductInterface {
  'product.product_id'?: string;
  'product.name': string;
  'product.sale_price': number;
  'product.quantity': number;
  'product.description': string;
  'product.category': string;
  'product.discount_percentage': number;
  'product.image_url': string;
  'product.image_alt': string;
}

export interface AdminProductInterface extends ShopProductInterface {
  'is_for_sale': boolean;
  'cost_price': number;
  'supplier': string;
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
  const [products, setProducts] = useState<AdminProductInterface[]>([]);

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
              {/* <StyledTableCell align="right">Is For Sale</StyledTableCell> */}

            </TableRow>
          </TableHead>
          <TableBody>



            {
              products?.map((product) => (
                <StyledTableRow key={product['product.product_id']} onClick={() => handleProductClick(product['product.product_id'])}>
                  <StyledTableCell component="th" scope="row">
                    {product['product.name'] || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product['product.sale_price'] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product['product.quantity'] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product['product.description'] || "No Description"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product['product.discount_percentage'] || 0}
                  </StyledTableCell>
                  {/* <StyledTableCell align="right">
                    {product['is_for_sale'] || 0}
                  </StyledTableCell> */}
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