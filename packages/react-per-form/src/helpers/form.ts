import type {
  IError,
  IFormElement,
  IFormStates,
  IFormValidator,
  IFormValues,
  ILocalFields,
  IMessages,
  IRegisterParams,
  IStates,
  ITransformers,
  IValidator,
  IValidatorObject,
} from '../types';
import type { Dispatch, SetStateAction } from 'react';

import { isValidator, isValidatorObject } from './validator';

export function isFormElement(
  input: Element | EventTarget | RadioNodeList,
): input is IFormElement {
  return (
    input instanceof HTMLInputElement ||
    input instanceof HTMLSelectElement ||
    input instanceof HTMLTextAreaElement ||
    input instanceof RadioNodeList
  );
}

export function getFormInput(
  input: IFormElement,
): Exclude<IFormElement, RadioNodeList> {
  if (input instanceof RadioNodeList) {
    return input[0] as HTMLInputElement;
  }
  return input;
}

const disallowedInputTypes = ['submit', 'reset'];
export function getFormInputs(form: HTMLFormElement): IFormElement[] {
  return [...form.elements].filter(
    (input) =>
      isFormElement(input) &&
      input.name &&
      !disallowedInputTypes.includes(input.type),
  ) as IFormElement[];
}

export function getLocalFields(
  fieldValidators: Set<IRegisterParams>,
): ILocalFields {
  const localFields: Record<string, Dispatch<SetStateAction<IError>>> = {};
  for (const params of fieldValidators.values()) {
    const { setErrors } = params;
    for (const name of params.names) {
      localFields[name] = setErrors;
    }
  }
  return localFields;
}

export function getValidators(
  fieldValidators: Set<IRegisterParams>,
  formValidators?: Record<string, IValidator | IValidatorObject>,
  messages?: IMessages,
): IFormValidator[] {
  const validatorArray: IFormValidator[] = [];

  // Field validators
  for (const params of fieldValidators.values()) {
    const {
      defaultValues,
      onBlurOptOut,
      onChangeOptOut,
      setErrors,
      transformers,
      validators,
      ...validatorParams
    } = params;
    validatorArray.push({ ...validatorParams, setErrors });
    if (isValidator(validators)) {
      validatorArray.push({
        ...validatorParams,
        setErrors,
        validator: validators,
      });
    } else if (isValidatorObject(validators)) {
      const { names: validatorNames, validator } = validators;
      validatorArray.push({
        ...validatorParams,
        names: validatorNames,
        setErrors,
        validator,
      });
    } else if (typeof validators === 'object') {
      for (const [id, value] of Object.entries(validators)) {
        if (isValidator(value)) {
          validatorArray.push({
            ...validatorParams,
            id,
            names: [id],
            setErrors,
            validator: value,
          });
        } else {
          const { names: validatorNames, validator } = value;
          validatorArray.push({
            ...validatorParams,
            id,
            names: validatorNames,
            setErrors,
            validator,
          });
        }
      }
    }
  }

  // Form validators
  if (formValidators) {
    for (const [id, value] of Object.entries(formValidators)) {
      if (isValidator(value)) {
        validatorArray.push({
          id,
          messages,
          names: [id],
          validator: value,
        });
      } else {
        const { names: validatorNames, validator } = value;
        validatorArray.push({
          id,
          messages,
          names: validatorNames,
          validator,
        });
      }
    }
  }

  return validatorArray;
}

export function isEvent(event: unknown): event is Event {
  return Boolean(
    typeof event === 'object' && event !== null && 'target' in event,
  );
}

export function isCheckbox(target: EventTarget): target is HTMLInputElement {
  return Boolean('type' in target && target.type === 'checkbox');
}

export function isFileInput(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): input is HTMLInputElement {
  return input.type === 'file';
}

export function isSelect(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): input is HTMLSelectElement {
  return input.tagName === 'SELECT';
}

const tagNames = ['INPUT', 'SELECT', 'TEXTAREA'];
export function isField(
  target: EventTarget,
): target is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
  return Boolean(
    'tagName' in target && tagNames.includes(target.tagName as string),
  );
}

export function getName(event: unknown): string | null {
  if (isEvent(event) && event.target && isField(event.target)) {
    return event.target.name;
  }
  return null;
}

export function getInputValue(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): unknown {
  if ('multiple' in input && input.multiple) {
    if (input.type === 'email') {
      return String(input.value)
        .split(',')
        .map((v) => v.trim());
    } else if (isFileInput(input) && input.files) {
      return [...input.files];
    } else if (isSelect(input)) {
      return [...input.options]
        .filter((option) => option.selected)
        .map((option) => option.value);
    }
  } else if (isFileInput(input) && input.files) {
    return input.files[0];
  }
  return input.value;
}

export function getValue<V>(
  event: unknown,
  transformer?: (value: unknown) => unknown,
): V {
  let val: unknown = event;
  if (isEvent(event) && event.target) {
    if (isCheckbox(event.target)) {
      val = event.target.checked;
    } else if (isField(event.target)) {
      val = getInputValue(event.target);
    }
  }
  if (transformer) {
    return transformer(val) as V;
  }
  return val as V;
}

export function shouldChange(
  fields: Set<IRegisterParams>,
  name: string | null,
  onChangeOptOut?: string[] | string,
): boolean {
  if (!name || onChangeOptOut === 'all' || onChangeOptOut === name) {
    return false;
  }
  if (onChangeOptOut instanceof Array && onChangeOptOut.includes(name)) {
    return false;
  }
  return ![...fields].some(
    ({ onChangeOptOut }) =>
      onChangeOptOut === name ||
      (onChangeOptOut instanceof Array && onChangeOptOut.includes(name)),
  );
}

export function shouldBlur(
  fields: Set<IRegisterParams>,
  name: string | null,
  onBlurOptOut?: string[] | string,
): boolean {
  if (!name || onBlurOptOut === 'all' || onBlurOptOut === name) {
    return false;
  }
  if (onBlurOptOut instanceof Array && onBlurOptOut.includes(name)) {
    return false;
  }
  return ![...fields].some(
    ({ onBlurOptOut }) =>
      onBlurOptOut === name ||
      (onBlurOptOut instanceof Array && onBlurOptOut.includes(name)),
  );
}

export function getTransformers(
  fields: Set<IRegisterParams>,
  transformers?: ITransformers,
): ITransformers | undefined {
  return [...fields].reduce((acc, { transformers }) => {
    return { ...acc, ...transformers };
  }, transformers);
}

export function getDefaultValues(
  fields: Set<IRegisterParams>,
  defaultValues?: IFormValues,
  paramValues?: IFormValues | null | void,
  resetValues?: IFormValues | null,
): IFormValues {
  const defaultVals = [...fields].reduce((acc, { defaultValues }) => {
    return { ...acc, ...defaultValues };
  }, defaultValues);
  return { ...defaultVals, ...paramValues, ...resetValues };
}

export function getFormStates(
  states: IStates,
  values: IFormValues,
  defaultValues: IFormValues,
  form?: HTMLFormElement | null,
): IFormStates {
  let defaultValueAttributes: Record<string, string | null> = {};
  if (form) {
    defaultValueAttributes = Object.fromEntries(
      getFormInputs(form).map((input) => [
        getFormInput(input).name,
        getFormInput(input).getAttribute('value'),
      ]),
    );
  }
  const changedFields = Array.from(states.changedFields);
  const dirtyFields = changedFields.filter((name) => {
    if (defaultValues[name] !== undefined) {
      return values[name] !== defaultValues[name];
    } else if (defaultValueAttributes[name] != null) {
      return values[name] !== defaultValueAttributes[name];
    }
    return values[name] !== '';
  });
  const touchedFields = Array.from(states.touchedFields);
  return {
    ...states,
    changedFields,
    dirtyFields,
    isChanged: changedFields.length > 0,
    isDirty: dirtyFields.length > 0,
    isPristine: dirtyFields.length === 0,
    isSubmitted: states.submitCount > 0,
    isTouched: touchedFields.length > 0,
    touchedFields,
  };
}

export function getFieldStates(
  states: IFormStates,
  names: string[] | string,
): IFormStates {
  const nameArray = names instanceof Array ? names : [names];
  const changedFields = states.changedFields.filter((name) =>
    nameArray.includes(name),
  );
  const dirtyFields = states.dirtyFields.filter((name) =>
    nameArray.includes(name),
  );
  const touchedFields = states.touchedFields.filter((name) =>
    nameArray.includes(name),
  );
  return {
    ...states,
    changedFields,
    dirtyFields,
    isChanged: changedFields.length > 0,
    isDirty: dirtyFields.length > 0,
    isPristine: dirtyFields.length === 0,
    isSubmitted: states.submitCount > 0,
    isTouched: touchedFields.length > 0,
    touchedFields,
  };
}
