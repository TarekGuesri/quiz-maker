import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Footer: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }} py={5} textAlign="center">
      <Typography component="div" sx={{ flexGrow: 1 }}>
        © {new Date().getFullYear()} TARIQ LAMIN GUESRI. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
};
