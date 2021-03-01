import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

function Inputs({ name, hidden, ...rest }) {
  const inputRef = useRef(null);
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input
        ref={inputRef}
        name={name}
        defaultValue={defaultValue}
        {...rest}
        onFocus={clearError}
        id={`${fieldName}`}
      />

      {error && (
        <div className={hidden ? 'd-none' : 'mt-2'} style={{ color: "#f00", fontSize: "14px" }}>
          {error.replace(/\.indice:(\d*)$/, '')}{" "}
        </div>
      )}
    </div>
  );
}

export default Inputs;
