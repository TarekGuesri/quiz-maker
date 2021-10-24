import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const progress = 10;

export const Progress: React.FC = () => {
  return (
    <>
      <Typography mb={2}>Question 1/6</Typography>
      <Box mx="auto" sx={{ width: "100%" }} mb={4}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </>
  );
};
