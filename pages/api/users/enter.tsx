import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    /*   const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!, // 느낌표(!)를 사용하여, 확정 할당을 전당함. ( 환경 변수는 실행전에 확인하지 못하는 듯 )
      body: `Your login token is ${payload}`,
    });
    console.log(message); */
  } else if (email) {
    /*  const email = await mail.send({
      from: "topcircle@gmail.com",
      to: "topcircle@gmail.com",
      subject: " Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email); */
  }

  console.log(token);

  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  fn: handler,
  isPrivate: false,
});
