import { MetaDataType } from "../types";
import {
  singletonFunctionRegisrationFactory,
  AttachMethodArrayType,
  attachMethodsToMetaData as _attachMethodsToMetaData,
} from "components/utils";

const optionsMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for options at ${fieldKey}`);
  return [{ label: "Oops error occured", value: "" }];
};
const validateMethodNotFound = (fieldKey) => () => {
  console.log(`no method found for validation at ${fieldKey}`);
  return "";
};
const postValidationSetCrossFieldValuesMethodNotFound = (fieldKey) => () => {
  console.log(
    `no method for postValidationSetCrossFieldValues found at ${fieldKey}`
  );
  return undefined;
};
const isReadOnlyMethodNotFound = (fieldKey) => () => {
  console.log(`no method for isReadOnly found at ${fieldKey}`);
  return false;
};
const shouldExcludeNotFound = (fieldKey) => () => {
  console.log(`no method for shouldExclude found at ${fieldKey}`);
  return false;
};
const inputMaskPrepareNotFound = (fieldKey) => (value) => {
  console.log(`no method for inputMaskPrepare found at ${fieldKey}`);
  return value;
};
const removeRowFnNotFound = (fieldKey) => (value) => {
  console.log(`no method for removeRowFn found at ${fieldKey}`);
  throw new Error("method not implemeneted");
};
const setValueOnDependentFieldsChangeNotFound = (fieldKey) => (value) => {
  console.log(`no method for removeRowFn found at ${fieldKey}`);
  return "";
};
const getFixedRowsCount = (fieldKey) => (value) => {
  console.log(`no method for getFixedRowsCount found at ${fieldKey}`);
  return 0;
};
const setColorMethodNotFound = (fieldKey) => () => {
  console.log(`no method for setColorMethodNotFound found at ${fieldKey}`);
  return "";
};
const searchComponentNotFound = (fieldKey) => () => {
  console.log(`no method for searchComponentNotFound found at ${fieldKey}`);
  return "Component not found";
};
const transformNotFound = (key) => (fieldKey) => (value) => {
  console.log(`no method found for ${key} Transform at ${fieldKey}`);
  return value;
};

export const defaultFieldsToAttachMethods: AttachMethodArrayType[] = [
  [/^fields.*.options$/, optionsMethodNotFound],
  [/^fields.*.setColor$/, setColorMethodNotFound],
  [/^fields.*.leftOptions$/, optionsMethodNotFound],
  [/^fields.*.rightOptions$/, optionsMethodNotFound],
  [/^fields.*.validate$/, validateMethodNotFound],
  [
    /^fields.*.postValidationSetCrossFieldValues$/,
    postValidationSetCrossFieldValuesMethodNotFound,
  ],
  [/^fields.*.isReadOnly$/, isReadOnlyMethodNotFound],
  [/^fields.*.shouldExclude$/, shouldExcludeNotFound],
  [/^fields.*.MaskProps.prepare$/, inputMaskPrepareNotFound],
  [/^fields.*.removeRowFn$/, removeRowFnNotFound],
  [
    /^fields.*.setValueOnDependentFieldsChange$/,
    setValueOnDependentFieldsChangeNotFound,
  ],
  [/^fields.*.getFixedRowsCount$/, getFixedRowsCount],
  [/^fields.*.searchComponent$/, searchComponentNotFound],

  [/^fields.*.leftTransform$/, transformNotFound("left")],
  [/^fields.*.rightTransform$/, transformNotFound("right")],
  [/^fields.*.dataTransformer$/, undefined],
  [/^fields.*.rowValidator$/, undefined],
];

//do not walk for arrayFields _fields as well we will run it seperately
const skipWalkingForKeys = [
  "validate",
  "isReadOnly",
  "shouldExclude",
  "setColor",
  "_fields",
  "_columns",
];

//we will attach default function for each field Key type if we cannot the required function
//array index
//0-the path to set function at
//1-the strign value that will be used as key to find mapped function from functions registry
//2-is the key name
//3-default function for that key - it can be undefined it its not declared
export const attachMethodsToMetaData = (metaData: MetaDataType) => {
  return _attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory,
    defaultFieldsToAttachMethods,
    skipWalkingForKeys
  );
};
