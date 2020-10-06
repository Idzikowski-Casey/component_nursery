import * as React from "react";
import h from "@macrostrat/hyper";
import {
  Dialog,
  Button,
  Card,
  FormGroup,
  InputGroup,
  NumericInput,
} from "@blueprintjs/core";

/** Form component that includes the FormGroup, InputGroup/NumericInput
 * Should have intent changes based on a set min and max value
 *
 * Form Vailidation for text based inputs?
 */

interface MyInput {
  helperText?: string;
  placeholder?: string;
  label?: string;
  onChange: any;
  value: any;
  rightElement?: any;
  leftIcon?: any;
}
export function MyTextInput(props: MyInput) {
  return h("div", [
    h(FormGroup, { helperText: props.helperText, label: props.label }),
    [
      h(InputGroup, {
        id: props.label + "-input",
        placeholder: props.placeholder,
        value: props.value,
        onChange: props.onChange,
        intent: "primary",
        leftIcon: props.leftIcon,
        rightElement: props.rightElement,
      }),
    ],
  ]);
}

interface MyInputNum {
  min: number;
  max: number;
  labelInfo?: string;
  placeholder?: string;
  label?: string;
  onChange: any;
  value: number;
  rightElement?: any;
  leftIcon?: any;
  id?: string;
  labelFor?: string;
}

/** Numeric Input that has intent validation
 * min: number;
 * max: number;
 * helperText?: string;
 * placeholder?: string;
 * label?: string;
 * onChange: any;
 * value: number;
 * rightElement?: any;
 * leftIcon?: any;
 * id?: string;
 */
export function MyNumericInput(props: MyInputNum) {
  const intent =
    props.value < props.min || props.value > props.max ? "Danger" : "Primary";
  return h("div", [
    h(FormGroup, {
      labelInfo: props.labelInfo,
      label: props.label,
      labelFor: props.labelFor,
    }),
    [
      h(NumericInput, {
        id: props.id,
        placeholder: props.placeholder,
        value: props.value,
        onValueChange: props.onChange,
        intent,
        leftIcon: props.leftIcon,
        rightElement: props.rightElement,
      }),
    ],
  ]);
}
