# DevPost

개발 관련 게시글을 모아서 보여주는 서비스 입니다.  
블로그, 뉴스, 자유게시판, 핫딜 목록을 제공합니다.  
자세한 내용은 WIKI에서 확인할 수 있습니다.

<img src="https://user-images.githubusercontent.com/13508988/231684910-ddafde73-178c-4005-9960-5cc6d9051418.gif"  width="500" height="400"/> <img src="https://user-images.githubusercontent.com/13508988/231684920-c31eb7f5-3211-4ee8-a2ee-eb8d36340648.gif"  width="500" height="400"/>

# 링크

https://devpost.site

# 주요 기술스택

프론트엔드

- react.js
- redux
- redux-saga
- next.js
- styled-component

백엔드

- node.js
- express
- sequelize(MYSQL)
- passport.js
- bcrypt
- multer
- puppeteer.js

# Run

<pre><code>// front
package.json의 dependencies 중 react-virtualized 삭제 후 
npm install
npm install react-virtualized --legacy-peer-deps

npm run dev

// back, crawler
npm install

npm run dev
</code></pre>
