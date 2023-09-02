/* eslint-disable @typescript-eslint/no-unsafe-return */
'use client'
import { CalendarIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const colorOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
];


const animatedComponents = makeAnimated();

const customStyles = {
  menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
  control: (provided: object) => ({
    ...provided,
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    borderRadius: 4,
    borderColor: "#666666",
  })
};

const CalConfig = {
  dayOfMonthBtnProps: {
    defaultBtnProps: {
      _hover: {
        background: '#254D32',
        color: '#fff',
      },
      color: "dark-grey"
    },
    selectedBtnProps: {
      background: '#C2E812',
    },
  },
  dateNavBtnProps: {
    _hover: {
      background: '#fff',
    },
    color: "dark-grey"
  },
  popoverCompProps: {
    popoverContentProps: {
      background: '#FFF',
      color: 'black',
      padding: '0px',
    },
  },
  weekdayLabelProps: {
    fontWeight: 'normal',
  },
  dateHeadingProps: {
    fontWeight: 'semibold'
  }
}


const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  tags: z.string().min(1, { message: "Required" }),
  link: z.string().url({ message: "Invalid URL" }),
  description: z.string().min(1, { message: "Required" }),
  others: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

const GreenPillForm = ({isClient}: {isClient:boolean}) => {
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [isLargerThan300] = useMediaQuery("(min-width: 300px)")
  return (
    <VStack maxW={"600px"} gap={20}>
      <form
        onSubmit={(d) => console.log(d)}
        onKeyUpCapture={(e) => {
          e.preventDefault();
          const values = getValues();
          console.log(values);
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
            control={control}
            name="tags"
            render={() => (
              isClient ? <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={colorOptions}
                styles={customStyles}
                menuPortalTarget={document.body ?? undefined}
              /> : <> </>
            )}
          />

          <Flex flexDir={isLargerThan300 ? "row" : 'column'} justifyContent={"space-between"} zIndex={15} gap={4}>
            <InputGroup width={"auto"} zIndex={12} position={'relative'}>
              <FormControl id="startDate" my={2}>
                <FormLabel textColor={"dark-grey"} my={2}>
                  Start Date
                </FormLabel>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box justifyContent={'flex-end'} alignItems={'center'} display={'flex'}>
                    <SingleDatepicker
                      date={value}
                      onDateChange={(date) => onChange(date)}
                      propsConfigs={{...CalConfig}}
                    />
                      <CalendarIcon color={"dark-grey"}  position={'absolute'} mr={2}/>
                    </Box>
                  )}
                />
                
              </FormControl>
            </InputGroup>
            <InputGroup width={"auto"} zIndex={100}>
              <FormControl id="endDate" my={2}>
                <FormLabel textColor={"dark-grey"} my={2}>
                  End Date
                </FormLabel>

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box justifyContent={'flex-end'} alignItems={'center'} display={'flex'}>
                    <SingleDatepicker
                      date={value}
                      onDateChange={(date) => onChange(date)}
                      propsConfigs={{...CalConfig}}
                    />
                      <CalendarIcon color={"dark-grey"}  position={'absolute'} mr={2}/>
                    </Box>
                  )}
                />

              </FormControl>
            </InputGroup>
          </Flex>
        </Box>

        <FormControl id="link" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
              Provide a link where we can find more information on the work/impact
          </FormLabel>
          <Input
            {...register("link")}
            isInvalid={!!errors.link}
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
        <FormControl id="others" my={2}>
          <FormLabel textColor={"dark-grey"} my={2}>
            Any Other Contributors?
          </FormLabel>
          <Input
            border="1px solid"
            borderColor="dark-grey"
            {...register("others")}
            isInvalid={!!errors.others}
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
};

export default GreenPillForm;
