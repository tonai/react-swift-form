import type { FormEvent } from 'react';
import type { IFormValues } from 'react-swift-form';

export function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  values: IFormValues,
): void {
  event.preventDefault();
  console.log('Submit!', values);
}
