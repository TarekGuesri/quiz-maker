import { model, Schema, Document } from "mongoose";
import { AnswerDocument } from "./Answer";

export type QuestionDocument = Document & {
  content: string;
  answers: AnswerDocument["_id"];
};

const QuestionSchema: Schema = new Schema<QuestionDocument>({
  content: {
    type: String,
    required: [true, "Please add a content!"],
    trim: true,
    maxlength: [50, "Content can not be more than 50 characters"],
  },
  answers: {
    type: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    validate: {
      validator: (value: Array<AnswerDocument>) => {
        return value && value.length === 4;
      },
      message: "Answers length should be 4!",
    },
  },
});

QuestionSchema.set("toJSON", {
  virtuals: true,
});

const Question = model<QuestionDocument>("Question", QuestionSchema);

export default Question;
