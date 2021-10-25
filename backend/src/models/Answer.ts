import { model, Schema, Document } from "mongoose";

export type AnswerDocument = Document & {
  text: string;
  isCorrect: boolean;
};

const AnswerSchema: Schema = new Schema<AnswerDocument>({
  text: {
    type: String,
    required: [true, "Please add a text!"],
    trim: true,
    maxlength: [50, "Text can not be more than 50 characters"],
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

AnswerSchema.set("toJSON", {
  virtuals: true,
});

const Answer = model<AnswerDocument>("Answer", AnswerSchema);

export default Answer;
