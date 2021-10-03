import { model, Schema, Document } from "mongoose";
import Answer, { AnswerDocument } from "./Answer";

export type QuestionDocument = Document & {
  content: string;
  answers: Array<AnswerDocument>;
};

const QuestionSchema: Schema = new Schema<QuestionDocument>({
  content: {
    type: String,
    required: [true, "Please add a content!"],
    unique: true,
    trim: true,
    maxlength: [50, "Content can not be more than 50 characters"],
  },
  answers: {
    type: [Answer.schema],
    validate: {
      validator: (value: Array<AnswerDocument>) => {
        return value && value.length === 4;
      },
      message: "Answers length should be 4!",
    },
  },
});

const Question = model<QuestionDocument>("Question", QuestionSchema);

export default Question;
