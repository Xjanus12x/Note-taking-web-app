import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  
  return debouncedValue;
}
