import React, { useRef, useEffect } from "react";
import ReactSelect from "react-select";
import { useField } from "@unform/core";

const Select = ({ name, options, placeholder, ...rest }) => {
  const selectRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value",
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return "";
          }
          return ref.state.value.value;
        }
      },
      setValue(ref, value) {
        const valor = ref.props.options.find(
          (option) => option.value === value
        );
        ref.onChange(valor);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <div>
      <ReactSelect
        onFocus={clearError}
        placeholder={placeholder || 'Selecione'}
        defaultValue={
          defaultValue &&
          options.find((option) => option.value === defaultValue)
        }
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
      {error && (
        <div className="mt-2" style={{ color: "#f00", fontSize: "14px" }}>
          {error}{" "}
        </div>
      )}
    </div>
  );
};
export default Select;
