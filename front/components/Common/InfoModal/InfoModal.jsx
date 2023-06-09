import React, { useCallback } from 'react';
import { BsGithub } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { INFO_MODAL_CLOSE_REQUEST } from '../../../reducers/modal';
import { InfoForm, ModalBackdrop } from './styles';

const InfoModal = () => {
  const dispatch = useDispatch();
  const { infoModalSlideUp } = useSelector(state => state.modal);
  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onToggleAppInfo = useCallback(() => {
    dispatch({ type: INFO_MODAL_CLOSE_REQUEST });
  }, []);

  return (
    <ModalBackdrop onClick={onToggleAppInfo}>
      <InfoForm
        onClick={onStopEventBubbling}
        infoModalSlideUp={infoModalSlideUp}
        close={close}
      >
        <h4>Copyright 2023 devpost.site All Right Reserved.</h4>
        <div>
          <a
            href="https://github.com/rkdghwnd/DevPost"
            target="_blank"
            rel="noreferrer noopener"
          >
            GITHUB <BsGithub />
          </a>
        </div>
      </InfoForm>
    </ModalBackdrop>
  );
};

export default InfoModal;
