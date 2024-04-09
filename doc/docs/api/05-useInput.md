# `useInput`

`useInput` is used to declare a local field.

## Parameters

`useInput` take only one parameter that is an object with the following shape:

| Property         | Type                                                                               | Default | Description                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| id               | `string`                                                                           |         | Id associated to the validator (if there is only one validator)                             |
| messages         | `Record<string, string>`                                                           |         | Custom messages (see [messages guide](/docs/guides/messages-and-i18n) for more information) |
| name <Required/> | `string`                                                                           |         | Name of the local field (also used as id if `id` is not provided)                           |
| validators       | `IValidator \| IValidatorObject \| Record<string, IValidator \| IValidatorObject>` |         | Local validators (see [validation guide](/docs/guides/validation) for more information)     |

See [here](/docs/api/types) for the types.

## Returns

`useInput` return an object with the following shape:

| Property | Type               | Description                                                                                                                                                                        |
| -------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error    | `IMainError`       | The main error associated with the field                                                                                                                                           |
| errors   | `IError`           | Field errors (see [errors guide](/docs/guides/errors) for more information)                                                                                                        |
| onChange | `IOnChangeHandler` | Change handler (see [type casting guide](/docs/guides/type-casting-and-default-values) and [controlled components guide](/docs/guides/controlled-components) for more information) |
| onError  | `IOnErrorHandler`  | Manual error handler (see [controlled components guide](/docs/guides/controlled-components#managing-manual-errors) for more information)                                           |
| onReset  | `IOnResetHandler`  | Reset handler (see [reset guide](/docs/guides/submit-and-reset#with-the-onreset-handler) for more information)                                                                     |
| onSubmit | `IOnSubmitHandler` | Submit handler (see [submit guide](/docs/guides/submit-and-reset#using-the-onsubmit-handler) for more information)                                                                 |
| watch    | `IWatch`           | Manual watch function (see [watch guide](/docs/guides/watch) for more information)                                                                                                 |

See [here](/docs/api/types) for the types.

## Usage

import LocalValidationHook from '@site/src/demo/LocalValidationHook';
import LocalValidationHookSource from '!!raw-loader!@site/src/demo/LocalValidationHook';
import LocalValidationComponent from '@site/src/demo/LocalValidationComponent';
import LocalValidationComponentSource from '!!raw-loader!@site/src/demo/LocalValidationComponent';

<DemoTabs Component={LocalValidationComponent} Hook={LocalValidationHook} componentCode={LocalValidationComponentSource} componentMetastring="{9,25,28}" hookCode={LocalValidationHookSource} hookMetastring="{10,31,36}" />