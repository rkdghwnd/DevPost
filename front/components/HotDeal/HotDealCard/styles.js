import styled from 'styled-components';

export const HotDealCardForm = styled.article`
  display: flex;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid rgb(240, 240, 240);
  &:hover {
    background-color: rgb(250, 250, 250);
  }
  img {
    width: 80px;
    height: 80px;
  }
  & > div:last-child {
    margin-left: 10px;
    flex: 1 1 auto;
  }
`;

export const HotDealCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  span {
    color: rgb(170, 170, 170);
    font-size: 14px;
  }
`;

export const Label = styled.div`
  font-size: 12px;
  background-color: skyblue;
  color: white;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5px 0 0;
`;

export const SiteLabel = styled.div`
  font-size: 12px;
  background-color: ${({ siteName, siteColor }) => siteColor[siteName]};
  color: white;
  border-radius: 5px;
  padding: 3px;
  margin: 0 5px 0 0;
`;

export const HotDealTitle = styled.h3`
  margin-top: 10px;
  line-height: 20px;
  font-weight: 400;
  font-size: 15px;
  & > a {
    text-decoration: none;
    color: black;
  }
  & > a:hover {
    color: gray;
    transition: color 0.3s ease;
  }
`;
