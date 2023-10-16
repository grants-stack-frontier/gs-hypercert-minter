import { Box, Link, Text } from "@chakra-ui/react";
import _ from "lodash";
import type { formSchema, optionType } from "./types";

interface PreviewProps {
  formData: formSchema;
}

const formatExternalUrl = (externalUrl: string) => {
  if (externalUrl.startsWith('ipfs://')) {
    return externalUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return externalUrl;
}

const PreviewData: React.FC<PreviewProps> = ({ formData }) => {
  const selectedChapter = _.map(formData)[4] as unknown as optionType;

  return (
    <Box borderWidth="1px"   p={4} borderRadius="lg" _hover={{borderColor: 'green', backgroundColor:`rgba(0, 0, 0, 0.1)`}}>
      <Text mt={4} fontSize="lg" fontWeight="bold">Name:</Text>
      <Text>{selectedChapter?.label}</Text>

      <Text fontSize="lg" fontWeight="bold">Work Timeframe:</Text>
      <Text>{`Start: ${formData?.workTimeframeStart}`}</Text>
      <Text>{`End: ${formData?.workTimeframeEnd}`}</Text>

      <Text mt={4} fontSize="lg" fontWeight="bold">External URL:</Text>
      <Link isExternal href={formatExternalUrl(formData.externalUrl)} color="green" padding={0}>
        {formData?.externalUrl}
      </Link>

      <Text mt={4} fontSize="lg" fontWeight="bold">Description:</Text>
      <Text>{formData?.description}</Text>

      <Text mt={4} fontSize="lg" fontWeight="bold">Work Scope:</Text>
      <Text>{formData?.workScope?.map((item) => item.label).join(", ")}</Text>

      <Text mt={4} fontSize="lg" fontWeight="bold">Contributors:</Text>
      <Text>{formData?.contributors?.map((item) => item.label).join(", ") ?? 'None'}</Text>
    </Box>
  );
};

export default PreviewData;
