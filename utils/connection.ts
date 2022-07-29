import "dotenv/config";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Mongo db URI must be provided in a .env file, with MONGODB_URI as key"
  );
}

export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI, {
      ssl: true,
    })
    .catch((err) => console.error("Error during database initialization", err));

  const TechSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    docUrl: String,
    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  });

  const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const ProjectSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    repoUrl: String,
    projectUrl: String,
    description: String,
  });

  const Tech = mongoose.models.Tech || mongoose.model("Tech", TechSchema);
  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const Project =
    mongoose.models.Project || mongoose.model("Project", ProjectSchema);

  return { conn, Tech, User, Project };
};
