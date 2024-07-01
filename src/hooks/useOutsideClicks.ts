import { useRef, useEffect } from "react";

export const useOutsideClicks = (handler, listenCapturing = true) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, { capture: listenCapturing });

    return () => document.removeEventListener("click", handleClick, { capture: listenCapturing });
  }, [handler]);

  return ref;
};