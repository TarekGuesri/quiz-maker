import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const Progress: React.FC<ProgressProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const progress = (100 * currentQuestion) / totalQuestions;

  return (
    <>
      <Typography mb={2} data-testid="progress-text">
        Question {`${currentQuestion}/${totalQuestions}`}
      </Typography>
      <Box mx="auto" sx={{ width: "100%" }} mb={4}>
        <LinearProgress
          variant="determinate"
          value={progress}
          data-testid="progress-bar"
        />
      </Box>
    </>
  );
};
