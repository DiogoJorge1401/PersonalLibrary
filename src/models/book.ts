import { model, Schema, SchemaType } from "mongoose";

export interface IBook {
  title: string;
  comments: Array<string>;
  commentcount: number;
}

const schema = new Schema<IBook>({
  title: { type: String, required: true },
  comments: [{ type: String, default: [] }],
});

schema.virtual("commentcount").get(function () {
  return this.comments?.length ?? 0;
});

const BookModel = model<IBook>("Book", schema);

export { BookModel };
