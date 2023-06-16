import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  COPY_TO_CLIP_MESSAGE_VISIBLE,
  SHARE_MODAL_CLOSE_REQUEST,
} from '../../../reducers/modal';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyToClipMessage from './CopyToClipMessage';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoForm = styled.div`
  width: 500px;
  height: 100px;
  font-weight: 700;
  text-align: left;
  border-radius: 5px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > :nth-child(3) {
    position: relative;
  }

  @keyframes shareModalSlideUp {
    from {
      transform: translateY(1000px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes shareModalSlideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(1000px);
    }
  }

  animation-name: ${props =>
    props.shareModalSlideUp ? 'shareModalSlideUp' : 'shareModalSlideDown'};
  animation-duration: 0.3s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
`;

const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  background-color: #7362ff;
`;

const KakaoShareButton = styled.a`
  cursor: pointer;
`;
const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const ShareModal = () => {
  const dispatch = useDispatch();
  const { shareModalSlideUp, copyToclipVisual } = useSelector(
    state => state.modal,
  );
  const currentUrl = window.location.href;
  const onStopEventBubbling = useCallback(e => {
    e.stopPropagation();
  }, []);

  const onToggleAppInfo = useCallback(() => {
    dispatch({ type: SHARE_MODAL_CLOSE_REQUEST });
  }, []);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  const onClickClipButton = useCallback(() => {
    dispatch({ type: COPY_TO_CLIP_MESSAGE_VISIBLE });
  }, []);

  return (
    <ModalBackdrop onClick={onToggleAppInfo}>
      <InfoForm
        onClick={onStopEventBubbling}
        shareModalSlideUp={shareModalSlideUp}
      >
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <div onClick={onClickClipButton}>
          <CopyToClipboard text={currentUrl}>
            <URLShareButton>URL</URLShareButton>
          </CopyToClipboard>
          {copyToclipVisual && <CopyToClipMessage />}
        </div>
        <KakaoShareButton>
          <KakaoIcon
            src={`https://velog.velcdn.com/images/ghwnd6448/post/415bc0db-40ca-4e70-822a-afbdefe0588c/image.webp`}
            onClick={handleKakaoButton}
          ></KakaoIcon>
        </KakaoShareButton>
      </InfoForm>
    </ModalBackdrop>
  );
};

export default ShareModal;
