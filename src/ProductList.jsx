import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const ProductList = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const itemsPerPage = 12; // Number of items to display per page
  const products = useSelector((state) => state.products.products);

  // Filter products with search query and selected category
  const filteredProducts = products.filter((product) => {
    const selectCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return selectCategory && matchesSearch;
  });

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // fetch the current page products
  const currentProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle card click to open modal
  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  // Handle modal close
  const handleClose = () => {
    setSelectedProduct(null);
  };

  // Change Page
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="product">
      <div
        className="list-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Product List</h2>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1); // Reset to the first page when category changes
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="beauty">Beauty</MenuItem>
            <MenuItem value="fragrances">Fragrance</MenuItem>
            <MenuItem value="kitchen-accessories">Kitchen Accessories</MenuItem>
            <MenuItem value="home-decoration">Home Decoration</MenuItem>
            <MenuItem value="groceries">Groceries</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={4} md={3}>
              <Card
                onClick={() => handleCardClick(product)}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${product.price.toFixed(2)}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Typography variant="body2">
                      Discount: {product.discountPercentage}%
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No products available for this search term.</Typography>
          </Grid>
        )}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      {/* Modal for product detail  */}
      <Dialog open={Boolean(selectedProduct)} onClose={handleClose}>
        {selectedProduct && (
          <>
            <div className="list-title">
              <DialogTitle>{selectedProduct.title}</DialogTitle>
              <DialogActions>
                <Button onClick={handleClose} color="warning">
                  X
                </Button>
              </DialogActions>
            </div>
            <DialogContent>
              <div className="list-header">
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  style={{ width: "400px", marginBottom: "10px" }}
                />
                <div>
                  <Typography variant="body2">
                    {selectedProduct.description}
                  </Typography>
                  <Typography variant="h6">
                    Price: ${selectedProduct.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Category: {selectedProduct.category}
                  </Typography>
                  <Typography variant="body2">
                    Rating: {selectedProduct.rating} ⭐
                  </Typography>
                  <Typography variant="body2">
                    Stock: {selectedProduct.stock} available
                  </Typography>
                  {selectedProduct.discountPercentage > 0 && (
                    <Typography variant="body2">
                      Discount: {selectedProduct.discountPercentage}%
                    </Typography>
                  )}
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ProductList;
