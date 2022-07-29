import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";

const schemaValidator =
  (schema: yup.AnyObjectSchema) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (!Object.keys(req.body)) {
      return res
        .status(400)
        .json({ message: "Empty requests are not allowed" });
    }

    return schema
      .validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      .catch((err) => {
        if (err instanceof yup.ValidationError) {
          return res.status(400).json({ message: err.errors.join(", ") });
        }

        return res.status(500).json({ message: "Internal server error" });
      });
  };

export default schemaValidator;
