import React from "react";
import { useAppSelector } from "src/redux/hooks";
import Typography from "@mui/material/Typography";
import { CardBox } from "src/components/cards/card-box";

const Quiz: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.quiz);

  return (
    <CardBox>
      <Typography variant="h5" component="div" mb={1}>
        Quiz Title
      </Typography>
    </CardBox>
  );
};

export default Quiz;
