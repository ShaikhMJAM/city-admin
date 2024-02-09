import { Box, Typography } from "@mui/material";
import notFoundImage from "assets/images/notFoundImage.svg";

export const PageNotFound = () => {
  return (
    <Box>
      <img src={notFoundImage} style={{ aspectRatio: 2 / 0.8 }} />
      <Typography variant="h4" fontWeight={700} textAlign={"center"}>
        Oops! Page Not Found
      </Typography>
    </Box>
  );
};
