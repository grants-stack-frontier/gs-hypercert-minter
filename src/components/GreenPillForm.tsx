import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import theme from '../utils/theme';

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
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Center h="full" w="100vw" >
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
            <FormLabel>Name of your Chapter</FormLabel>
            <Input
              {...register("name")}
              isInvalid={errors.name ? true : false}
              autoFocus
              mb={4}
            
              placeholder=""
            />
          </FormControl>
          <FormControl id="tags" my={4}>
            <FormLabel>Tags for Scope of Work</FormLabel>
            <Input
              {...register("tags")}
              isInvalid={errors.tags ? true : false}
              placeholder="Social Impact, Public Health, Education, etc."
            />
          </FormControl>
          <FormControl id="link" my={4}>
            <FormLabel>Link where we can find info about work</FormLabel>
            <Input
              {...register("link")}
              isInvalid={errors.link ? true : false}
              autoFocus
              mb={4}
            
              placeholder=""
            />
          </FormControl>
          <FormControl id="description" my={4}>
            <FormLabel>Description of the Work</FormLabel>
            <Textarea
              {...register("description")}
              isInvalid={errors.description ? true : false}
              rows={6}
              placeholder="Social Impact, Public Health, Education, etc."
            />
          </FormControl>
          <FormControl id="others" my={4}>
            <FormLabel>Any Other Contributors?</FormLabel>
            <Textarea
              {...register("others")}
              isInvalid={errors.others ? true : false}
              rows={6}
              placeholder="You can add names, address of contributors that consent to be registered publicly."
            />
          </FormControl>

          <FormControl id="startDate" zIndex={20} my={4}>
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
          </FormControl>
          <FormControl id="endDate" zIndex={20} my={4}>
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
          </FormControl>

          <Button type="submit" variant={"primary"} w={'full'} my={8}>
            Submit
          </Button>
        </form>
      </VStack>
    </Center>
  );
};

export default GreenPillForm;
