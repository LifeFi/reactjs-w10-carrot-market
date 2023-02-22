import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

// useUser 에서 PUBLIC 배열에 정의한 라우트만 PUBLIC 으로 접근 가능하도록 하는 로직
// rerender 시에도 체크되도록, JSX로 집어 넣었음.
const LogincCheck = () => {
  const { pathname } = useRouter();
  useUser(pathname);
  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <LogincCheck />
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
