import { useCallback, useState } from 'react';

export const useNicknameValidate = (initialValue = false) => {
  const [nicknameValidateError, setNicknameValidateError] =
    useState(initialValue);
  const isNicknameValidate = useCallback(nickname => {
    if (nickname.length >= 2) {
      setNicknameValidateError(() => false);
      return true;
    } else {
      setNicknameValidateError(() => true);
      return false;
    }
  }, []);

  return [nicknameValidateError, isNicknameValidate, setNicknameValidateError];
};

export const usePasswordValidate = (initialValue = false) => {
  const [passwordValidateError, setPasswordValidateError] =
    useState(initialValue);
  const isPasswordValidate = useCallback(password => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password,
      )
    ) {
      setPasswordValidateError(() => false);
      return true;
    } else {
      setPasswordValidateError(() => true);
      return false;
    }
  }, []);

  return [passwordValidateError, isPasswordValidate, setPasswordValidateError];
};

export const useOnChange = (initialValue, validateFunction, parameter) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    e => {
      setValue(e.currentTarget.value);
      if (!parameter) {
        validateFunction(e.currentTarget.value);
      } else {
        validateFunction(e.currentTarget.value !== parameter);
      }
    },
    [parameter],
  );

  return [value, onChange, setValue];
};
