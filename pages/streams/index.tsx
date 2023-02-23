import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import useSWR from "swr";
import { Stream } from "@prisma/client";
import Image from "next/image";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Stream: NextPage = () => {
  const { data } = useSWR<StreamsResponse>(`/api/streams`);
  return (
    <Layout hasTabBar title="라이브">
      <div className=" space-y-4 divide-y-[1px]">
        {data?.streams.map((stream) => (
          <Link legacyBehavior key={stream.id} href={`/streams/${stream.id}`}>
            <a className="block px-4  pt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-300 shadow-sm">
                <Image
                  fill
                  src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?height=320`}
                />
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Stream;
