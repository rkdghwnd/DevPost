import { Spin } from 'antd';
import { BsFillImageFill } from 'react-icons/bs';
import styled from 'styled-components';

export const UploadImageWrapper = styled.div`
  border-top: 1px solid rgb(235, 235, 235);
  font-size: 20px;
  height: 100px;
  padding: 10px;
`;

export const UploadedImages = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
`;

export const UploadedImage = styled.div`
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

export const RemoveIcon = styled.div`
  position: absolute;
  right: 0;
  top: -10px;
  & > img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const AddImageButton = styled(BsFillImageFill)`
  cursor: pointer;
`;

export const Spinner = styled(Spin)`
  font-size: 20px;
`;
