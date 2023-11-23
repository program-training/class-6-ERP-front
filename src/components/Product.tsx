import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

export interface ShopProductInterface {
  "product.product_id"?: string;
  "product.name": string;
  "product.sale_price": number;
  "product.quantity": number;
  "product.description": string;
  "product.category": string;
  "product.discount_percentage": number;
  "product.image_url": string;
  "product.image_alt": string;
}

export interface AdminProductInterface extends ShopProductInterface {
  is_for_sale: boolean;
  cost_price: number;
  supplier: string;
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] =
    useState<AdminProductInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`
      );
      if (response.status === 200) {
        console.log("Product deleted successfully");
        navigate("/Products");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/EditProduct/${id}`);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        <Card
           sx={{
            padding: 3, 
            margin: "20px",
            backgroundColor: "lightgrey",
            borderRadius: "15px",
            width: "100%", 
            height:"560px"
          }}
        >
          <CardContent>
            <Typography variant="h4">
              {productDetails?.["product.name"]}
            </Typography>
            <Typography variant="body1">
              Sale Price: ${productDetails?.["product.sale_price"]}
            </Typography>
            <Typography variant="body1">
              Quantity: {productDetails?.["product.quantity"]}
            </Typography>
            <Typography variant="body1">
              Description: {productDetails?.["product.description"]}
            </Typography>
            <Typography variant="body1">
              Discount Percentage:{" "}
              {productDetails?.["product.discount_percentage"] ?? 0}%
            </Typography>
            <Typography variant="body1">
              Is For Sale: {productDetails?.is_for_sale ? "Yes" : "No"}
            </Typography>
            <Typography variant="body1">
              Cost Price: ${productDetails?.cost_price ?? 0}
            </Typography>
            <Typography variant="body1">
              Supplier: {productDetails?.supplier}
            </Typography>
            <CardMedia
              component="img"
              alt={productDetails?.["product.image_alt"]}
              height="280"
              image={productDetails?.["product.image_url"]}
              style={{ maxWidth: "100%" }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "grey",
                  color: "white",
                  marginRight: 1,
                }}
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
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;