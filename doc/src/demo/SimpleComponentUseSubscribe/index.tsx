import { type FormEvent, useState } from 'react';
import type { IProps } from '../types';
import {
  Form,
  type IFormContext,
  type IFormValues,
  useSubscribe,
} from '@per-form/react';

function Submit() {
  const [isValid, setIsValid] = useState(false);
  useSubscribe(({ isValid }) => setIsValid(isValid));

  return (
    <button disabled={!isValid} type="submit">
      Submit
    </button>
  );
}

export default function Demo(props: IProps) {
  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  return (
    <Form {...props} onSubmit={handleSubmit}>
      {({ errors }: IFormContext) => (
        <>
          <input name="text" required />
          {errors.all.text && <div className="error">{errors.all.text}</div>}
          <Submit />
        </>
      )}
    </Form>
  );
}
