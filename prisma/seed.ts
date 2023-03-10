import { PrismaClient } from "@prisma/client";

interface streamData {
  data: {
    name: string;
    description: string;
    price: number;
    user: {
      id: number;
    };
  };
}

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        cloudflareId: "xxxx",
        cloudflareUrl: "xxxx",
        cloudflareKey: "xxxx",
        user: {
          connect: {
            id: 14, // 실제 존재하는 ID로 해야 함.
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
