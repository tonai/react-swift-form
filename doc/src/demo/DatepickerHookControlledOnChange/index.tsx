import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { type Dayjs } from 'dayjs';
import { type FormEvent, useState } from 'react';
import type { IProps } from '../types';
import { type IFormValues, useForm } from '@per-form/react';

export default function Demo(props: IProps) {
  const [value, setValue] = useState<Dayjs | null>(null);

  function handleReset() {
    setValue(null);
  }

  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  function getError(_value: Dayjs, error: { validationError: string | null }) {
    return error.validationError;
  }

  const { errors, formProps, onChange } = useForm({
    ...props,
    onReset: handleReset,
    onSubmit: handleSubmit,
  });

  return (
    <form {...formProps}>
      <DatePicker
        minDate={dayjs()}
        name="mui"
        onChange={onChange<Dayjs, [{ validationError: string | null }]>(
          setValue,
          { getError, name: 'mui' },
        )}
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
