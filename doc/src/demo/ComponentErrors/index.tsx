import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';
import { type FormEvent, useState } from 'react';
import type { IProps } from '../types';
import { Form, type IFormValues } from '@per-form/react';

const defaultValues = { mui: null };
const validators = {
  mui: (values: IFormValues) => {
    const date = values.mui as Dayjs;
    return date?.date() > 15 ? '' : 'Choose a date after the 15th.';
  },
};

export default function Demo({ useNativeValidation }: IProps) {
  const [value, setValue] = useState<Dayjs | null>(null);

  function handleReset() {
    setValue(null);
  }

  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  return (
    <Form
      defaultValues={defaultValues}
      onChangeOptOut="mui"
      onReset={handleReset}
      onSubmit={handleSubmit}
      useNativeValidation={useNativeValidation}
      validators={validators}
    >
      {({ errors, onChange, onError }) => (
        <>
          <DatePicker
            minDate={dayjs()}
            name="mui"
            onChange={onChange(setValue, { name: 'mui' })}
            onError={onError('mui')}
            slotProps={{ textField: { required: true } }}
            value={value}
          />
          {errors.all.mui && <div className="error">{errors.all.mui}</div>}
          <div className="actions">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </>
      )}
    </Form>
  );
}
