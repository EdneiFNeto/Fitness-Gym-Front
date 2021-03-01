import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

const CheckboxInput = ({ name, options, permissoes = [], ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [], error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.id);
      },
      clearValue: (refs) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values.includes(parseInt(ref.id))) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={permissoes.find((el) => el === option.id)}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}

          {error && (
            <div className="mt-2" style={{ color: "#f00", fontSize: "14px" }}>
              {error}{" "}
            </div>
          )}
        </label>
      ))}
    </div>
  );
};

export default CheckboxInput;
