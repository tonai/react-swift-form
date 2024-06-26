# `<Error>`

The `<Error>` component can be used to display a form error (it requires the context to be set).

## Props

`<Submit>` takes the following props:

| Property  | Type           | Default  | Description                                                 |
| --------- | -------------- | -------- | ----------------------------------------------------------- |
| Component | `IElementType` | `'div'`  | The tag element to render the error in                      |
| errorPath | `string`       | `'main'` | The path inside the error object (type `IError`) to display |
| global    | `boolean`      |          | Display only global error                                   |
| ...rest   | `unknown[]`    |          | All props are forwarded to the `<Component>` element        |

## Usage

import SimpleHookErrorComponent from '@site/src/demo/SimpleHookErrorComponent';
import SimpleHookErrorComponentSource from '!!raw-loader!@site/src/demo/SimpleHookErrorComponent';
import SimpleComponentErrorComponent from '@site/src/demo/SimpleComponentErrorComponent';
import SimpleComponentErrorComponentSource from '!!raw-loader!@site/src/demo/SimpleComponentErrorComponent';

<DemoTabs Component={SimpleComponentErrorComponent} Hook={SimpleHookErrorComponent} componentCode={SimpleComponentErrorComponentSource} componentMetastring="{19,22,25,28,31}" hookCode={SimpleHookErrorComponentSource} hookMetastring="{31,34,37,40,43}" withModes withRevalidateModes />
