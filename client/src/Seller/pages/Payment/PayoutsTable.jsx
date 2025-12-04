import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchPayoutsBySeller } from "../../../Redux Toolkit/Seller/payoutSlice";

const PayoutsTable = () => {

  const { sellerOrder } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPayoutsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="payout table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sellerOrder.orders.map((item) => (
              <TableRow key={item._id}>

                {/* Date */}
                <TableCell align="left">{item.date}</TableCell>

                {/* Amount */}
                <TableCell>
                  ₹{item.totalSellingPrice || item.amount || "---"}
                </TableCell>

                {/* Status */}
                <TableCell align="right">
                  {item.orderStatus || "PAID"}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default PayoutsTable;
