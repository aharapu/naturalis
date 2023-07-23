// TODO -> this file could use some refactoring
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { InputVariant } from "./Input.types";

type useInputOptions = {
  saveChanges: (e: ChangeEvent) => Promise<unknown>;
};

// TODO -> have a "queue variant change" function? and a "force variant change" function?
// the latter should clear the queue
// Have an actual queue?

// TODO -> find a better name for saveChanges? asyncChangeHandler?
// it is the function to be called when the input changes, returning a promise
// i.e. saving changes to a db via server request
export function useInputProps({ saveChanges }: useInputOptions) {
  const [value, setValue] = useState<string>("");
  const [variant, setVariant] = useState<InputVariant>(InputVariant.IDLE);
  const [loading, setLoading] = useState<boolean>(false);

  const waitingToSave = useRef<ReturnType<typeof setTimeout>>();
  const waitingToReturnToIdle = useRef<ReturnType<typeof setTimeout>>();
  const isSavingChanges = useRef<boolean>(false);
  const cancelSave = useRef<() => void>();

  // this is used to access the current value of loading inside setTimeout
  // because setTimeout works like a closure
  const loadingRef = useRef<boolean>(loading);
  loadingRef.current = loading;

  const queueVariantChange = useCallback((newVariant: InputVariant) => {
    waitingToReturnToIdle.current = setTimeout(() => {
      setVariant(newVariant);
    }, 3000);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (variant !== InputVariant.DIRTY) {
      setVariant(InputVariant.DIRTY);
    }

    if (loading) setLoading(false);

    if (waitingToReturnToIdle.current) {
      clearTimeout(waitingToReturnToIdle.current);
      waitingToReturnToIdle.current = undefined;
    }

    if (waitingToSave.current) {
      clearTimeout(waitingToSave.current);
      waitingToSave.current = undefined;
    }

    if (isSavingChanges.current) {
      cancelSave.current?.();
    }

    waitingToSave.current = setTimeout(() => {
      waitingToSave.current = undefined;

      if (loadingRef.current === false) setLoading(true);

      const { promise, cancel } = makeCancelable(saveChanges(e));

      isSavingChanges.current = true;
      cancelSave.current = cancel;

      promise
        .then(() => {
          setVariant(InputVariant.SUCCESS);
          isSavingChanges.current = false;
          setLoading(false);
          queueVariantChange(InputVariant.IDLE);
        })
        .catch((e) => {
          if (e.isCanceled) {
            return;
          }
          setVariant(InputVariant.ERROR);
          isSavingChanges.current = false;
          setLoading(false);
        });
    }, 3000);
  };

  return {
    value,
    onChange,
    variant,
    loading,
  };
}

function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled ? reject({ isCanceled: true, val }) : resolve(val)),
      (error) => (hasCanceled ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
