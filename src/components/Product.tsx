import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<AdminProductInterface | null>(null);
  // const { id } = productId
  console.log(productId);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8200/api/products/inventory/${productId}`);
        setProductDetails(response.data);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [productId]); // Include productId as a dependency

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8200/api/products/inventory/${productId}`);
      if (response.status === 200) {
        console.log('Product deleted successfully');
        navigate('/Products');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error during product deletion:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/EditProduct/${productId}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            {productDetails ? (
              <>
                <Typography variant="h4">{productDetails['product.name']}</Typography>
                <Typography variant="body1">Sale Price: ${productDetails['product.sale_price']}</Typography>
                <Typography variant="body1">Quantity: {productDetails['product.quantity']}</Typography>
                <Typography variant="body1">Description: {productDetails['product.description']}</Typography>
                <Typography variant="body1">Discount Percentage: {productDetails['product.discount_percentage']}%</Typography>
                <Typography variant="body1">Is For Sale: {productDetails['is_for_sale'] ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1">Cost Price: ${productDetails['cost_price']}</Typography>
                <Typography variant="body1">Supplier: {productDetails['supplier']}</Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete Product
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit Product
                </Button>
              </>
            ) : (
              <Typography variant="body1">Loading...</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
