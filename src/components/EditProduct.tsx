import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import LinearWithValueLabel from "../pages/LinearProgressWithLabel";

interface ShopProductInterface {
  product_id?: string;
  name: string;
  sale_price: number;
  quantity: number;
  description: string;
  category: string;
  discount_percentage: number;
  image_url: string;
  image_alt: string;
}

export interface AdminProductInterface extends ShopProductInterface {
  is_for_sale: boolean;
  cost_price: number;
  supplier: string;
}

export interface ProductFromServer {
  "product.product_id"?: string;
  "product.name": string;
  "product.sale_price": number;
  "product.quantity": number;
  "product.description": string;
  "product.category": string;
  "product.discount_percentage": number;
  "product.image_url": string;
  "product.image_alt": string;
  is_for_sale: boolean;
  cost_price: number;
  supplier: string;
}

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
          `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`,
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
          `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`,
          {
            headers: {
              Authorization: Cookies.get("token"),
            },
          }
        );
        setValue("name", productData.data["product.name"]);
        setValue("sale_price", productData.data["product.sale_price"]);
        setValue("quantity", productData.data["product.quantity"]);
        setValue("description", productData.data["product.description"]);
        setValue("category", productData.data["product.category"]);
        setValue("discount_percentage", productData.data["product.discount_percentage"]);
        setValue("image_url", productData.data["product.image_url"]);
        setValue("image_alt", productData.data["product.image_alt"]);
        setValue("is_for_sale", isForSale);
        setValue("cost_price", productData.data["cost_price"]);
        setValue("supplier", productData.data["supplier"]);
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
            {...register("name", { required: true })}
            margin="normal"
          />
          {errors.name && <Alert severity="error">Product Name is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Sale Price"
            type="number"
            {...register("sale_price", { required: true })}
            margin="normal"
          />
          {errors.sale_price && <Alert severity="error">Sale Price is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Quantity"
            type="number"
            {...register("quantity", { required: true })}
            margin="normal"
          />
          {errors.quantity && <Alert severity="error">Quantity is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Description"
            type="text"
            {...register("description", { required: true })}
            margin="normal"
          />
          {errors.description && <Alert severity="error">Description is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Category"
            type="text"
            {...register("category", { required: true })}
            margin="normal"
          />
          {errors.category && <Alert severity="error">Category is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Discount Percentage"
            type="number"
            {...register("discount_percentage", { required: true })}
            margin="normal"
          />
          {errors.discount_percentage && (
            <Alert severity="error">Discount Percentage is required.</Alert>
          )}

          <input
            type="file"
            id="imageInput"
            {...register("image_url", { required: false })}
            accept="image/*"
            style={{ display: "none" }}
          />
          <input>
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Upload Image
            </Button>
          </input>
          {uploading && <LinearWithValueLabel />}

          {errors.image_url && <Alert severity="error">Image URL is required.</Alert>}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Image Alt"
            type="text"
            {...register("image_alt", { required: true })}
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
          {mesge ? <p> {mesge} </p> : null}
        </Box>
      </Paper>
    </Container>
  );
}

export default EditProduct;
