import type { FormEvent } from 'react';
import type { IProps } from '../types';
import { type IFormValues, useForm } from 'react-swift-form';

export default function Demo(props: IProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>, values: IFormValues) {
    e.preventDefault();
    console.log(values);
  }

  const { errors, formProps, onChange } = useForm({
    ...props,
    onSubmit: handleSubmit,
  });

  return (
    <form {...formProps}>
      <input
        name="count"
        onChange={onChange({ transformer: Number })}
        required
        type="number"
      />
      {errors.all.count && <div className="error">{errors.all.count}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}
