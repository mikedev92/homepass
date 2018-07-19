// @flow
import React from 'react';
import AddressAutocomplete from '../AddressAutocomplete';

type Props = {
  input: {
    value: string,
    onChange: string => void,
  },
  placeholder: ?string,
};

export default function WrappedInput({ input: { value, onChange }, ...rest }: Props) {
  return (
    <AddressAutocomplete
      value={value}
      onSelectAddress={onChange}
      {...rest}
    />
  );
}

