1. pages
create-next-app으로 프로젝트를 초기화하면 자동으로 폴더 구조가 생성된다. (gatsby와 비슷한 느낌?!)

최상위 아래에 pages라는 폴더가 있는데, 이는 라우터의 기능을 한다. 

pages 하위에 파일을 생성하면 파일명이 url 주소가 된다. (컴포넌트명은 중요하지 않음)
index.js는 홈으로 설정되어 있다. (ex. localhost:3000/ )
export default를 통해 컴포넌트를 내보내야한다.
+ JSX 사용할 때 import react를 할 필요가 없다.

+ pages/404.js 파일은 404페이지 템플릿이다.

 

2. Navigate
네비게이트할 때 Link를 사용해야 한다. (<a> 사용X)

 

components/NavBar.js

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </nav>
  );
}
 

<a> 태그 없이 아래처럼 작성해도 된다. 하지만, Link는 Next.js에서 이미 만들어 둔 것으로, 스타일을 추가하거나 클래스이름을 넣는 등 내 마음대로 컨트롤 할 수 없다. 따라서 커스텀을 위해 위 코드처럼 <a> 태그를 넣어 작성한 것이다. 

import Link from 'next/link';
<Link href='/'>Home</Link>
 

 

3. Router
next에서는 router hook인 useRouter을 제공한다.

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </nav>
  );
}
 

router를 출력하면 라우팅과 관련한 속성을 가진 객체를 확인할 수 있다.


 

 

4. Style 방식
1) 태그에 style 속성 넣기
간단하지만 보기 좋지 않다.

...
      <Link href='/'>
        <a style={{ color : router.pathname === '/' ? "red" : "blue"}}>
          Home
        </a>
      </Link>
      <Link href='/about'>
        <a style={{ color : router.pathname === '/about' ? "red" : "blue"}}>
          About
        </a>
      </Link>
...
 

2) module 이용하기
NavBar.module.css처럼 파일을 생성한다.
클래스명을 추가할 때 택스트로 적는 것이 아니라, 자바스크립트의 객체에서 속성을 불러오는 형식으로 적는다.
실제 html 코드에서 클래스명이 무작위 텍스트로 설정되기 때문에 충돌의 가능성을 제거한다는 장점이 있다.
컴포넌트별로 각각 .module.css파일을 갖기 때문에 컴포넌트 별로 동일한 클래스 이름을 사용할 수 있다.
그치만 여전히 클래스명을 기억해야 한다는 귀찮음이 있다.
NavBar.module.css

.link {
  text-decoration: none;
}

.active {
  color: tomato;
}
 

NavBar.js

import styles from './NavBar.module.css';

...
      <Link href='/'>
        <a className={router.pathname === '/' && styles.active}>
          Home
        </a>
      </Link>
      <Link href='/about'>
        <a
          className={router.pathname === '/about' && styles.active}
        >
          About
        </a>
      </Link>
...
 

여러 개의 클래스를 적용할 때는 문자열로 적용시켜야 한다.

import styles from './NavBar.module.css';
...
방법1)
      <Link href='/'>
        <a
          className={`${styles.link} ${
            router.pathname === '/' && styles.active
          }`}
        >
          Home
        </a>
      </Link>
      
방법2)
      <Link href='/about'>
        <a
          className={[
            styles.link,
            router.pathname === '/about' && styles.active,
          ].join(' ')}
        >
          About
        </a>
      </Link>
 ...
 

3) styled jsx
Nextjs의 고유한 방법이다.
파일별로 각각 독립적으로 동작한다.
module과 마찬가지로 클래스명이 무작위 텍스트로 설정되기 때문에 충돌의 가능성이 없다.
파일을 import할 필요가 없다.
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href='/'>
        <a className={router.pathname === '/' && 'active'}>Home</a>
      </Link>
      <Link href='/about'>
        <a className={router.pathname === '/about' && 'active'}>About</a>
      </Link>
      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}
 

 

5. Custom App Component
NextJS에는 모든 페이지를 렌더링할 수 있도록 해주는 기본 컴포넌트가 존재한다.

일종의 레이아웃 혹은 템플릿과 같은 존재로, NextJS가 모든 페이지의 렌더링에 앞서 살펴보는 파일이다.

 

pages/_app.js

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />);
}
 

이름은 반드시 _app.js여야 한다. 
Component에 렌더링하기 원하는 페이지가 들어가고, 이를 리턴한다.
모든 페이지에 들어가야 하는 컴포넌트를 넣거나, 글로벌스타일을 지정하면 된다.
이 페이지에서만 일반적인 css 파일을 import할 수 있다. (다른 페이지나 컴포넌트 내에서 css를 import 하기 위해서는 반드시 module이어야 한다.)
import NavBar from '../components/NavBar';
import '../styles/globals.css'; //여기서만 가능

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx gloabal>{`
        a {
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
 

cf) styled jsx global

styled jsx로 글로벌 스타일을 지정할 때 lobal 속성을 써주면 된다. 단, _app.js 파일이 아닌 다른 페이지나 컴포넌트에서 사용하는 경우, 글로벌의 의미가 부모-자식 간의 관계에서만 성립한다. 다른 페이지에서는 글로벌 스타일이 적용되지 않는다는 뜻이다. 
