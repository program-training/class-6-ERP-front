import axios from "axios";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LoadingSpinner from "../pages/Loading";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, Select, InputLabel } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdminProductInterface } from "../interface/interface";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  
  "&:hover ": {
    cursor: "pointer", 
  },
}));


const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<AdminProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    AdminProductInterface[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleSortChange = (option: string) => {
    if (option === sortOption) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://erp-beak1-6.onrender.com/api/products/inventory",
          {
            headers: {
              Authorization: Cookies.get("token"),
            },
          }
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product["product.name"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

 // Effect to filter products based on the search term
  useEffect(() => {
    // Logic to filter products based on search term
    const filtered = products.filter((product) =>
      product["product.name"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    // Logic to sort filtered products
    setFilteredProducts((prevFilteredProducts) => {
      const sortedProducts = [...prevFilteredProducts].sort(
        (a: AdminProductInterface, b: AdminProductInterface) => {
          const valueA =
            sortOption === "name"
              ? a["product.name"]
              : sortOption === "sale_price"
              ? parseFloat(String(a["product.sale_price"]))
              : sortOption === "discount_percentage"
              ? parseFloat(String(a["product.discount_percentage"]))
              : sortOption === "description"
              ? a["product.description"]
              : sortOption === "quantity"
              ? a["product.quantity"]
              : 0;

          const valueB =
            sortOption === "name"
              ? b["product.name"]
              : sortOption === "sale_price"
              ? parseFloat(String(b["product.sale_price"]))
              : sortOption === "discount_percentage"
              ? parseFloat(String(b["product.discount_percentage"]))
              : sortOption === "description"
              ? b["product.description"]
              : sortOption === "quantity"
              ? b["product.quantity"]
              : 0;

          // Handle numeric and string comparisons
          if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
          } else {
            const nameA = String(valueA).toUpperCase();
            const nameB = String(valueB).toUpperCase();

            if (nameA < nameB) {
              return sortOrder === "asc" ? -1 : 1;
            } else if (nameA > nameB) {
              return sortOrder === "asc" ? 1 : -1;
            }

            return 0; // values must be equal
          }
        }
      );

      return sortedProducts;
    });
  }, [sortOption, sortOrder]);

  const handleProductClick = (productId: string | undefined) => {
    console.log(productId);
    navigate(`/Product/${productId}`);
  };

  const handleAddProduct = async () => {
    navigate(`/addProduct`);
  };

  return (
    <Box>
      <Typography
        component="div"
        style={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h1" style={{ marginRight: "10px" }}>
          All Products
        </Typography>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
            },
            "& .MuiInputBase-input": {
              color: "withe",
            },
          }}
        />
        <Typography component="div">
          <InputLabel sx={{ color: "white" }}>Sort By:</InputLabel>
          <Select
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            sx={{ color: "white" }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="sale_price">Sale Price</MenuItem>
            <MenuItem value="discount_percentage">Discount Percentage</MenuItem>
            <MenuItem value="description">Description</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </Typography>
        <Typography component="div">
          <InputLabel sx={{ color: "white" }}>Sort Order:</InputLabel>
          <Select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            sx={{ color: "white" }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Typography>
        <Button
          onClick={handleAddProduct}
          style={{
            marginLeft: "10px",
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}
        >
          Add Product
        </Button>
        <Button
          onClick={() => navigate("/")}
          style={{
            marginLeft: "10px",
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}
        >
          Logout
        </Button>
      </Typography>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Sale Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="right">
                  Discount Percentage
                </StyledTableCell>
                <StyledTableCell align="right">Picture</StyledTableCell>
                <StyledTableCell align="right">Is For Sale</StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.map((product) => (
                <StyledTableRow
                  key={product["product.product_id"]}
                  onClick={() =>
                    handleProductClick(product["product.product_id"])
                  }
                >
                  <StyledTableCell component="th" scope="row">
                    {product["product.product_id"] || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {product["product.name"] || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.sale_price" ]+"$" || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.quantity"] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product["product.description"] || "No Description"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.discount_percentage"]+'%'|| 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography component="div"
                      onMouseEnter={() =>
                        setHoveredImage(product["product.image_url"])
                      }
                      onMouseLeave={() => setHoveredImage(null)}
                      style={{ position: "relative" }}
                    >
                      <img
                        src={product["product.image_url"]}
                        alt={product["product.image_alt"] || "No Alt Text"}
                        style={{ width: "50px", height: "50px" ,borderRadius: "13%"}}
                      />
                      {hoveredImage === product["product.image_url"] && (
                        <Typography component="div"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1,
                          }}
                        >
                          <img
                            src={product["product.image_url"]}
                            alt={product["product.image_alt"] || "No Alt Text"}
                            style={{ width: "150px", height: "150px" ,borderRadius: "13%"}} 
                          />
                        </Typography>
                      )}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["is_for_sale"] ? (
                      <CheckCircleOutlinedIcon />) : (<CloseIcon />)}
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
