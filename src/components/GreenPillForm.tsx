/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  Textarea,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { type Dispatch, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";
import supabase from "utils/supabase";
import * as z from "zod";

async function fetchTags() {
  const { data: options } = await supabase.from("tags").select(
    "tag_label, tag_value",
  );

  return options?.map((option) => ({
    label: option.tag_label,
    value: option.tag_value,
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

const animatedComponents = makeAnimated();

const customStyles = {
  menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
  control: (provided: object) => ({
    ...provided,
    minHeight: 50,
    height: "auto",
    borderRadius: 4,
    borderColor: "#666666",
  }),
};

const CalConfig = {
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      _hover: {
        background: "#254D32",
        color: "#fff",
      },
      color: "dark-grey",
    },
    selectedBtnProps: {
      background: "#C2E812",
    },
  },
  dateNavBtnProps: {
    _hover: {
      background: "#fff",
    },
    color: "dark-grey",
  },
  popoverCompProps: {
    popoverContentProps: {
      background: "#FFF",
      color: "black",
      padding: "0px",
    },
  },
  weekdayLabelProps: {
    fontWeight: "normal",
  },
  dateHeadingProps: {
    fontWeight: "semibold",
  },
};

export const schema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Maximum length of 255 characters exceeded" }),

  workScope: z.array(z.string())
    .min(1, { message: "At least one work scope is required" }),

  externalUrl: z.string()
    .url({
      message:
        "Invalid URL. Please ensure it follows http(s)://www.example.com format",
    }),

  description: z.string()
    .min(1, { message: "Description is required" })
    .max(144, { message: "Maximum length of 2000 characters exceeded" }),

  contributors: z.string()
    .min(1, { message: "At least one contributor is required" })
    .optional(),
  workTimeframeStart: z.date(),
  workTimeframeEnd: z.date(),
}).transform((data) =>
  ((+data.workTimeframeEnd) > (+data.workTimeframeStart))
    ? data
    : { ...data, workTimeframeEnd: 0 }
);

function GreenPillForm({
  setFormData,
  handleForm,
}: {
  setFormData: Dispatch<z.infer<typeof schema>>;
  handleForm: () => void;
}) {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: tags } = useSWR("tags", fetchTags);

  const portalRef = useRef<HTMLDivElement>(null);
  const allValues = watch();

  useEffect(() => setFormData(allValues as z.infer<typeof schema>));

  const [isLargerThan300] = useMediaQuery("(min-width: 300px)");
  return (
    <VStack maxW={"600px"} gap={20} ref={portalRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleForm();
        }}
        className="w-full"
      >
        <FormControl id="name" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Name of your Chapter
          </FormLabel>
          <Input
            {...register("name")}
            isInvalid={!!errors.name}
            required={true}
            autoFocus
            mb={4}
            height={"60px"}
            placeholder=""
          />
        </FormControl>
        <Box
          bg={"white"}
          alignItems={"flex-start"}
          w={"full"}
          flexDirection={"row"}
        >
          <FormLabel>List the tags for the scope of work</FormLabel>
          <Controller
            render={({ field }) => (
              <CreatableSelect
                {...field}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={tags}
                styles={customStyles}
                controlShouldRenderValue={true}
                menuPortalTarget={portalRef.current}
              />
            )}
            name="workScope"
            control={control}
          />
        </Box>
        <Box
          bg={"white"}
          alignItems={"flex-start"}
          w={"full"}
          flexDirection={"row"}
        >
          <FormLabel>Select the work timeframe</FormLabel>

          <Flex
            flexDir={isLargerThan300 ? "row" : "column"}
            justifyContent={"space-between"}
            zIndex={15}
            gap={4}
          >
            <InputGroup width={"auto"} zIndex={12} position={"relative"}>
              <FormLabel textColor={"dark-grey"} my={2}>
                Start Date
              </FormLabel>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Box
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <SingleDatepicker
                      date={value}
                      onDateChange={onChange}
                      propsConfigs={{ ...CalConfig }}
                    />
                    <CalendarIcon
                      color={"dark-grey"}
                      position={"absolute"}
                      mr={2}
                    />
                  </Box>
                )}
                name="workTimeframeStart"
                control={control}
              />
            </InputGroup>
            <InputGroup width={"auto"} zIndex={100}>
              <FormLabel textColor={"dark-grey"} my={2}>
                End Date
              </FormLabel>

              <Controller
                render={({ field: { onChange, value } }) => (
                  <Box
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <SingleDatepicker
                      date={value}
                      onDateChange={onChange}
                      propsConfigs={{ ...CalConfig }}
                    />
                    <CalendarIcon
                      color={"dark-grey"}
                      position={"absolute"}
                      mr={2}
                    />
                  </Box>
                )}
                name="workTimeframeEnd"
                control={control}
              />
            </InputGroup>
          </Flex>
        </Box>

        <FormControl id="externalUrl" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Provide a link where we can find more information on the work/impact
          </FormLabel>
          <Input
            {...register("externalUrl")}
            isInvalid={!!errors.externalUrl}
            required={true}
            autoFocus
            mb={4}
            placeholder="https://..."
            height={"60px"}
          />
        </FormControl>
        <FormControl id="description" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Describe the work delivered
          </FormLabel>
          <Textarea
            border="1px solid"
            borderColor="dark-grey"
            {...register("description")}
            isInvalid={!!errors.description}
            rows={6}
            placeholder="Social Impact, Public Health, Education, etc."
          />
        </FormControl>
        <FormControl id="contributors" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Any Other Contributors?
          </FormLabel>
          <Input
            border="1px solid"
            borderColor="dark-grey"
            {...register("contributors")}
            isInvalid={!!errors.contributors}
            placeholder=""
            height={"60px"}
          />
          <Text
            color="black"
            fontSize={"xs"}
            fontStyle="italic"
            fontWeight="light"
            lineHeight="normal"
            my={2}
          >
            (You can add names, addresses of contributors that consent to be
            registered publicly.)
          </Text>
        </FormControl>

        <Center>
          <Button
            type="submit"
            variant={"secondary"}
            w={"full"}
            my={8}
            width={"120px"}
          >
            Next
          </Button>
        </Center>
      </form>
    </VStack>
  );
}

export default GreenPillForm;
