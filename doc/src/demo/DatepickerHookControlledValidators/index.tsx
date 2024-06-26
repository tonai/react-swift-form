import { DatePicker } from '@mui/x-date-pickers';
import { type Dayjs } from 'dayjs';
import { type FormEvent, useState } from 'react';
import type { IProps } from '../types';
import { type IFormValues, useForm } from '@per-form/react';

const defaultValues = { mui: null };
const validators = {
  mui: (values: IFormValues) => {
    const date = values.mui as Dayjs;
    return date?.date() > 15 ? '' : 'Choose a date after the 15th.';
  },
};

export default function Demo(props: IProps) {
  const [value, setValue] = useState<Dayjs | null>(null);

  function handleReset() {
    setValue(null);
  }

  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  const { errors, formProps, onChange } = useForm({
    ...props,
    defaultValues,
    onChangeOptOut: 'mui',
    onReset: handleReset,
    onSubmit: handleSubmit,
    validators,
  });

  return (
    <form {...formProps}>
      <DatePicker
        name="mui"
        onChange={onChange(setValue, { name: 'mui' })}
        slotProps={{ textField: { required: true } }}
        value={value}
      />
      {errors.all.mui && <div className="error">{errors.all.mui}</div>}
      <div className="actions">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
