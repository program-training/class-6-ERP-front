import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import LinearWithValueLabel from "../pages/LinearProgressWithLabel";
import { AdminProductInterface } from "../interface/interfaceEditProduct";
import { ProductData } from "../interface/interfaceAddProduct";
import { Input } from '@mui/material';


const apiUrl = import.meta.env.VITE_BASE_URL;

console.log(`API Base URL: ${apiUrl}`);


function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminProductInterface>();

  const [isForSale, setIsForSale] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [mesge, setMesge] = useState<string | null>(null);

  const handleChangeCheckbox = () => {
    setIsForSale(!isForSale);
  };

  const onSubmit = async (data: AdminProductInterface) => {
    try {
      const preset_key = "hyjuf7js";
      const cloudName = "class6erp";

      const imageInput = document.getElementById(
        "imageInput"
      ) as HTMLInputElement;
      if (imageInput && imageInput.files && imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", preset_key);

        setUploading(true);

        const imageUrl = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        setImage(imageUrl.data.url);

        const postData = {
          product: {
            product_id: id,
            name: data.name,
            sale_price: data.sale_price,
            quantity: data.quantity,
            description: data.description,
            category: data.category,
            discount_percentage: data.discount_percentage,
            image_url: imageUrl.data.url,
            image_alt: data.image_alt,
          },
          is_for_sale: isForSale,
          cost_price: data.cost_price,
          supplier: data.supplier,
        };

        const response = await axios.patch(
          `${apiUrl}/api/products/inventory/${id}`,

          // `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`,
          postData,
          {
            headers: {
              Authorization: Cookies.get("token"),
            },
          }
        );

        if (response.status === 200) {
          setMesge("Added successfully!");
          setTimeout(() => {
            navigate(`/products`);
          }, 2000);
        } else {
          console.error("Failed to add product");
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    async function getProduct(id: string) {
      try {
        const productData = await axios.get(
          `${apiUrl}/api/products/inventory/${id}`,

          // `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`,
          {
            headers: {
              Authorization: Cookies.get("token"),
            },
          }
        );

        Object.keys(productData.data).forEach(key => {
          if (!key.includes("product_id")) {
            setValue(key as ProductData, productData.data[key])
          }})

      } catch (err) {
        console.error(err);
      }
    }
    getProduct(id!);
  }, []);

  return (
    <Container>
      <Typography variant="h4">Edit Product</Typography>
      <Button
        onClick={() => {
          Cookies.remove("token");
          navigate("/");
        }}
      >
        Logout
      </Button>
      <Button onClick={() => navigate("/Products")}>All Products</Button>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5">Product properties</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column" }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Product Name"
            type="text"
            {...register("product.name"as ProductData, { required: true })}
            margin="normal"
          />
          {errors.name && <Alert severity="error">Product Name is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Sale Price"
            type="number"
            {...register("product.sale_price"as ProductData, { required: true })}
            margin="normal"
          />
          {errors.sale_price && <Alert severity="error">Sale Price is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Quantity"
            type="number"
            {...register("product.quantity" as ProductData, { required: true })}
            margin="normal"
          />
          {errors.quantity && <Alert severity="error">Quantity is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Description"
            type="text"
            {...register("product.description"as ProductData, { required: true })}
            margin="normal"
          />
          {errors.description && <Alert severity="error">Description is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Category"
            type="text"
            {...register("product.category"as ProductData, { required: true })}
            margin="normal"
          />
          {errors.category && <Alert severity="error">Category is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Discount Percentage"
            type="number"
            {...register("product.discount_percentage"as ProductData, { required: true })}
            margin="normal"
          />
          {errors.discount_percentage && (
            <Alert severity="error">Discount Percentage is required.</Alert>
          )}

          <Input
            type="file"
            id="imageInput"
            {...register("product.image_url" as ProductData, { required: true })}
            style={{ display: "none" }}
          />
          <label htmlFor="imageInput">
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Upload Image
            </Button>
          </label>

          {errors.image_url && <Alert severity="error">Image URL is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Image Alt"
            type="text"
            {...register("product.image_alt" as ProductData, { required: true })}
            margin="normal"
          />
          {errors.image_alt && <Alert severity="error">Image Alt is required.</Alert>}

          <Typography variant="h5" sx={{ mt: 2 }}>
            Product meta data
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={isForSale}
                onClick={handleChangeCheckbox}
                inputProps={{ "aria-label": "primary checkbox" }}
                {...register("is_for_sale", { required: false })}
              />
            }
            label="Is for Sale"
          />
          {errors.is_for_sale && <Alert severity="error">Is For Sale is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Cost Price"
            type="number"
            {...register("cost_price", { required: true })}
            margin="normal"
          />
          {errors.cost_price && <Alert severity="error">Cost Price is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Supplier"
            type="text"
            {...register("supplier", { required: true })}
            margin="normal"
          />
          {errors.supplier && <Alert severity="error">Supplier is required.</Alert>}
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }}
            />
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Product
          </Button>
          {uploading && <LinearWithValueLabel />}

          {mesge ? <h1> {mesge} </h1> : null}
        </Box>
      </Paper>
    </Container>
  );
}

export default EditProduct;