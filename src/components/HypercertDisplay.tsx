import { Divider, Heading, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import type { formSchema  } from "utils/types";
import axios from "axios"; 
import type { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const HypercertDisplay = ({ formData }: { formData: formSchema }) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation<ArrayBuffer, Error, formSchema>(
      (data: formSchema) => axios.post("/api/og", { formData: data }, { responseType: 'arraybuffer' })
        .then((response) => response.data as ArrayBuffer),
      {
        onSuccess: (data: ArrayBuffer) => {
          const base64 = btoa(
            new Uint8Array(data)
              .reduce((acc, byte) => acc + String.fromCharCode(byte), '')
          );
          const encodedImage = `data:image/png;base64,${base64}`;
          queryClient.setQueryData(["hypercertImage"], encodedImage);
            setImageData(encodedImage);

        }
      }
    );
  
    useEffect(() => {
      mutation.mutate(formData);
    }, [formData, mutation]);
//   const [imageData, setImageData] = useState<string | null>(null);

//   useEffect(() => {
//     const apiUrl = "/api/og";

//     axios.post(apiUrl, { formData }, { responseType: 'arraybuffer' })
//     .then((response: AxiosResponse<ArrayBuffer>) => {
//       const base64 = btoa(
//         new Uint8Array(response.data)
//           .reduce((data, byte) => data + String.fromCharCode(byte), '')
//       );
//       const encodedImage = `data:image/png;base64,${base64}`;
//       setImageData(encodedImage);
//       console.log('Success:', encodedImage);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }, [formData]);

  return (
    <VStack>

      {imageData && (
        <Image
          src={imageData}
          alt="Hypercert Image"
          width={400} 
          height={320} 
        />
      )}


    </VStack>
  );
};
