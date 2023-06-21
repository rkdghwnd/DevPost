import React, { useCallback } from 'react';
import useInput from '../../../../hooks/input';
import { useDispatch } from 'react-redux';
import { VERIFY_PASSWORD_REQUEST } from '../../../../reducers/user';
import { ModalBackdrop, InfoForm } from './styles';

const VerifyPasswordModal = () => {
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput('');
  const onVerifyPassword = useCallback(() => {
    dispatch({ type: VERIFY_PASSWORD_REQUEST, data: { password } });
  }, [password]);

  return (
    <ModalBackdrop>
      <InfoForm>
        <h4>비밀번호를 입력해주세요</h4>
        <input type="password" value={password} onChange={onChangePassword} />
        <button onClick={onVerifyPassword}>확인</button>
      </InfoForm>
    </ModalBackdrop>
  );
};

export default VerifyPasswordModal;
