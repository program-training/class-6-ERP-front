import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

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

interface AdminProductInterface extends ShopProductInterface {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();




  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8200/api/products/${Products.id}`);
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
    // יש להעביר לדף "ערוך מוצר" ולשלוף מידע על המוצר לפי ה-ID
    navigate(`/EditProduct/${products.id}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h4">Product Details</Typography>            
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
