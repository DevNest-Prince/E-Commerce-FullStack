import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Menu, MenuItem, styled } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../../Redux Toolkit/Seller/sellerOrderSlice";

// Styled Components (MUI)
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

// Order status list
const orderStatusList = [
  { color: "#FFA500", label: "PENDING" },
  { color: "#F5BCBA", label: "PLACED" },
  { color: "#F5BCBA", label: "CONFIRMED" },
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERED" },
  { color: "#FF0000", label: "CANCELLED" },
];

// Color mapping
const orderStatusColor = {
  PENDING: { color: "#FFA500" },
  PLACED: { color: "#F5BCBA" },
  CONFIRMED: { color: "#F5BCBA" },
  SHIPPED: { color: "#1E90FF" },
  DELIVERED: { color: "#32CD32" },
  CANCELLED: { color: "#FF0000" },
};

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector((store) => store);

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, orderId) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleUpdateOrder = (orderId, statusLabel) => {
    dispatch(
      updateOrderStatus({
        jwt: localStorage.getItem("jwt") || "",
        orderId,
        orderStatus: statusLabel,
      })
    );
    handleClose(orderId);
  };

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">All Orders</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell>Shipping Address</StyledTableCell>
              <StyledTableCell align="center">Order Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sellerOrder.orders.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell>{order._id}</StyledTableCell>

                {/* Products */}
                <StyledTableCell>
                  <div className="flex gap-1 flex-wrap">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex gap-5 p-2">
                        <img
                          className="w-20 rounded-md"
                          src={item.product.images[0]}
                          alt={item.product.title}
                        />

                        <div className="flex flex-col justify-between py-1">
                          <p>Title: {item.product.title}</p>
                          <p>Price: ₹{item.product.sellingPrice}</p>
                          <p>Color: {item.product.color}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </StyledTableCell>

                {/* Shipping Address */}
                <StyledTableCell>
                  <div className="flex flex-col gap-y-1">
                    <p>{order.shippingAddress.name}</p>
                    <p>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                    </p>
                    <p>
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pinCode}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {order.shippingAddress.mobile}
                    </p>
                  </div>
                </StyledTableCell>

                {/* Order Status */}
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      borderColor: orderStatusColor[order.orderStatus].color,
                      color: orderStatusColor[order.orderStatus].color,
                    }}
                    className="border px-2 py-1 rounded-full text-xs"
                  >
                    {order.orderStatus}
                  </Box>
                </StyledTableCell>

                {/* Update Status */}
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    onClick={(e) => handleClick(e, order._id)}
                    className="bg-primary-color text-white px-3"
                  >
                    Status
                  </Button>

                  <Menu
                    anchorEl={anchorEl[order._id]}
                    open={Boolean(anchorEl[order._id])}
                    onClose={() => handleClose(order._id)}
                  >
                    {orderStatusList.map((status) => (
                      <MenuItem
                        key={status.label}
                        onClick={() => handleUpdateOrder(order._id, status.label)}
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderTable;
