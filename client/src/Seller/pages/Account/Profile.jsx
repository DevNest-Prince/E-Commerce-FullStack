import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
} from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetailsForm from "./PersionalDetailsForm";
import BusinessDetailsForm from "./BussinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { sellers } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState("personalDetails");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = (formName) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;

      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;

      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;

      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;

      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (sellers.profileUpdated || sellers.error) {
      setOpenSnackbar(true);
    }
  }, [sellers.profileUpdated, sellers.error]);

  return (
    <div className="lg:px-20 pt-5 pb-20 space-y-20">

      {/* PERSONAL DETAILS */}
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Seller Profile</h1>

          <Button
            onClick={() => handleOpen("personalDetails")}
            size="small"
            sx={{ borderRadius: "2.9rem" }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </div>

        <div className="space-y-5">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          />

          <ProfileFildCard keys="Seller Name" value={sellers.profile?.sellerName} />
          <Divider />

          <ProfileFildCard keys="Seller Email" value={sellers.profile?.email} />
          <Divider />

          <ProfileFildCard keys="Seller Mobile" value={sellers.profile?.mobile} />
        </div>
      </div>

      {/* BUSINESS DETAILS */}
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Business Details</h1>

          <Button
            onClick={() => handleOpen("businessDetails")}
            size="small"
            sx={{ borderRadius: "2.9rem" }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </div>

        <ProfileFildCard
          keys="Business Name"
          value={sellers.profile?.businessDetails?.businessName}
        />
        <Divider />

        <ProfileFildCard keys="GSTIN" value={sellers.profile?.GSTIN || "Not Provided"} />
        <Divider />

        <ProfileFildCard keys="Account Status" value={sellers.profile?.accountStatus} />
      </div>

      {/* PICKUP ADDRESS */}
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Pickup Address</h1>

          <Button
            onClick={() => handleOpen("pickupAddress")}
            size="small"
            sx={{ borderRadius: "2.9rem" }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </div>

        <ProfileFildCard
          keys="Address"
          value={sellers.profile?.pickupAddress?.address}
        />
        <Divider />

        <ProfileFildCard
          keys="City"
          value={sellers.profile?.pickupAddress?.city || "Not Provided"}
        />
        <Divider />

        <ProfileFildCard
          keys="State"
          value={sellers.profile?.pickupAddress?.state}
        />
        <Divider />

        <ProfileFildCard
          keys="Mobile"
          value={sellers.profile?.pickupAddress?.mobile}
        />
      </div>

      {/* BANK DETAILS */}
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">Bank Details</h1>

          <Button
            onClick={() => handleOpen("bankDetails")}
            size="small"
            sx={{ borderRadius: "2.9rem" }}
            variant="contained"
          >
            <EditIcon />
          </Button>
        </div>

        <ProfileFildCard
          keys="Account Holder Name"
          value={sellers.profile?.bankDetails?.accountHolderName}
        />
        <Divider />

        <ProfileFildCard
          keys="Account Number"
          value={sellers.profile?.bankDetails?.accountNumber || "Not Provided"}
        />
        <Divider />

        <ProfileFildCard
          keys="IFSC Code"
          value={sellers.profile?.bankDetails?.ifscCode}
        />
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>

      {/* SNACKBAR */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellers.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellers.error || "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
