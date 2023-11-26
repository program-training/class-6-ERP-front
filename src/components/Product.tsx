import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
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
import  LoadingSpinner  from "../pages/Loading";
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = process.env.REACT_APP_BASE_URL;

console.log('API URL:', apiUrl);

// import Box from "@mui/material/Box";



<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
</style>
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
          `${apiUrl}api/products/inventory/${id}`, {
          headers: {
            Authorization: Cookies.get('token'),
          }
        }

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
        `${apiUrl}api/products/inventory/${id}`, {
          headers: {
            Authorization: Cookies.get('token'),
          }
        }

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
          style={{
            margin: "20px",
            maxWidth: "60em",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent style={{ display: "flex" }}>
            {productDetails ? (
              <>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginRight: "20px",
                      height: "100%",
                      width: "50%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={productDetails["product.image_alt"]}
                      height="320"
                      image={productDetails["product.image_url"]}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div style={{ paddingLeft: '1em', height: "100%", width: "50%" }}>
                    <Typography
                      variant="h4"
                      style={{ marginBottom: "10px", color: "#333", }}
                    >
                      {productDetails["product.name"]}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Sale Price: ${productDetails["product.sale_price"]}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Quantity: {productDetails["product.quantity"]}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Description: {productDetails["product.description"]}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Discount Percentage:{" "}
                      {productDetails["product.discount_percentage"]}%
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Is For Sale:{" "}
                      {productDetails["is_for_sale"] ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Cost Price: ${productDetails["cost_price"]}
                    </Typography>
                    <Typography variant="body1" style={{ color: "#555" }}>
                      Supplier: {productDetails["supplier"]}
                    </Typography>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "grey",
                        color: "white",
                        '&:hover': {
                          bgcolor: 'lightgray'
                        }
                      }}
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        margin: '1em',
                        backgroundColor: "grey",
                        color: "white",
                        width: '7em',
                        '&:hover': {
                          bgcolor: 'lightgray'
                        }
                      }}
                      startIcon={<EditIcon />}
                      onClick={handleEdit}

                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </>
            ) : (
             < LoadingSpinner/>           )}

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;