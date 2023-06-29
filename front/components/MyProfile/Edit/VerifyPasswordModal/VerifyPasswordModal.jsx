import React, { useCallback, useEffect } from 'react';
import useInput from '../../../../hooks/input';
import { useDispatch, useSelector } from 'react-redux';
import { VERIFY_PASSWORD_REQUEST } from '../../../../reducers/user';
import { ModalBackdrop, InfoForm } from './styles';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { VERIFY_PASSWORD_MODAL_CLOSE } from '../../../../reducers/modal';
import { useRouter } from 'next/router';
import { SUCCEEDED } from '../../../../reducers';

const CloseButton = styled(AiOutlineClose)`
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  top: 12px;
  left: 10px;
`;

const VerifyPasswordModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, onChangePassword] = useInput('');
  const { removeAccountStatus } = useSelector(state => state.user);
  const onVerifyPassword = useCallback(() => {
    dispatch({ type: VERIFY_PASSWORD_REQUEST, data: { password } });
  }, [password]);

  const onCloseVerifyModal = useCallback(() => {
    dispatch({ type: VERIFY_PASSWORD_MODAL_CLOSE });
  }, []);

  useEffect(() => {
    if (removeAccountStatus === SUCCEEDED) {
      router.replace(process.env.NEXT_PUBLIC_FRONT_END_DOMAIN);
    }
  }, [removeAccountStatus, router]);

  return (
    <ModalBackdrop>
      <InfoForm>
        <CloseButton onClick={onCloseVerifyModal} />
        <h4>비밀번호를 입력해주세요</h4>
        <input type="password" value={password} onChange={onChangePassword} />
        <button onClick={onVerifyPassword}>확인</button>
      </InfoForm>
    </ModalBackdrop>
  );
};

export default VerifyPasswordModal;
