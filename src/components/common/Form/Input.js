// @flow
import React from 'react';
import { Input } from 'native-base';

type Props = {
  input: {
    value: string,
    onChange: string => void,
  },
  placeholder: ?string,
};

export default function WrappedInput({ input: { value, onChange }, ...rest }: Props) {
  return (
    <Input
      {...rest}
      onChangeText={v => onChange(v)}
      value={value}
    />
  );
}
