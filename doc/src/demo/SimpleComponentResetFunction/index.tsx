import type { FormEvent } from 'react';
import type { IProps } from '../types';
import {
  Form,
  type IFormContext,
  type IFormReset,
  type IFormValues,
} from 'react-swift-form';

export default function Demo(props: IProps) {
  function handleSubmit(
    e: FormEvent<HTMLFormElement>,
    values: IFormValues,
    reset: IFormReset,
  ) {
    e.preventDefault();
    reset();
    console.log(values);
  }

  return (
    <Form {...props} onSubmit={handleSubmit}>
      {({ errors }: IFormContext) => (
        <>
          <input name="text" required />
          {errors.all.text && <div className="error">{errors.all.text}</div>}
          <button type="submit">Submit</button>
        </>
      )}
    </Form>
  );
}
