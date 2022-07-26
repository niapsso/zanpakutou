import { NextApiRequest, NextApiResponse } from "next";

import { connect } from "../../../utils/connection";
import { ResponseFunctions } from "../../../utils/types";
import techValidator from "../../../utils/techValidator";
import { createTechSchema } from "../../../utils/schemas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Tech } = await connect();

      return res.json(await Tech.find({}).catch(errCatcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Tech } = await connect();

      const newTech = await techValidator(createTechSchema)(req, res);

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
