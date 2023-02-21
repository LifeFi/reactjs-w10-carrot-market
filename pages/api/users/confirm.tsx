import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: { payload: token },
    // include: { user: true }, // 연결된 user 정보 가져오려면
  });
  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken?.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    fn: handler,
    isPrivate: false,
  })
);
