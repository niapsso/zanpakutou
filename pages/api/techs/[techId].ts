import { NextApiRequest, NextApiResponse } from "next";

import { connect } from "@/utils/connection";
import { ResponseFunctions } from "@/utils/types";
import schemaValidator from "@/utils/schemaValidator";
import { updateTechSchema } from "@/utils/schemas";
import authValidator from "@/utils/authValidator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { techId: id } = req.query;

      const { Tech } = await connect();

      return res.json(await Tech.findById(id).catch(errCatcher));
    },
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { techId: id } = req.query;

      const { Tech } = await connect();

      const validatedTech = await schemaValidator(updateTechSchema)(req, res);

      if (validatedTech) {
        const updatedTech = await Tech.findByIdAndUpdate(id, validatedTech, {
          new: true,
        }).catch(errCatcher);

        if (updatedTech) {
          return res.json(updatedTech);
        }

        return res.status(404).json({ message: "Tech not found" });
      }
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { techId: id } = req.query;

      const { Tech } = await connect();

      const deletedTech = await Tech.findByIdAndDelete(id);

      if (!deletedTech) {
        return res.status(404).json({ message: "Tech not found" });
      }

      return res.status(204).json({});
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
