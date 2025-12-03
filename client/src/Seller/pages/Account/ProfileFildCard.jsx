import { Divider } from "@mui/material";
import React from "react";

const ProfileFildCard = ({ value, keys }) => {
  return (
    <div className="p-5 flex items-center bg-slate-50 rounded-md shadow-sm">
      <p className="w-24 lg:w-40 pr-5 text-gray-700 font-medium">{keys}</p>

      <Divider orientation="vertical" flexItem />

      <p className="pl-4 lg:pl-10 font-semibold text-gray-900 lg:text-lg">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default ProfileFildCard;
