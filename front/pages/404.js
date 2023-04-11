import React from 'react';
import Head from 'next/head';
export default function Custom404() {
  return (
    <>
      <Head>
        <title>DevPost - Page Not Found</title>
      </Head>
      <h1>죄송합니다 페이지 오류입니다</h1>
      <h4>페이지가 제거되었거나, 존재하지 않는 URL로 접속하셨습니다. </h4>
      <br />
      <h3>다른 방법을 안내해 드릴게요!</h3>
      <br />
      <ul>
        <li>1. URL을 다시 한 번 확인해서 시도해 주세요.</li>
        <li>2. 메인페이지로 다시 돌아가주세요.</li>
      </ul>
      <br />
      <h3>어디서 문제가 발생했는지 알려주시면 감사하겠습니다! </h3>
      <br />
      <p>
        ghwnd6448@gmail.com으로 어디서 문제가 생겼는지 알려주시면, 더욱 빠른
        시일 내에 해결하겠습니다.{' '}
      </p>
      <p>
        사용하시고 계신 브라우저(Chrome, Safari, Internet Explorer)와
        <br />
        운영체제(iOS, Android,Windows)를 알려주시면 더할나위 없이
        감사하겠습니다.
      </p>
      <br />
      <span>post-moa 드림</span>
    </>
  );
}
