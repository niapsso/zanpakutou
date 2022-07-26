import * as yup from "yup";

export const createTechSchema = yup.object().shape({
  name: yup.string().required("name field is required"),
  imgUrl: yup.string().required("img url field is required"),
  docUrl: yup.string(),
  skillLevel: yup.string().oneOf(["beginner", "intermediate", "advanced"]),
});

export const updateTechSchema = yup.object().shape({
  name: yup.string(),
  imgUrl: yup.string(),
  docUrl: yup.string(),
  skillLevel: yup.string().oneOf(["beginner", "intermediate", "advanced"]),
});
