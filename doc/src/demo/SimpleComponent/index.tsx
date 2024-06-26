import type { FormEvent } from 'react';
import { Form, type IFormValues } from '@per-form/react';

export default function Demo() {
  function handleSubmit(_e: FormEvent<HTMLFormElement>, values: IFormValues) {
    console.log(values);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input name="text" required />
      <button type="submit">Submit</button>
    </Form>
  );
}
