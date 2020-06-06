import mongoose from "mongoose";

export async function getDbClient(dbString: string) {
  return await mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
