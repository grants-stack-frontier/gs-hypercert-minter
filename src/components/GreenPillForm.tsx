/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { CalendarIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useRef, type Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";
import supabase from "utils/supabase";
import * as z from "zod";
import PreviewComp from "./Preview";

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
  handleForm: () => boolean;
}) {
  const {
    register,
    formState: { errors },
    control,
    watch,
    reset,
    
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: tags } = useSWR("tags", fetchTags);

  const portalRef = useRef<HTMLDivElement>(null);
  const allValues = watch();

  useSWR(watch(), () => setFormData(allValues as z.infer<typeof schema>));

  // const [isLargerThan300] = useMediaQuery("(min-width: 300px)");
  return (
    <VStack maxW={"600px"} gap={20} ref={portalRef}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const readyToMint = handleForm();

          if(readyToMint)
            {
              setTimeout(() => reset(), 30000)
              
            }

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
            placeholder="e.g. GreenPill Tokyo"
          />
        </FormControl>
        <Box
          bg={"white"}
          alignItems={"flex-start"}
          w={"full"}
          flexDirection={"row"}
        >
          <FormLabel>List the tags for the scope of work
          <Tooltip label='Try to keep it simple like beach cleanup' fontSize='md' >
              <InfoIcon ml={2}/>
            </Tooltip>
          </FormLabel>

          
          


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
  my={12}
  flexDirection={"row"}
>
  
  <FormLabel>Select the work timeframe</FormLabel>
  <HStack>
    <Controller
      render={({ field: { onChange, value } }) => (
        <Box
          justifyContent={"flex-end"}
          alignItems={"start"}
          width={'full'}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
        >
          <FormLabel textColor={"dark-grey"} my={2}>
            Start Date
          </FormLabel>
          <SingleDatepicker
            date={value}
            
            onDateChange={onChange}
            propsConfigs={{ ...CalConfig }}
          />
          <CalendarIcon
            color={"dark-grey"}
            position={"absolute"}
            bottom={3}
            right={2}
          />
        </Box>
      )}
      name="workTimeframeStart"
      control={control}
    />
  
      <Controller
        render={({ field: { onChange, value } }) => (
          <Box
            justifyContent={"flex-end"}
            alignItems={"start"}
            display={"flex"}
            flexDirection={"column"}
            width={'full'}
            position={"relative"}
          >
            <FormLabel textColor={"dark-grey"} my={2}>
              End Date
            </FormLabel>
            <SingleDatepicker
              date={value}
              onDateChange={onChange}
              propsConfigs={{ ...CalConfig }}
            />
            <CalendarIcon
              color={"dark-grey"}
              position={"absolute"}
              bottom={3}
              right={2}
            />
          </Box>
        )}
        name="workTimeframeEnd"
        control={control}
      />
    </HStack>
  
</Box>





        <FormControl id="externalUrl" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Provide a link where we can find more information on the work.
            <Tooltip label='This can be a set of images, reports, links to blogs, or any other source of information that supports your claim. Make sure the information is publicly available.' fontSize='md' >
              <InfoIcon ml={2}/>
            </Tooltip>
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

            
            <Tooltip label='The desciption is one of the first things people will see when inspecting your claim. Try to strike a balance between complete and concise.' fontSize='md' >
              <InfoIcon ml={2}/>
            </Tooltip>
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
          <PreviewComp formData={allValues as z.infer<typeof schema>} />
        </Center>
      </form>
    </VStack>
  );
}

export default GreenPillForm;
