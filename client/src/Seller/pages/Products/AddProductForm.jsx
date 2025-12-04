import { useFormik } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import "tailwindcss/tailwind.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { colors } from "../../../data/Filter/color";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createProduct } from "../../../Redux Toolkit/Seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";

import React, { useState, useEffect } from "react";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const defaultInitialValues = {
  title: "",
  description: "",
  mrpPrice: "",
  sellingPrice: "",
  quantity: "",
  color: "",
  images: [],
  category: "",
  category2: "",
  category3: "",
  sizes: "",
};

const AddProductForm = ({
  initialValues = defaultInitialValues,
  mode = "add",
  onSubmit,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { sellerProduct } = useAppSelector((store) => store);

  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (onSubmit) {
        onSubmit(values);
      } else {
        dispatch(
          createProduct({
            request: values,
            jwt: localStorage.getItem("jwt"),
          })
        );
      }
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadingImage(true);

    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);

    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (categoryList, parentCategoryId) => {
    return categoryList.filter((c) => c.parentCategoryId == parentCategoryId);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setOpenSnackbar(true);
    }
  }, [sellerProduct.productCreated, sellerProduct.error]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          {/* Image Upload */}
          <Grid item xs={12} className="flex flex-wrap gap-5">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>

              {uploadImage && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            {formik.values.images.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  className="w-24 h-24 object-cover"
                  src={image}
                  alt="Product"
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  size="small"
                  color="error"
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <CloseIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </div>
            ))}
          </Grid>

          {/* Input Fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* Pricing */}
          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <TextField
              fullWidth
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* Color */}
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl fullWidth required>
              <InputLabel>Color</InputLabel>
              <Select
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((c) => (
                  <MenuItem value={c.name} key={c.name}>
                    <div className="flex gap-3">
                      <span
                        className={`h-5 w-5 rounded-full ${
                          c.name === "White" ? "border" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                      ></span>
                      {c.name}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sizes */}
          <Grid item xs={12} sm={6} lg={3}>
            <FormControl fullWidth required>
              <InputLabel>Sizes</InputLabel>
              <Select
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Category Selection (Add Mode Only) */}
          {mode === "add" && (
            <>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                  >
                    {mainCategory.map((item) => (
                      <MenuItem value={item.categoryId} key={item.categoryId}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <FormControl fullWidth required>
                  <InputLabel>Second Category</InputLabel>
                  <Select
                    name="category2"
                    value={formik.values.category2}
                    onChange={formik.handleChange}
                    label="Second Category"
                  >
                    {formik.values.category &&
                      categoryTwo[formik.values.category]?.map((item) => (
                        <MenuItem value={item.categoryId} key={item.categoryId}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <FormControl fullWidth required>
                  <InputLabel>Third Category</InputLabel>
                  <Select
                    name="category3"
                    value={formik.values.category3}
                    onChange={formik.handleChange}
                    label="Third Category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {formik.values.category2 &&
                      childCategory(
                        categoryThree[formik.values.category],
                        formik.values.category2
                      ).map((item) => (
                        <MenuItem value={item.categoryId} key={item.categoryId}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ p: "14px" }}
              disabled={sellerProduct.loading}
            >
              {sellerProduct.loading ? (
                <CircularProgress size={27} />
              ) : mode === "edit" ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid>

          {onClose && (
            <Grid item xs={12}>
              <Button fullWidth color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </form>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={sellerProduct.error ? "error" : "success"}
          onClose={handleCloseSnackbar}
          variant="filled"
        >
          {sellerProduct.error
            ? sellerProduct.error
            : "Product created successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductForm;
