import { Divider, Heading, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import type { HypercertMetadata } from "@hypercerts-org/sdk";
import Image from "next/image";
import React from "react";
import { createClaim } from "utils/createClaim";
import type { formSchema, optionType } from "utils/types";
import _ from "lodash";
const greenPillProps = {
  src: "/logo-yellow.svg",
  width: 140,
  height: 140,
};

const neon_pillProps = {
  src: "/collection_logos/green-pill.png",
  width: 140,
  height: 140,
};

const vStackProps = {
  w: "320px",
  h: "400px",
  borderRadius: "8px",
  bg: "dark-green",
  backgroundImage: "url(/svgPatterns/certSvg.svg)",
  boxShadow: "0px 15px 45px rgba(37, 44, 55, 0.12)",
  backgroundSize: "cover",
  backgroundRepeat: "repeat-y",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  padding: 4,
};

function HyperCertificate({ formData }: { formData: formSchema }) {
  const metadata: HypercertMetadata = createClaim(formData);
  const selectedChapter = _.map(formData)[4] as unknown as  optionType;
  return (
    <VStack {...vStackProps}>
      <HStack w="full" justifyContent="center">
        <Image alt={""} {...neon_pillProps} />
      </HStack>
      <HStack w="full" justifyContent="space-between" padding={0} fontSize={15}>
        <Text>Timeframe</Text>
        <Text>
          {metadata?.hypercert?.work_timeframe.display_value ??
            "Start Date - End Date"}
        </Text>
      </HStack>

      <Divider borderColor="green" borderWidth="1px" width="100%" />

      <Heading
        textColor="white"
        lineHeight="normal"
        fontWeight="600"
        fontSize="24px"
        my={2}
        fontFamily="Volkhov, serif"
      >
        
        {selectedChapter?.label ?? "Name of the chapter"}
      </Heading>

      <HStack spacing={1} flexWrap="wrap">
        {(metadata?.hypercert?.work_scope?.display_value ??
          "Work, Scope, goes, here").split(", ").map((tag) => (
            <Tag
              key={tag + tag.substring(0, 2)}
              color="green"
              borderColor="green"
              border="1px"
              rounded="full"
              bgColor="transparent"
              fontSize="12px"
              fontWeight="normal"
            >
              {tag.toLowerCase()}
            </Tag>
          ))}
      </HStack>

      <Divider borderColor="green" borderWidth="1px" width="100%" />

      <HStack w="full" justifyContent="center" padding={2}>
        <Image {...greenPillProps} alt={"Hypercert"} />
      </HStack>
    </VStack>
  );
}

// Use React.memo to prevent unnecessary re-renders if the props haven't changed
export default React.memo(HyperCertificate);
