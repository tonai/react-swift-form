import type { FormEvent } from 'react';
import type { IProps } from '../types';
import { type IFormValues, useForm } from 'react-swift-form';

export default function Demo(props: IProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>, values: IFormValues) {
    e.preventDefault();
    console.log(values);
  }

  const { errors, formProps } = useForm({
    ...props,
    onSubmit: handleSubmit,
  });

  return (
    <form {...formProps}>
      <input defaultValue="0" name="count" required type="number" />
      {errors.all.count && <div className="error">{errors.all.count}</div>}
      <div className="actions">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}