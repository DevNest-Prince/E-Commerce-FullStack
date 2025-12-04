import React from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../util/formatDate";

const OrderItemCard = ({ item, order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/account/orders/${order?._id}/item/${item?._id}`)
      }
      className="
        bg-white border rounded-xl
        p-4 shadow-sm hover:shadow-lg transition
        cursor-pointer
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* LEFT SIDE — ORDER IMAGE + ITEM NAME */}
      <div className="flex items-center gap-3 flex-1">
        <Avatar
          src={item?.product?.images?.[0]}
          sx={{ width: 56, height: 56, bgcolor: teal[500] }}
        />
        <div>
          <h2 className="font-semibold text-gray-900 text-sm md:text-base">
            {item?.product?.name}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Qty: {item?.quantity}
          </p>
        </div>
      </div>

      {/* CENTER — ORDER DATE */}
      <div className="flex flex-col text-left md:text-center flex-1">
        <p className="text-gray-500 text-xs">Ordered On</p>
        <p className="text-gray-800 font-medium">{formatDate(order?.createdAt)}</p>
      </div>

      {/* RIGHT — STATUS */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <ElectricBoltIcon className="text-teal-600" />
        <span className="text-teal-700 font-semibold text-sm md:text-base">
          {item?.status}
        </span>
      </div>
    </div>
  );
};

export default OrderItemCard;
