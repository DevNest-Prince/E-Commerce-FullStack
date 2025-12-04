import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchSellerProducts,
  updateProduct,
  deleteProduct,
} from "../../../Redux Toolkit/Seller/sellerProductSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import AddProductForm from "./AddProductForm";

// Styled MUI Components
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

export default function ProductTable() {
  const { sellerProduct } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditProduct(null);
  };

  const handleEditSubmit = (values) => {
    if (editProduct && editProduct._id) {
      dispatch(updateProduct({ productId: editProduct._id, product: values }));
      setEditDialogOpen(false);
      setEditProduct(null);
    }
  };

  const handleDeleteClick = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">Products</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">Update Stock</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sellerProduct.products.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-1 flex-wrap">
                    {item.images.map((image, i) => (
                      <img key={i} className="w-20 rounded-md" src={image} alt="" />
                    ))}
                  </div>
                </StyledTableCell>

                <StyledTableCell align="right">{item.title}</StyledTableCell>
                <StyledTableCell align="right">₹{item.mrpPrice}</StyledTableCell>
                <StyledTableCell align="right">₹{item.sellingPrice}</StyledTableCell>
                <StyledTableCell align="right">{item.color}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button size="small">in_stock</Button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    className="bg-primary-color"
                    onClick={() => handleEditClick(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        maxWidth="md"
        fullWidth
      >
        {editProduct && (
          <AddProductForm
            initialValues={{ ...editProduct, images: editProduct.images || [] }}
            mode="edit"
            onSubmit={handleEditSubmit}
            onClose={handleEditDialogClose}
          />
        )}
      </Dialog>
    </>
  );
}
