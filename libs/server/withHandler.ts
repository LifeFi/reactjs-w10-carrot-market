import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  fn: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  fn,
  isPrivate = true,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end(); // 405 method not allowed
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Plz log in" });
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error }); // 5xx Server error
    }
  };
}
