import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

type Props = {
  label: string;
  type: any;
  id: string;
  name: string;
  placeholder?: string;
  value: any;
  onChange: any;
  errors: any;
};

interface IError {
  msg: string;
  param: string;
}

const FormInput = ({
  label,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  errors,
}: Props) => {
  const errorExists = (param: string): IError => {
    const errorObj: any = errors?.find((e: any) => e.param === param);
    return errorObj;
  };

  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder ?? ''}
        value={value}
        onChange={onChange}
        invalid={errorExists(name) ? true : false}
      />

      {errorExists(name) ? (
        <FormFeedback>{errorExists(name).msg}</FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default FormInput;
