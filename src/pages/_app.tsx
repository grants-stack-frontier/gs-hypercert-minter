import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { configureChains } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from "wagmi/providers/alchemy";

import type { User } from "@privy-io/react-auth";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextSeo } from "next-seo";
import { type AppType } from "next/dist/shared/lib/utils";
import theme from "utils/theme";
import site from "../config/site";
import { Provider } from 'jotai'
import { ChakraProvider } from "@chakra-ui/react";

export const wagmiConfig = configureChains([goerli], [alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string}), publicProvider()]);


const handleLogin = (user: User) => {
  console.log(`User ${user?.id} logged in!`);
};

const queryClient = new QueryClient();

const { title, description, url } = site;
const imageUrl = `${url}/og.png`;
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <NextSeo
          title={title}
          description={description}
          canonical={url}
          openGraph={{
            url,
            title,
            description,
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: title,
                type: "image/png",
              },
            ],
            siteName: title,
          }}
          twitter={{
            handle: "@supermodularxyz",
            site: "@supermodularxyz",
            cardType: "summary_large_image",
          }}
        />
        <QueryClientProvider client={queryClient}>
          
            <PrivyProvider
              appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
              onSuccess={handleLogin}
              config={{
                loginMethods: ['wallet', 'email', 'google', 'discord',],
                appearance: {
                  theme: "dark",
                  accentColor: "#C2E812",
                  logo: "https://greenpill.network/src/images/greenpill-logo.svg",
                },
              }}
            >
              <PrivyWagmiConnector wagmiChainsConfig={wagmiConfig}>
                <Provider>
              <Component {...pageProps} />
              </Provider>
              </PrivyWagmiConnector>
            </PrivyProvider>
    
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
