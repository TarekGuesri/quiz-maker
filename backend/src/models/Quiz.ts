import { model, Schema, Document } from "mongoose";
import { QuestionDocument } from "./Question";

export type QuizDocument = Document & {
  title: string;
  questions: QuestionDocument["_id"];
};

const QuizSchema: Schema = new Schema<QuizDocument>(
  {
    title: {
      type: String,
      required: [true, "Please add a title!"],
      trim: true,
      maxlength: [50, "Title can not be more than 50 characters"],
    },
    questions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Question" }],
      validate: {
        validator: (value: Array<QuestionDocument>) => {
          return value && value.length >= 1 && value.length <= 10;
        },
        message: "Questions length should be between 1 and 10!",
      },
    },
  },
  { timestamps: true },
);

const Quiz = model("Quiz", QuizSchema);

export default Quiz;
