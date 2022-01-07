import { useState, useEffect } from "react";

function usePersistedState(defaultValue, key) {
  // Return the value of `localStorage` key that corresponds to the argument passed as the `key` parameter and set it to `value` hook. If no value is retrieved, keep whatever was passed as `defaultValue`
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  // Set new `key: value` pair to `localStorage` and update it whenever the state value changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default usePersistedState;
