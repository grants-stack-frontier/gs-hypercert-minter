/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Tooltip
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, type Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";
import supabase from "utils/supabase";
import { z } from "zod";

const animatedComponents = makeAnimated();
async function fetchTags() {
  const { data: options } = await supabase.from("tags").select(
    "tag_label, tag_value",
  );

  return options?.map((option) => ({
    label: option.tag_label as string,
    value: option.tag_value as string,
  }));
}

export const impactOptions = [
  { value: "carbon", label: "Carbon Neutrality" },
  { value: "renewable", label: "Renewable Energy" },
  { value: "recycling", label: "Recycling & Waste Reduction" },
  { value: "diversity", label: "Diversity & Inclusion" },
  { value: "community", label: "Community Engagement" },
  { value: "fair_trade", label: "Fair Trade" },
];

export const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255, {
    message: "Maximum length of 255 characters exceeded",
  }),
  workScope: z.array(z.string()).length(1, {
    message: "At least one work scope is required",
  }),
  externalUrl: z.string().url({
    message:
      "Invalid URL. Please ensure it follows http(s)://www.example.com format",
  }),
  description: z.string().min(1, { message: "Description is required" }),
  contributors: z.string().min(1, {
    message: "At least one contributor is required",
  }),
  workTimeframeStart: z.string().min(1, { message: "Work timeframe start is required" }),
  workTimeframeEnd: z.string().min(1, { message: "Work timeframe end is required" }),
})
.refine((data) => data.workTimeframeEnd > data.workTimeframeStart, {
  message: "Work timeframe end must be greater than start",
  path: ["workTimeframeEnd"],
});

type formSchema = z.infer<typeof schema>;



function GreenPillForm({
  setFormData,
  // handleForm,
}: {
  setFormData: Dispatch<formSchema>;
  handleForm: () => boolean;
}) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });


  const { data: tags } = useSWR("tags", fetchTags);

  const portalRef = useRef<HTMLDivElement>(null);
  const allValues = watch();

  useSWR(watch(), () => setFormData(allValues as z.infer<typeof schema>));

  
  const onSubmit = (values:formSchema) => {
    console.log(values);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     resolve(values);
    //   }, 3000);
    // });
  };


  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "600px", minWidth: "30%" }}
    >
      <Stack ref={portalRef} gap={4}>
        <FormControl id="name" isInvalid={!!errors.name}>
          <FormLabel fontWeight={550}>
            Name of the Chapter{" "}
            <Tooltip label="" fontSize="md">
              <InfoIcon ml={2} />
            </Tooltip>
          </FormLabel>
          <Input placeholder="Name" type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message as string}</FormErrorMessage>
        </FormControl>

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
                styles={{
                  menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
                  control: (provided: object) => ({
                    ...provided,
                    minHeight: 50,
                    height: "auto",
                    borderRadius: 4,
                    borderColor: "#666666",
                    ":active": {
                      borderColor: "green",
                    },
                  }),
                }}
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
          <FormLabel fontWeight={550}>
            Work Timeframe Start
          </FormLabel>
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
          <Input placeholder="URL" type="url" {...register("externalUrl")} />
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

        <FormControl id="contributors" isInvalid={!!errors.contributors}>
          <FormLabel fontWeight={550}>Contributors</FormLabel>
          <Input
            placeholder="Contributors"
            type="text"
            {...register("contributors")}
          />
          <FormErrorMessage color={'error-orange'}>
            {errors.contributors?.message as string}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant={"primary"}
          w="full"
        >
          Preview
        </Button>
      </Stack>
    </form>
  );
}

export default GreenPillForm;
