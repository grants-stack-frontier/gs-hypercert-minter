import { type NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as z from "zod";
import { LandingLayout } from "../layouts/Layout";
import { Heading } from "@chakra-ui/react";
import { createClaim } from "../utils/createClaim";
import { generateSVG } from "../utils/svg";
import GreenPillForm from "components/GreenPillForm";
import React from "react";
//chakra migration
import {Button} from '@chakra-ui/react'

const Schema = z.object({
  contributor: z.string(),
  contributorAddress: z.string(),
  reason: z.string(),
});

const CurrentStep = ({ step = "text", isMinting = false }) => {
  // const form = useFormContext();

  switch (step) {
   
    case "design":
      return (
        <>
          {/* <Designer {...form.watch()} /> */}
          <div className="flex justify-between">
            <Button as={Link} href={"?step=text"} color="ghost">
              Back
            </Button>
            <Button
              className="w-48"
              disabled={isMinting}
              type="submit"
              color="gradient"
            >
              {isMinting ? "Generating..." : "Generate"}
            </Button>
          </div>
        </>
      );
      case "text":
        return (
          <>
            <GreenPillForm />
            {/* <div className="flex justify-center">
              <Button
                className="w-48"
                as={Link}
                // disabled={!form.formState.isValid}
                href={"?step=design"}
                color="gradient"
              >
                Next
              </Button>
            </div> */}
          </>
        );
  }

  return null;
};

const headings = {
  text: "GREENPILL.NETWORK",
  design: "Customize the design",
};

const Design: NextPage = () => {
  const router = useRouter();
  // const design = useDesign();
  const step = router.query.step as string;

  // const mint = useMint((data) => router.push(`/tx/${data.hash}`));
  return (
    <LandingLayout>
      <Flex flexDirection={'row'}>
      <form
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const contributor = formData.get('contributor') as string;
          const contributorAddress = formData.get('contributorAddress') as string;
          const reason = formData.get('reason') as string;

          const svg = await generateSVG({
            contributor,
            reason,
            // ...design,
          });

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const claimData = createClaim({
            // description,
            svg,
            contributor,
            contributorAddress,
          });

          // mint.mutate({ contributor: contributorAddress, claimData });
        }}
      >
        <Heading
          fontSize="4xl"
          fontFamily="bold"
          color="green.900"
          mb={6}
          textAlign="center"
        >
          {headings[step as never]}
        </Heading>
        
      </form>
      <CurrentStep step={step as never} />
      </Flex>

    </LandingLayout>
  );
};

export default Design;
