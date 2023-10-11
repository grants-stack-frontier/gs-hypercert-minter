/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { imageDataAtom } from "pages";
import { useRef, type Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";
import { fetchChapters, fetchMembers, fetchTags } from "utils/db";
import { customStyles } from "utils/styles";
import type { formSchema, optionType } from "utils/types";
import { zFormSchema } from "utils/types";
import Preview from "./Preview";
import { useAtom } from "jotai";
import type { Chain } from "wagmi";

const animatedComponents = makeAnimated();

interface GreenPillFormProps {
  setFormData: Dispatch<formSchema>;
  authenticatedAndCorrectChain: string;
  chain: Chain | undefined;
}

function GreenPillForm({
  setFormData,
  authenticatedAndCorrectChain,
  chain,
}: GreenPillFormProps) {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(zFormSchema),
  });
  const { data: chapters } = useSWR("chapters", fetchChapters);
  const { data: tags } = useSWR("tags", fetchTags);
  const allValues = watch();
  const selectedChapter = _.map(allValues)[4] as unknown as optionType;
  const { data: members } = useSWR(selectedChapter, () =>
    fetchMembers(selectedChapter?.value)
  );
  useSWR(allValues, () => setFormData(allValues));

  const [imageData] = useAtom(imageDataAtom);

  const portalRef = useRef<HTMLDivElement>(null);

  const onSubmit = (values: formSchema) => {
    console.log(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "600px", minWidth: "30%" }}
    >
      <Stack ref={portalRef} gap={4}>
        <FormControl>
          <FormLabel fontWeight={550}>
            Name of the chapter
            <Tooltip label="What's the name of your chapter?" fontSize="md">
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={chapters}
                  controlShouldRenderValue={true}
                  menuPortalTarget={portalRef.current}
                  styles={customStyles}
                />
                <FormErrorMessage>
                  {errors.name?.message as string}
                </FormErrorMessage>
              </>
            )}
            name="name"
            control={control}
          />
        </FormControl>{" "}
        <FormControl>
          <FormLabel fontWeight={550}>
            List the tags for the scope of work
            <Tooltip
              label="Try to keep it simple like beach cleanup"
              fontSize="md"
            >
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>

          {/* add greenish styling and 60px height to the Creatable Select */}

          <Controller
            render={({ field }) => (
              <>
                <CreatableSelect
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={tags}
                  controlShouldRenderValue={true}
                  menuPortalTarget={portalRef.current}
                  styles={customStyles}
                />
                <FormErrorMessage>
                  {errors.workScope?.message as string}
                </FormErrorMessage>
              </>
            )}
            name="workScope"
            control={control}
          />
        </FormControl>
        <FormControl
          id="workTimeframeStart"
          isInvalid={!!errors.workTimeframeStart}
        >
          <FormLabel fontWeight={550}>Work Timeframe Start</FormLabel>
          <Input
            placeholder="Work Timeframe Start"
            type="date"
            {...register("workTimeframeStart")}
          />
          <FormErrorMessage>
            {errors.workTimeframeStart?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="workTimeframeEnd"
          isInvalid={!!errors.workTimeframeEnd}
        >
          <FormLabel fontWeight={550}>Work Timeframe End</FormLabel>
          <Input
            placeholder="Work Timeframe End"
            type="date"
            {...register("workTimeframeEnd")}
          />
          <FormErrorMessage>
            {errors.workTimeframeEnd?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="externalUrl" isInvalid={!!errors.externalUrl}>
          <FormLabel fontWeight={550}>
            External URL{" "}
            <Tooltip
              label="This can be a set of images, reports, links to blogs, or any other source of information that supports your claim. Make sure the information is publicly available."
              fontSize="md"
            >
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>
          <Input placeholder="URL" {...register("externalUrl")} />
          <FormErrorMessage>
            {errors.externalUrl?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="description" isInvalid={!!errors.description}>
          <FormLabel fontWeight={550}>
            Description
            <Tooltip
              label="The description is one of the first things people will see when inspecting your claim. Try to strike a balance between complete and concise."
              fontSize="md"
            >
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>
          <Input
            placeholder="Description"
            type="text"
            {...register("description")}
          />
          <FormErrorMessage>
            {errors.description?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={550}>
            Contributors
            <Tooltip
              label="List of people who made this possible"
              fontSize="md"
            >
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>

          <Controller
            render={({ field }) => (
              <>
                <CreatableSelect
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={members as optionType[]}
                  controlShouldRenderValue={true}
                  menuPortalTarget={portalRef.current}
                  styles={customStyles}
                />
                <FormErrorMessage>
                  {errors.contributors?.message as string}
                </FormErrorMessage>
              </>
            )}
            name="contributors"
            control={control}
          />
        </FormControl>
        <Preview
          formData={allValues}
          image={imageData}
          authenticatedAndCorrectChain={authenticatedAndCorrectChain}
          chain={chain}
        />
      </Stack>
    </form>
  );
}

export default GreenPillForm;
