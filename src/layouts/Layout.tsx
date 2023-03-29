import Head from "next/head";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { BackgroundCurves } from "components/BackgroundCurves";
import { BackgroundFlares } from "components/BackgroundFlares";
import { ConnectWalletButton } from "components/ConnectWalletButton";

import site from "config/site";

const Footer = () => (
  <footer className="container mx-auto max-w-screen-lg p-4 text-xs">
    {
      "made with <3 at supermodular.xyz | we are building a more regerative internet | learn more"
    }
  </footer>
);
export const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-center">
        <div className="flex items-center justify-between p-6">
          <Link href={"/"} className="text-lg font-bold text-indigo-900">
            {site.title}
          </Link>
          <ConnectWalletButton />
        </div>
        <main className="container relative mx-auto flex max-w-screen-sm flex-1 flex-col p-4 text-gray-900">
          <div className="flex-1">{props.children}</div>
        </main>
        <Footer />
        <BackgroundCurves />
        <BackgroundFlares />
      </div>
    </>
  );
};

export const LandingLayout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-center">
        <div className="flex items-center justify-between p-6">
          <Link href={"/"} className="text-lg font-bold text-indigo-900">
            {site.title}
          </Link>
          <ConnectWalletButton />
        </div>
        <main className="container relative mx-auto flex max-w-screen-xl flex-1 flex-col p-4 text-gray-900">
          <div className="flex-1">{props.children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};
