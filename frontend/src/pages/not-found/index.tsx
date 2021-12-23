import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { CardBox } from "src/components/cards/card-box";

const NotFound: FC = () => {
  return (
    <CardBox>
      <Typography color="secondary" variant="h4" component="div" mb={4}>
        404
      </Typography>
      <Typography variant="h5" mb={3}>
        Page not found
      </Typography>
    </CardBox>
  );
};

export default NotFound;
