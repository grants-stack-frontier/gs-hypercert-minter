import {
  Box,
  Button,
  Center,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon} from '@chakra-ui/icons';
import theme from '../utils/theme';
import * as GreenPillLogo from "../../public/svgPatterns/pattern-7.svg";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  tags: z.string().min(1, { message: "Required" }),
  link: z.string().url({ message: "Invalid URL" }),
  description: z.string().min(1, { message: "Required" }),
  others: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});


const GreenPillForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Box>

    <Center  h="full" w="100vw" color={"dark-grey"}>
      
      <VStack  w={'600px'}>
      
        <form
        
          onSubmit={(d) => console.log(d)}
          onKeyUpCapture={(e) => {
            e.preventDefault();
            const values = getValues();
            console.log(values);
          }}
          className="w-full"
        >
          <FormControl id="name" my={4}>
            <FormLabel textColor={"dark-grey"}>Name of your Chapter</FormLabel>
            <Input
              {...register("name")}
              isInvalid={errors.name ? true : false}
              required={true}
              autoFocus
              mb={4}
            
              placeholder=""
            />
          </FormControl>

          <FormControl id="tags" my={4}>
            <FormLabel>Tags for Scope of Work</FormLabel>
            <Input
              {...register("tags")}
              required={true}
              isInvalid={errors.tags ? true : false}
              placeholder="Social Impact, Public Health, Education, etc."
            />
          </FormControl>
          <Flex flexDir={"row"} justifyContent={"space-between"}>
          <InputGroup width={"auto"} zIndex={25} >
          <FormControl id="startDate" zIndex={20} my={4} >
            <FormLabel>Start Date</FormLabel>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SingleDatepicker
                  date={value}
                  onDateChange={(date) => onChange(date)}
                />
              )}
            />
            <InputRightElement pointerEvents={"none"} marginTop={"32px"}>
              <CalendarIcon />
            </InputRightElement>
          </FormControl>
          </InputGroup>
          <InputGroup width={"auto"} zIndex={20}>
          <FormControl  id="endDate" zIndex={20} my={4}>

            <FormLabel>End Date</FormLabel>
             
            <Controller
              name="endDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SingleDatepicker
                
                  date={value}
                  onDateChange={(date) => onChange(date)}
                />
              )}
            />
            <InputRightElement pointerEvents={"none"} marginTop={"32px"}>
              <CalendarIcon />
            </InputRightElement>
          </FormControl>
          </InputGroup>
          </Flex>
          <FormControl id="link" my={4}>
            <FormLabel>Link where we can find info about work</FormLabel>
            <Input
              {...register("link")}
              isInvalid={errors.link ? true : false}
              required={true}
              autoFocus
              mb={4}
            
              placeholder="https://..."
            />
          </FormControl>
          <FormControl id="description" my={4}>
            <FormLabel>Description of the Work</FormLabel>
            <Textarea
                      border="1px solid"
                      borderColor="dark-grey"
              {...register("description")}
              isInvalid={errors.description ? true : false}
              rows={6}
              placeholder="Social Impact, Public Health, Education, etc."
            />
          </FormControl>
          <FormControl id="others" my={4}>
            <FormLabel>Any Other Contributors?</FormLabel>
            <Input
                      border="1px solid"
                      borderColor="dark-grey"
              {...register("others")}
              isInvalid={errors.others ? true : false}

              placeholder=""
            />
            <Text color="default-grey" fontSize={"xs"} >(You can add names, address of contributors that consent to be registered publicly.)</Text>
          </FormControl>
      
          <Center>
          <Button type="submit" variant={"secondary"} w={'full'} my={8} width={"120px"} >
            Next
          </Button>
          </Center>
        </form>
      </VStack>
    </Center>
    </Box>
  );
};

export default GreenPillForm;
