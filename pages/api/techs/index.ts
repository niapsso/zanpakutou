import { NextApiRequest, NextApiResponse } from "next";

import authValidator from "../../../utils/authValidator";
import schemaValidator from "../../../utils/schemaValidator";
import { connect } from "../../../utils/connection";
import { ResponseFunctions } from "../../../utils/types";
import { createTechSchema } from "../../../utils/schemas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Tech } = await connect();

      return res.json(await Tech.find({}).lean().catch(errCatcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { Tech } = await connect();

      const newTech = await schemaValidator(createTechSchema)(req, res);

      if (newTech) {
        return res
          .status(201)
          .json(await Tech.create(newTech).catch(errCatcher));
      }
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
