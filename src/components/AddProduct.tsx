import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Alert,
} from '@mui/material';
import { useState } from 'react';

interface ShopProductInterface {
  name: string;
  sale_price: number;
  quantity: number;
  description: string;
  category: string;
  discount_percentage: number;
  image_url: string;
  image_alt: string;
}

interface AdminProductInterface extends ShopProductInterface {
  is_for_sale: boolean;
  cost_price: number;
  supplier: string;
}

function AddProduct() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue, // Add this line
    formState: { errors },
  } = useForm<AdminProductInterface>();

  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChangeCheckbox = () => {
    setIsForSale(!isForSale);
  };

  const onSubmit = async (data: AdminProductInterface) => {
    try {
      // Convert and resize image before sending
      const imageInput = document.getElementById('imageInput') as HTMLInputElement;
      if (imageInput && imageInput.files && imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        const resizedBase64Image = await convertImageToBase64(imageFile);
        setValue('image_url', resizedBase64Image);
        setPreviewImage(resizedBase64Image);

      }

      const requestData = {
        product: {
          name: data.name,
          sale_price: data.sale_price,
          quantity: data.quantity,
          description: data.description,
          category: data.category,
          discount_percentage: data.discount_percentage,
          image_url: data.image_url,
          image_alt: data.image_alt,
        },
        Admin_Products: {
          is_for_sale: isForSale,
          cost_price: data.cost_price,
          supplier: data.supplier,
        },
      };

      console.log(requestData);

      const response = await axios.post('http://localhost:8200/api/products/inventory', requestData);

      console.log(response.data);

      navigate(`/product/${response.data.product_id}`);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };
  

  return (
    <Container>
      <Typography variant="h4">Add Product</Typography>
      <Button onClick={() => navigate('/')}>Logout</Button>
      <Button onClick={() => navigate('/Products')}>All Products</Button>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5">Product properties</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}
        >
          <TextField label="Product Name" type="text" {...register('name', { required: true })} margin="normal" />
          {errors.name && <Alert severity="error">Product Name is required.</Alert >}

          <TextField label="Sale Price" type="number" {...register('sale_price', { required: true })} margin="normal" />
          {errors.sale_price && <Alert severity="error">Sale Price is required.</Alert >}

          <TextField label="Quantity" type="number" {...register('quantity', { required: true })} margin="normal" />
          {errors.quantity && <Alert severity="error">Quantity is required.</Alert >}

          <TextField label="Description" type="text" {...register('description', { required: true })} margin="normal" />
          {errors.description && <Alert severity="error">Description is required.</Alert >}

          <TextField label="Category" type="text" {...register('category', { required: true })} margin="normal" />
          {errors.category && <Alert severity="error">Category is required.</Alert >}

          <TextField
            label="Discount Percentage"
            type="number"
            {...register('discount_percentage', { required: true })}
            margin="normal"
          />
          {errors.discount_percentage && <Alert severity="error">Discount Percentage is required.</Alert >}

          <input
            type="file"
            id="imageInput"
            {...register('image_url', { required: false })}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <label htmlFor="imageInput">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Upload Image
            </Button>
          </label>
          {errors.image_url && <Alert severity="error">Image URL is required.</Alert >}

          <TextField label="Image Alt" type="text" {...register('image_alt', { required: true })} margin="normal" />
          {errors.image_alt && <Alert severity="error">Image Alt is required.</Alert >}

          <Typography variant="h5" sx={{ mt: 2 }}>
            Product meta data
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={isForSale}
                onClick={handleChangeCheckbox}
                inputProps={{ "aria-label": "primary checkbox" }}
                {...register('is_for_sale', { required: false })}
              />
            }
            label="Is for Sale"
          />
          {errors.is_for_sale && <Alert severity="error">Is For Sale is required.</Alert >}

          <TextField label="Cost Price" type="number" {...register('cost_price', { required: true })} margin="normal" />
          {errors.cost_price && <Alert severity="error">Cost Price is required.</Alert >}

          <TextField label="Supplier" type="text" {...register('supplier', { required: true })} margin="normal" />
          {errors.supplier && <Alert severity="error">Supplier is required.</Alert >}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
            />
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProduct;
