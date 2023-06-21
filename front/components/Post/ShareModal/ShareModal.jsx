import React, { useCallback } from 'react';
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
import CopyToClipMessage from '../CopyToClipMessage/CopyToClipMessage';
import {
  ModalBackdrop,
  InfoForm,
  URLShareButton,
  KakaoShareButton,
  KakaoIcon,
} from './styles';

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
