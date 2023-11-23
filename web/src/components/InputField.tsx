import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React, { type InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  variant?: string;
  isTextArea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  variant,
  isTextArea,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Field
        as={isTextArea ? Textarea : Input}
        id={field.name}
        {...field}
        {...props}
        variant={variant}
      />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
