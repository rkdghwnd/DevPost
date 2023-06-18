import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../../reducers/post';
import { LoadingOutlined } from '@ant-design/icons';
import {
  UploadImageWrapper,
  AddImageButton,
  UploadedImages,
  Spinner,
  UploadedImage,
  RemoveIcon,
} from './styles';

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
                  src={`${process.env.NEXT_PUBLIC_FRONT_END_DOMAIN}/images/close-button.png`}
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
