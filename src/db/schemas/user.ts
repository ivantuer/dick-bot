import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  size: number;
  chatId: string;
  userId: string;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  size: { type: Number, required: true },
  chatId: { type: Number, required: true },
  userId: { type: Number, required: true },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
