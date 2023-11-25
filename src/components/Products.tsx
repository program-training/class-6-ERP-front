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
import  LoadingSpinner  from "../pages/Loading";
  
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
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
  const [sortOption, setSortOption] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const handleSortChange = (option: string) => {
    if (option === sortOption) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "erp-beak1-6.onrender.com/api/products/inventory", {
          headers: {
            Authorization: Cookies.get('token'),
          }
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
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product["product.name"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) => {
      const sortedProducts = [...prevFilteredProducts].sort((a, b) => {
        const valueA =
          sortOption === 'name'
            ? a['product.name']
            : sortOption === 'sale_price'
              ? a['product.sale_price']
              : sortOption === 'discount_percentage'
                ? a['product.discount_percentage']
                : sortOption === 'description'
                  ? a['product.description']
                  : sortOption === 'quantity'
                    ? a['product.quantity']
                    : 0;

        const valueB =
          sortOption === 'name'
            ? b['product.name']
            : sortOption === 'sale_price'
              ? b['product.sale_price']
              : sortOption === 'discount_percentage'
                ? b['product.discount_percentage']
                : sortOption === 'description'
                  ? b['product.description']
                  : sortOption === 'quantity'
                    ? b['product.quantity']
                    : 0;

        // Handle numeric and string comparisons
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          const nameA = String(valueA).toUpperCase();
          const nameB = String(valueB).toUpperCase();

          if (nameA < nameB) {
            return sortOrder === 'asc' ? -1 : 1;
          } else if (nameA > nameB) {
            return sortOrder === 'asc' ? 1 : -1;
          }

          return 0; // values must be equal
        }
      });

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
    <div>
      <div
        style={{
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ marginRight: "10px" }}>All Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <div>
          <label>Sort By:</label>
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOption}>
            <option value="name">Name</option>
            <option value="sale_price">Sale Price</option>
            <option value="discount_percentage">Discount Percentage</option>
            <option value="description">Description</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div>
          <label>Sort Order:</label>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
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
        </button>
        <button
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
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Sale Price</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">
                  Discount Percentage
                </StyledTableCell>
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
                    {product["product.name"] || "No Name"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.sale_price"] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.quantity"] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.description"] || "No Description"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["product.discount_percentage"] || 0}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product["is_for_sale"] ? 'true' : 'false'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Products;
