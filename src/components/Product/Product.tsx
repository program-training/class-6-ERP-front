import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingSpinner from "../../pages/Loading";
import { Paper } from "@mui/material";

const apiUrl = import.meta.env.VITE_BASE_URL;

console.log(`API Base URL: ${apiUrl}`);

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/inventory/${id}`,

          // `https://erp-beak1-6.onrender.com/api/products/inventory/${id}`,
          { headers: { Authorization: Cookies.get("token") } }
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
        `${apiUrl}/api/products/inventory/${id}`,
        { headers: { Authorization: Cookies.get("token") } }
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
  
  const handleEdit = () => navigate(`/EditProduct/${id}`);
  
  return (<>
    {productDetails ? (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Paper style={{ background: "#f0eae2", padding: "20px" }}>
        <Card
          sx={{
            maxWidth: "60em",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent style={{ display: "flex" }}>
              <Typography component="div" style={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  alt={productDetails["product.image_alt"]}
                  height="320"
                  image={productDetails["product.image_url"]}
                  sx={{ width: "50%", objectFit: "cover", borderRadius: "8px" }}
                />
                <Typography
                  component="div"
                  style={{ paddingLeft: "1em", width: "50%" }}
                >
                  <Typography
                    variant="h4"
                    sx={{ marginBottom: "10px", color: "#333" }}
                  >
                    {productDetails["product.name"]}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Sale Price: $
                    {productDetails["product.sale_price"]}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Quantity:{" "}
                    {productDetails["product.quantity"]}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Description:{" "}
                    {productDetails["product.description"]}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Discount Percentage:{" "}
                    {productDetails["product.discount_percentage"]}%
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Is For Sale:{" "}
                    {productDetails["is_for_sale"] ? "Yes" : "No"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Cost Price: ${productDetails["cost_price"]}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#555", marginBottom: "8px" }}
                  >
                    Supplier: {productDetails["supplier"]}
                  </Typography>
                                    <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#d32f2f",
                      "&:hover": { bgcolor: "#b71c1c" },
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "7em",
                      backgroundColor: "#1976D2",
                      "&:hover": { backgroundColor: "#1565C0" },
                    }}
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </Typography>
              </Typography>
           
          </CardContent>
        </Card>
      </Paper>
    </Grid>
     ) : (<LoadingSpinner />)
    }
    </>
  );
};

export default ProductDetails;
