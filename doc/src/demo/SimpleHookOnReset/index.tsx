import type { FormEvent } from 'react';
import type { IProps } from '../types';
import { type IFormValues, useForm } from '@per-form/react';

export default function Demo(props: IProps) {
  function handleReset(_e: FormEvent<HTMLFormElement>, _values: IFormValues) {
    return { text: 'reset value' };
  }

  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  const { errors, formProps } = useForm({
    ...props,
    onReset: handleReset,
    onSubmit: handleSubmit,
  });

  return (
    <form {...formProps}>
      <input name="text" required />
      {errors.all.text && <div className="error">{errors.all.text}</div>}
      <div className="actions">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
