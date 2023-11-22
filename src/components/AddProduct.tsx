import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Checkbox, Grid } from '@mui/material';
import { useState } from 'react';
import { Label } from '@mui/icons-material';


interface shopProductInterface {
  id: string;
  name: string;
  salePrice: number;
  quantity: number;
  description: string;
  category: string;
  discountPercentage: number;
  image: {
    url: string;
    alt: string;
  };
}

interface adminProductInterface extends shopProductInterface {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}

function AddProduct() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<adminProductInterface>();

  const [checkbox, setCheckbox] = useState<boolean>(false)

  const onSubmit = async (data: adminProductInterface) => {
    try {
      console.log(data);
      
      const response = await axios.post('/api/saveProduct', data);

      console.log(response.data);

      navigate(`/product/${response.data.id}`);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleChangeCheckbox = () => {
    setCheckbox(!checkbox);
  };


  return (
    <Container>
      <Typography>Add Product</Typography>
      <Button onClick={() => navigate('/')}>Logout</Button>
      <Button onClick={() => navigate('/Products')}>All Products</Button>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{}}

      >
        {/* הוספת שדות shopProductInterface
        <TextField
          label="Product ID"
          type="text"
          id="id"
          {...register('id', { required: true })}
        />
        {errors.id && <p>Product ID is required.</p>} */}

        <TextField
          label='Product name'
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && <p>Product Name is required.</p>}

        <TextField
          label='Sale price'
          type="number"
          id="salePrice"
          {...register('salePrice', { required: true })}
        />
        {errors.salePrice && <p>Sale Price is required.</p>}

        <TextField
          label='Quantity'
          type="number"
          id="quantity"
          {...register('quantity', { required: true })}
        />
        {errors.quantity && <p>Quantity is required.</p>}

        <TextField
          label='Description'
          type="text"
          id="description"
          {...register('description', { required: true })}
        />
        {errors.description && <p>Description is required.</p>}

        <TextField
          label='Category'
          type="text"
          id="category"
          {...register('category', { required: true })}
        />
        {errors.category && <p>Category is required.</p>}

        <TextField
          label='Discount percentage'
          type="number"
          id="discountPercentage"
          {...register('discountPercentage', { required: true })}
        />
        {errors.discountPercentage && <p>Discount Percentage is required.</p>}
        <Box sx={{display: 'flex' }}>
          <Typography>Is for sale</Typography>
        <Checkbox
          checked={checkbox}
          onClick={handleChangeCheckbox}
          inputProps={{ "aria-label": "primary checkbox" }}
          {...register('isForSale', { required: true })}

        />  </Box>
      
        {errors.isForSale && <p>Is For Sale is required.</p>}


        {/* הוספת שדות של adminProductInterface */}
        {/* <TextField
          label='Is For Sale'
          id="isForSale"
          {...register('isForSale', { required: true })}
        />
        {errors.isForSale && <p>Is For Sale is required.</p>} */}

        <TextField
          label='Cost price'
          type="number"
          id="costPrice"
          {...register('costPrice', { required: true })}
        />
        {errors.costPrice && <p>Cost Price is required.</p>}

        <TextField
          label='Supplier'
          type="text"
          id="supplier"
          {...register('supplier', { required: true })}
        />
        {errors.supplier && <p>Supplier is required.</p>}

        <TextField
          label='Image'
          type="file"
          id="image.url"
          {...register('image.url', { required: false })}
        />
        {errors.image?.url && <p>Image URL is required.</p>}

        <TextField
          label='Image alt'
          type="text"
          id="image.alt"
          {...register('image.alt', { required: true })}
        />
        {errors.image?.alt && <p>Image Alt is required.</p>}

        <Button type="submit">Save Product</Button>
      </Box>
    </Container>
  );
}

export default AddProduct;
