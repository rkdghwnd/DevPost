import React from 'react';
import Custom404 from './404';
import Head from 'next/head';

export default function Custom500() {
  <>
    <Head>
      <title>Postmoa - Page Not Found</title>
    </Head>
    <Custom404 />;
  </>;
  return;
}
