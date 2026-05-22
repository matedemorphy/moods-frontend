
import { useEffect } from "react";

export function useResetStoreOnUnmount(reset) {
  useEffect(() => {
    return () => reset();
  }, [reset]);
}