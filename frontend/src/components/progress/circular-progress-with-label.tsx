import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number },
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        size={160}
        sx={{
          color: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
        }}
        {...props}
        color="secondary"
        value={100}
      />
      <CircularProgress
        sx={{
          color: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.primary.dark
              : theme.palette.primary.light,
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
        }}
        variant="determinate"
        size={160}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
