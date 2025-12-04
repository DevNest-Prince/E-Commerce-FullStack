import { Box, Grid, LinearProgress, Rating } from "@mui/material";

const RatingCard = ({ totalReview }) => {
  return (
    <div className="border p-5 rounded-md">
      <div className="flex items-center space-x-3 pb-10">
        <Rating name="read-only" value={4.6} precision={0.5} readOnly />
        <p className="opacity-60">{totalReview} Ratings</p>
      </div>

      {[
        { label: "Excellent", value: 40, color: "success" },
        { label: "Very Good", value: 30, color: "success" },
        { label: "Good", value: 25, color: "#885c0a" },
        { label: "Average", value: 21, color: "#885c0a" },
        { label: "Poor", value: 10, color: "error" },
      ].map((item, index) => (
        <Box key={index} className="mb-3">
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <p className="p-0">{item.label}</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{
                  bgcolor: "#d0d0d0",
                  borderRadius: 4,
                  height: 7,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: item.color,
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <p className="opacity-50 p-2">19259</p>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
};

export default RatingCard;
