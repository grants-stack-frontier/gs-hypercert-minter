import { VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { imageDataAtom } from "pages";
import { useEffect } from "react";
import type { formSchema } from "utils/types";

export const HypercertDisplay = ({ formData }: { formData: formSchema }) => {
  const [imageData, setImageData] = useAtom(imageDataAtom);
  const queryClient = useQueryClient();

  const mutation = useMutation<ArrayBuffer, Error, formSchema>(
    (data: formSchema) =>
      axios
        .post(
          "/api/og",
          { formData: data },
          {
            headers: { "Content-Type": "application/json" },
            responseType: "arraybuffer",
          }
        )
        .then((response) => response.data as ArrayBuffer),
    {
      // onSuccess: (data: ArrayBuffer) => {
      //   const base64 = btoa(
      //     new Uint8Array(data).reduce(
      //       (acc, byte) => acc + String.fromCharCode(byte),
      //       ""
      //     )
      //   );
      //   const encodedImage = `data:image/png;base64,${base64}`;
      //   queryClient.setQueryData(["hypercertImage"], encodedImage);
      //   setImageData(encodedImage);
      // },
      onSuccess: (data: ArrayBuffer) => {
        const base64 = Buffer.from(data).toString("base64");
        const encodedImage = `data:image/png;base64,${base64}`;
        queryClient.setQueryData(["hypercertImage"], encodedImage);
        setImageData(encodedImage);
      },
    }
  );

  useEffect(() => {

    if (!formData) return;
    if (!formData.name || formData.name.length === 0) {
      formData.name = [{value: "", label: ""}];
  }

    mutation.mutate(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <VStack>
      {imageData && (
        <Image src={imageData} alt="Hypercert Image" width={320} height={400} />
      )}
    </VStack>
  );
};
