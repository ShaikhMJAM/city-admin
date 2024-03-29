import { getIn, setIn, InitialValuesType } from "packages/form";
import { FieldMetaDataType } from "../types";

export const constructInitialValue = (
  fields: FieldMetaDataType[],
  initialValues?: InitialValuesType
) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  let initialValuesObj = {};
  // console.log(">>constructInitialValue ", initialValues);
  for (const field of fields) {
    const { defaultValue, name } = field;
    const value = getIn(initialValues, name, undefined);
    // console.log(">>Value ", value, field, defaultValue);
    if (typeof value === "boolean" || Boolean(value)) {
      initialValuesObj = setIn(initialValuesObj, name, value);
    } else if (Boolean(defaultValue)) {
      const defaultVal =
        field.render.componentType === "datetimePicker"
          ? new Date()
          : defaultValue;
      initialValuesObj = setIn(initialValuesObj, name, defaultVal);
    }
  }
  return initialValuesObj;
};

export const constructInitialValuesForArrayFields = (
  fields: FieldMetaDataType[]
) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  const initialValuesObj = {};
  for (const field of fields) {
    //@ts-ignore
    const { name, _fields } = field;
    if (Array.isArray(_fields)) {
      let result = constructInitialValue2(_fields);
      initialValuesObj[name] = result;
    }
  }
  return initialValuesObj;
};

const constructInitialValue2 = (fields: FieldMetaDataType[]) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  let initialValuesObj = {};
  for (const field of fields) {
    //@ts-ignore
    const { defaultValue, name, _fields } = field;
    if (Array.isArray(_fields)) {
      let result = constructInitialValue2(_fields);
      initialValuesObj = setIn(initialValuesObj, name, result);
    }
    if (Boolean(defaultValue)) {
      initialValuesObj = setIn(initialValuesObj, name, defaultValue);
    }
  }
  return initialValuesObj;
};
