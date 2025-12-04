import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { updateHomeCategory } from "../../../Redux Toolkit/Admin/AdminSlice";

// Form validation schema
const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

// Category level 2 mappings
const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

// Category level 3 mappings
const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const UpdateHomeCategoryForm = ({ category, handleClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      image: "",
      category: "",
      category2: "",
      category3: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (category?._id) {
        dispatch(
          updateHomeCategory({
            id: category._id,
            data: { image: values.image, categoryId: values.category3 },
          })
        );
      }
      handleClose();
    },
  });

  const childCategory = (categories, parentId) => {
    return categories.filter((child) => child.parentCategoryId == parentId);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>

      {/* Image Field */}
      <TextField
        fullWidth
        id="image"
        name="image"
        label="Image URL"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />

      {/* Main Category */}
      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Category 2</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          label="Category 2"
        >
          {mainCategory.map((item) => (
            <MenuItem key={item.categoryId} value={item.categoryId}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Level 2 Category */}
      <FormControl
        fullWidth
        error={formik.touched.category2 && Boolean(formik.errors.category2)}
        required
      >
        <InputLabel id="category2-label">Second Category</InputLabel>
        <Select
          labelId="category2-label"
          id="category2"
          name="category2"
          value={formik.values.category2}
          onChange={formik.handleChange}
          label="Second Category"
        >
          {formik.values.category &&
            categoryTwo[formik.values.category]?.map((item) => (
              <MenuItem key={item.categoryId} value={item.categoryId}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Level 3 Category */}
      <FormControl
        fullWidth
        error={formik.touched.category3 && Boolean(formik.errors.category3)}
        required
      >
        <InputLabel id="category3-label">Third Category</InputLabel>
        <Select
          labelId="category3-label"
          id="category3"
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
              <MenuItem key={item.categoryId} value={item.categoryId}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ py: ".9rem" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UpdateHomeCategoryForm;
