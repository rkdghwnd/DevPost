import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../../reducers/post';
import { BsFillImageFill } from 'react-icons/bs';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const UploadImageWrapper = styled.div`
  border-top: 1px solid rgb(235, 235, 235);
  font-size: 20px;
  height: 100px;
  padding: 10px;
`;

const UploadedImages = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
`;

const UploadedImage = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-top: 5px;
  margin-left: 5px;
  & > img {
    width: 50px;
    height: 50px;
  }
`;

const RemoveIcon = styled.div`
  position: absolute;
  right: 0;
  top: -10px;
  & > img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const AddImageButton = styled(BsFillImageFill)`
  cursor: pointer;
`;

const Spinner = styled(Spin)`
  font-size: 20px;
`;

const UploadImageForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, uploadImagesLoading } = useSelector(state => state.post);
  const onAddImage = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);

  const onChangeUploadImage = useCallback(e => {
    const imageFormData = new FormData(); // FormData 형식 객체 생성
    [].forEach.call(e.currentTarget.files, f => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    [],
  );

  return (
    <UploadImageWrapper>
      <AddImageButton onClick={onAddImage} />
      <input
        type="file"
        name="image"
        multiple
        hidden
        ref={imageInput}
        onChange={onChangeUploadImage}
      />
      <UploadedImages>
        {uploadImagesLoading ? (
          <Spinner indicator={<LoadingOutlined />} />
        ) : (
          imagePaths.map((v, i) => (
            <UploadedImage key={v}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACK_END_DOMAIN}/${v}`}
                alt={v}
              />
              <RemoveIcon>
                <img
                  src="https://velog.velcdn.com/images/ghwnd6448/post/ca7b581b-f1d4-4821-8806-6bcc2c7893da/image.png"
                  onClick={onRemoveImage(i)}
                />
              </RemoveIcon>
            </UploadedImage>
          ))
        )}
      </UploadedImages>
    </UploadImageWrapper>
  );
};

export default UploadImageForm;
