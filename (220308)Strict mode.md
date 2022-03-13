# 220308

## 보다 안정적인 자바스크립트 개발 환경을 위한 Strict mode

오타나 문법 지식의 미비로 인한 실수는 언제나 발생한다.

따라서 오류를 줄여 안정적인 코드를 생산하기 위해서 애초에 잠재적인 오류를 발생시키기 어려운 개발 환경을 만드는 것이 근본적인 해결책이다



ES5부터 strict mode가 추가되었다.

ESLint와 같은 기능을 한다.

> 정적 분석 기능을 통해 소스 코드를 실행하기 전에 소스 코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 이유를 리포팅함.
>
> 정적 분석 : 프로그램을 실행시키지 않고 코드 분석을 수행함.



### Strict mode 적용

전역의 선두 또는 함수 몸체의 선두에 ```'use strict';```를 추가한다.

하지만 전역에 strict mode를 적용하는 것은 바람직하지 않다.

strict mode를 적용한 script와 strict mode를 적용하지 않은 script를 혼동할 수 있고, trd-party-library의 경우 none-stroct mode일 경우가 있기 떄문에 전역에 적용하는 것은 바람직하지 않다.

즉시 실행함수로 스크립트 전체를 감싸 스코프를 구분하고 즉시 실행함수 선두에 strict 모드를 작성하는 것이 좋다.

```js
// 즉시실행 함수에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```



#### 함수 단위로 strict mode를 적용하는 것도 피하자

```js
(function () {
  // non-strict mode
    
  var lеt = 10; // 예약어 사용해도 에러가 발생하지 않는다.
    
  function foo() {
      // strict 모드 적용
    'use strict';
      // let이라는 변수가 선언되지 않았기 때문에 strict mode에 걸린다.
      // 하지만 상위 함수에서는 에러없이 let을 선언했기 때문에 참조해야 한다
      // 따라서 코드상의 오류가 있다.
    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```





#### strict mode가 발생시키는 에러

1. 암묵적 전역 변수
2. 변수, 함수, 매개변수의 삭제

	- delete메서드는 삭제하려는 속성이 존재하지 않으면 delete는 원래 아무런 영향을 주지 않으며 true를 반환한다.

3. 매개변수 이름의 중복

   원래의 경우 Syntax Error가 발생한다.

```js
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```



4. With문의 사용

with문을 사용하면  SyntaxError가 발생한다.

> with문은 명령문의 범위 체인을 확장한다.
>
> ES5에선 strict mode에서 금지되어있다.
>
> 그 이유는 with으로 인해 생기는 모호성 때문이다.
>
> ```js
> function doSomething(value, obj) {
>  with (obj) {
>      value = "which scope is this?";
>      console.log(value);
>  }
> }
> ```
>
> 위에서의 value값이 어디에서 나온건지 묻는다면 2가지일 것이다.
>
> 인자인 value 와 obj의 프로퍼티 value
>
> 이것을 분간할수 있는 사람은 개발자 본인뿐이다. 



5. 일반 함수의 this

- strict mode내 일반함수의 호출에 의해 호출된  this는 undefined가 바인딩 된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 

```js
(function () {
  'use strict';
  function foo() {
    console.log(this); // undefined
  }
    //일반함수 선언 후에 호출된 함수
  foo();

  function Foo() {
    console.log(this); // Foo
  }
    //일반 함수 선언 후에 호출된 생성자 함수
  new Foo();
}());
```

