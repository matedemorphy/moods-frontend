import { useState, useCallback } from "react";

export function useToggle(initValue = false) {
  const [value, setValue] = useState(initValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse];
}
