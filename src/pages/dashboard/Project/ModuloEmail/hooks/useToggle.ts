import { useState, useCallback } from 'react';

const useToggle = (initialValue = false) => {
  const [isModalOpen, setValue] = useState(initialValue);

  const toggleComposeModal = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [isModalOpen, toggleComposeModal];
};

export default useToggle;
