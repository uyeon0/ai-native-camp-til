window.WORKBOOK = {
  title: "3장 제어문",
  kicker: "점프 투 파이썬 스터디 · 2회차",
  chapter: "03장",
  range: "ch03",   // 결과 파일 이름에 쓰인다 (jump-to-python-02-ch03.html)

  units: [
    {
      id: "3-1",
      title: "3-1 if 문",
      html: `
<h3>들여쓰기와 콜론</h3>
<p>파이썬에서는 콜론(<code>:</code>) 다음 줄부터가 하위 블록이다. <mark>블록에 들어가는 문장은 모두 같은 깊이로 들여써야 한다.</mark> 들여쓰기가 곧 "이 문장은 이 블록 안에 있다"는 표시다.</p>
<pre class="code"><code>hungry = True
if hungry:
    print("밥")
    print("먹으러")
    print("가자")
# 밥
# 먹으러
# 가자</code></pre>
<p>들여쓰기는 탭으로 해도 되고 공백으로 해도 되지만, 한 코드 안에서 둘을 섞으면 안 된다. 요즘은 공백 4개를 쓰는 것이 권장되고, 대부분의 에디터는 탭을 누르면 공백 4개로 바꿔 넣어 준다.</p>
<details class="deep"><summary>왜 탭보다 공백을 권장할까?</summary>
<p><a href="https://peps.python.org/pep-0008/#tabs-or-spaces">PEP 8</a>이 공백을 권장 방식으로 정해 두었다. 이유는 따로 적혀 있지 않다. 흔히 드는 이유는 탭은 에디터나 터미널마다 보이는 폭(4칸, 8칸)이 다르지만 공백은 어디서 보든 모양이 같다는 점이다.</p>
</details>
<p><code>if</code>뿐 아니라 <code>while</code>, <code>for</code>, <code>def</code>, <code>class</code>처럼 블록을 만드는 문은 모두 같은 규칙을 따른다. 콜론으로 블록을 열고, 그 안은 같은 깊이로 들여쓴다.</p>

<h3>조건문</h3>
<pre class="code"><code>money = 20000
if money &gt;= 20000:
    print("초밥 먹자")
else:
    print("떡볶이 먹자")
# 초밥 먹자</code></pre>
<p><code>money &gt;= 20000</code>처럼 참인지 거짓인지 판단할 수 있는 문장을 조건문이라고 한다. 조건문은 <code>True</code>나 <code>False</code>를 돌려준다. <code>if</code>는 이 값이 참이면 <code>if</code> 블록을, 아니면 <code>else</code> 블록을 실행한다. <code>else</code>는 <code>if</code> 없이 혼자 쓸 수 없다.</p>

<h3>비교 연산자</h3>
<table>
  <tr><th>연산자</th><th>뜻</th></tr>
  <tr><td><code>x &lt; y</code></td><td>x가 y보다 작다</td></tr>
  <tr><td><code>x &gt; y</code></td><td>x가 y보다 크다</td></tr>
  <tr><td><code>x == y</code></td><td>x와 y가 같다</td></tr>
  <tr><td><code>x != y</code></td><td>x와 y가 같지 않다</td></tr>
  <tr><td><code>x &gt;= y</code></td><td>x가 y보다 크거나 같다</td></tr>
  <tr><td><code>x &lt;= y</code></td><td>x가 y보다 작거나 같다</td></tr>
</table>
<p>같은지 비교할 때는 <code>==</code>를 쓴다. <code>=</code> 하나는 변수에 값을 넣는 대입이다.</p>
<pre class="code"><code>print(3 == 3, 3 != 3)    # True False</code></pre>

<h3>and, or, not</h3>
<p><code>and</code>, <code>or</code>, <code>not</code>은 논리 연산자다. 2장 불 자료형에서 본 것과 같다. 양쪽에는 값이 올 수도 있고 조건문이 올 수도 있다.</p>
<pre class="code"><code>money = 12000
card = True
if money &gt;= 15000 or card:
    print("연어덮밥 먹자")
# 연어덮밥 먹자</code></pre>
<details class="deep"><summary>and, or, not을 섞어 쓰면 무엇부터 계산할까?</summary>
<p><code>not</code> → <code>and</code> → <code>or</code> 순서로 계산한다. 헷갈리면 괄호로 순서를 직접 정한다. (<a href="https://www.w3schools.com/python/python_if_logical.asp">W3Schools</a>)</p>
<pre class="code"><code>print(True or True and False)      # True  (True or (True and False))
print((True or True) and False)    # False</code></pre>
</details>

<h3>in, not in</h3>
<p><code>x in 리스트</code>는 "리스트 안에 x가 있는가?", <code>x not in 리스트</code>는 "없는가?"로 읽는다. 리스트 자리에는 튜플이나 문자열도 올 수 있다.</p>
<pre class="code"><code>print(1 in [1, 2, 3])         # True
print("j" not in "python")    # True</code></pre>
<details class="deep"><summary>in도 연산자일까?</summary>
<p>그렇다. 파이썬 공식 문서는 <code>in</code>과 <code>not in</code>을 <a href="https://docs.python.org/3/reference/expressions.html#membership-test-operations">멤버십 검사 연산자</a>(membership test operator)라고 부른다.</p>
</details>

<h3>pass</h3>
<p>어떤 조건에서는 아무것도 하지 않게 하고 싶을 때 <code>pass</code>를 쓴다. 조건에 <code>not</code>을 붙여 뒤집는 방법도 있지만, "여기서는 넘어간다"를 드러내고 싶으면 <code>pass</code>를 쓴다.</p>
<pre class="code"><code>money = 30000
if money &gt;= 20000:
    pass
else:
    print("조건이 거짓일 때만 실행")
print("끝")    # 끝</code></pre>
<details class="deep"><summary>pass 자리에 주석만 두면 안 될까?</summary>
<p>안 된다. 주석은 파이썬이 아예 무시하기 때문에 블록이 비어 있는 것으로 본다. 블록에는 문장이 하나는 있어야 해서 에러가 난다. (<a href="https://www.w3schools.com/python/python_if_pass.asp">W3Schools</a>)</p>
<pre class="code"><code>money = 20000
if money &gt;= 20000:
    # 나중에 채우기
print("끝")    # IndentationError: expected an indented block after 'if' statement on line 2</code></pre>
<p><code>pass</code>는 아무 일도 하지 않는 <a href="https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement">문(statement)</a>이다. 문법상 블록에 문장이 꼭 있어야 하는데 실행할 게 없을 때 자리를 채우는 용도다.</p>
</details>

<h3>elif</h3>
<p><code>elif</code>는 "아니면 ~일 때"로 읽는다. 앞의 <code>if</code>나 <code>elif</code> 조건이 거짓일 때만 검사한다. 여러 개 이어 쓸 수 있고, <code>else</code>는 항상 맨 마지막에 둔다.</p>
<pre class="code"><code>money = 12000
if money &gt;= 20000:
    print("초밥 먹자")
elif money &gt;= 15000:
    print("연어덮밥 먹자")
elif money &gt;= 10000:
    print("포케 먹자")
elif money &gt;= 7000:
    print("비빔밥 먹자")
else:
    print("떡볶이 먹자")
# 포케 먹자</code></pre>
<div class="viz"><svg width="440" height="240" viewBox="0 0 440 240"><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L6,4 L0,8" fill="none" stroke="#171717" stroke-width="1.2"/></marker></defs><rect x="10" y="8" width="190" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="105" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">money &gt;= 20000</text><text x="226" y="28" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#171717">False</text><line x1="105" y1="38" x2="105" y2="52" stroke="#171717" stroke-width="1.2" marker-end="url(#ar)"/><rect x="10" y="54" width="190" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="105" y="74" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">money &gt;= 15000</text><text x="226" y="74" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#171717">False</text><line x1="105" y1="84" x2="105" y2="98" stroke="#171717" stroke-width="1.2" marker-end="url(#ar)"/><rect x="10" y="100" width="190" height="30" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="105" y="120" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">money &gt;= 10000</text><text x="226" y="120" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">True → 포케 먹자</text><rect x="10" y="146" width="190" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="105" y="166" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">money &gt;= 7000</text><text x="226" y="166" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">검사하지 않음</text><rect x="10" y="192" width="190" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="105" y="212" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">else</text><text x="226" y="212" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">검사하지 않음</text></svg></div>
<p>위에서부터 차례로 검사하다가 <mark>참인 조건을 하나 만나면 그 블록만 실행하고, 아래 조건은 보지 않는다.</mark> 12000은 7000 이상이기도 하지만 "비빔밥 먹자"는 출력되지 않는다.</p>
<details class="deep"><summary>elif는 무슨 말의 줄임일까?</summary>
<p><code>else if</code>의 줄임말이다. (<a href="https://docs.python.org/3/tutorial/controlflow.html#if-statements">파이썬 공식 튜토리얼</a>) <code>else</code> 뒤에 <code>elif</code>를 쓰면 <code>SyntaxError: 'elif' block follows an 'else' block</code>가 난다. (<a href="https://www.w3schools.com/python/python_if_else.asp">W3Schools</a>)</p>
</details>
<details class="deep"><summary>if 안에 if를 또 넣을 수 있을까?</summary>
<p>넣을 수 있다. 바깥 조건이 참일 때만 안쪽 조건을 확인한다. (<a href="https://www.w3schools.com/python/python_if_nested_if.asp">W3Schools</a>)</p>
<pre class="code"><code>money = 20000
hungry = False
if money &gt;= 15000:
    if hungry:
        print("연어덮밥 먹자")
    else:
        print("초밥 먹자")
else:
    print("떡볶이 먹자")
# 초밥 먹자</code></pre>
<p>두 조건이 다 참일 때 한 가지 일만 한다면 <code>and</code>로 합쳐도 된다. 안쪽에 <code>else</code>처럼 갈래가 더 있으면 중첩 <code>if</code>를 쓴다.</p>
<pre class="code"><code>money = 20000
hungry = True
if money &gt;= 15000 and hungry:
    print("연어덮밥 먹자")
# 연어덮밥 먹자</code></pre>
</details>

<h3>한 줄로 쓰기</h3>
<p>블록 안 문장이 한 줄뿐이면 줄을 바꾸지 않고 콜론 바로 뒤에 써도 된다.</p>
<pre class="code"><code>money = 20000
if money &gt;= 20000: print("초밥 먹자")
else: print("떡볶이 먹자")
# 초밥 먹자</code></pre>
<details class="deep"><summary>문법에 맞으면 한 줄로 써도 괜찮을까?</summary>
<p>권장하지 않는다. <a href="https://peps.python.org/pep-0008/#other-recommendations">PEP 8</a>은 한 줄에 여러 문장을 쓰지 말라고 하고, 특히 위처럼 <code>if</code>와 <code>else</code>가 같이 있는 구문은 절대 한 줄로 쓰지 말라고 한다.</p>
</details>

<h3>match-case</h3>
<p>값 하나를 여러 경우와 비교할 때 <code>elif</code>를 줄줄이 쓰면 <code>menu ==</code>가 계속 반복된다. 이럴 때 <code>match-case</code>를 쓴다. 파이썬 3.10부터 쓸 수 있다. "<code>menu</code>가 ~일 때"로 읽는다.</p>
<pre class="code"><code>menu = "연어덮밥"
match menu:
    case "초밥" | "연어덮밥":
        print("일식집으로 가자")
    case "비빔밥":
        print("한식집으로 가자")
    case "떡볶이":
        print("분식집으로 가자")
    case _:
        print("메뉴부터 다시 고르자")
# 일식집으로 가자</code></pre>
<ul>
  <li>위에서부터 비교하다가 일치하는 <code>case</code>를 만나면 그 블록만 실행한다.</li>
  <li><code>|</code>로 여러 값을 묶으면 "이거나 저거면"이 된다.</li>
  <li><code>case _</code>는 어디에도 해당하지 않을 때 실행된다. <code>else</code>와 비슷하다. 생략하면 아무 일도 하지 않는다.</li>
</ul>
<details class="deep"><summary>다른 언어의 switch와 무엇이 다를까?</summary>
<p><code>break</code>를 쓰지 않아도 된다. 어떤 <code>case</code>에 걸리면 나머지는 확인하지 않고 바로 빠져나온다.</p>
</details>
<details class="deep"><summary>match는 값이 같은지만 볼까?</summary>
<p>아니다. 값의 <b>모양</b>을 보고 맞추면서 안쪽 값을 변수로 꺼낼 수도 있다. 이걸 구조 패턴 매칭이라고 한다.</p>
<pre class="code"><code>def order(o):
    match o:
        case ["초밥"]:
            return "초밥 단품"
        case ["포케", topping]:
            return f"포케에 {topping} 토핑"
        case ["떡볶이", *sides]:
            return f"떡볶이에 사이드 {len(sides)}개"
        case {"menu": "연어덮밥", "size": size}:
            return f"연어덮밥 {size} 사이즈"
        case _:
            return "모르는 주문"

print(order(["초밥"]))                    # 초밥 단품
print(order(["포케", "아보카도"]))          # 포케에 아보카도 토핑
print(order(["떡볶이", "튀김", "순대"]))     # 떡볶이에 사이드 2개
print(order({"menu": "연어덮밥", "size": "곱빼기", "memo": "덜 맵게"}))    # 연어덮밥 곱빼기 사이즈
print(order(["비빔밥"]))                  # 모르는 주문</code></pre>
<ul>
  <li><code>["포케", topping]</code>: 길이가 2이고 첫 요소가 <code>"포케"</code>인 리스트와 맞는다. 두 번째 요소는 <code>topping</code>에 들어간다.</li>
  <li><code>["떡볶이", *sides]</code>: 첫 요소가 <code>"떡볶이"</code>면 맞고, 나머지 요소는 모두 <code>sides</code>에 리스트로 들어간다.</li>
  <li><code>{"menu": ..., "size": size}</code>: 딕셔너리는 적어 둔 키만 확인한다. <code>"memo"</code>처럼 다른 키가 더 있어도 맞는다.</li>
</ul>
<p>클래스 패턴(<code>case Point(x=0, y=y):</code>)도 있는데, 클래스를 배운 뒤에 보면 된다. 참고: <a href="https://docs.python.org/3/tutorial/controlflow.html#match-statements">파이썬 공식 튜토리얼 - match Statements</a></p>
</details>
<details class="deep"><summary>match로 범위도 비교할 수 있을까?</summary>
<p><code>case</code> 뒤에 <code>if</code>를 붙이면 조건을 더 걸 수 있다. 이걸 가드라고 한다.</p>
<pre class="code"><code>money = 12000
match money:
    case m if m &gt;= 20000:
        print("초밥 먹자")
    case m if m &gt;= 10000:
        print("포케 먹자")
    case _:
        print("떡볶이 먹자")
# 포케 먹자</code></pre>
<p>다만 범위 비교는 <code>elif</code>가 더 읽기 쉽다. 값 하나를 정해진 경우들과 맞춰 볼 때는 <code>match</code>, 크기나 범위를 비교할 때는 <code>elif</code>를 쓰는 편이 일반적이다. 참고: <a href="https://docs.python.org/3/tutorial/controlflow.html#match-statements">파이썬 공식 튜토리얼 - match Statements</a></p>
</details>

<h3>비교 연산자 이어 쓰기</h3>
<p>수학처럼 비교 연산자를 이어 쓸 수 있다. <code>10000 &lt;= money &lt; 20000</code>은 <code>(10000 &lt;= money) and (money &lt; 20000)</code>과 같다.</p>
<pre class="code"><code>money = 12000
print(10000 &lt;= money &lt; 20000)                 # True
print((10000 &lt;= money) and (money &lt; 20000))   # True</code></pre>
<details class="deep"><summary>다른 언어에서 1 &lt; x &lt; 10이라고 쓰면 어떻게 될까?</summary>
<p>C나 JavaScript에서는 에러 없이 실행되지만 뜻이 다르다. 왼쪽 <code>(1 &lt; x)</code>를 먼저 계산하고, 그 결과(참/거짓)를 다시 10과 비교한다. 그래서 JavaScript에서 <code>1 &lt; 20 &lt; 10</code>은 <code>true</code>가 된다.</p>
<pre class="code norun"><code>&gt; 1 &lt; 20 &lt; 10    // (1 &lt; 20) &lt; 10 → true &lt; 10 → 1 &lt; 10
true</code></pre>
<p>Java는 <code>boolean</code>과 숫자를 비교할 수 없어서 컴파일 에러가 난다. 이런 언어에서는 <code>(1 &lt; x) &amp;&amp; (x &lt; 10)</code>처럼 나눠 써야 한다.</p>
</details>

<h3>조건부 표현식</h3>
<p>조건에 따라 변수에 다른 값을 넣을 때 <code>if</code> 문을 쓸 수도 있지만,</p>
<pre class="code"><code>money = 20000
if money &gt;= 20000:
    lunch = "초밥"
else:
    lunch = "떡볶이"
print(lunch)    # 초밥</code></pre>
<p>조건부 표현식을 쓰면 한 줄로 줄어든다. 다른 언어의 삼항 연산자와 같은 역할이다.</p>
<pre class="code norun"><code>변수 = 참일_때_값 if 조건문 else 거짓일_때_값</code></pre>
<pre class="code"><code>money = 20000
lunch = "초밥" if money &gt;= 20000 else "떡볶이"
print(lunch)    # 초밥</code></pre>
<details class="deep"><summary>조건부 표현식도 elif처럼 이어 쓸 수 있을까?</summary>
<p>이어 쓸 수 있다. 다만 읽기 어려워지니 짧고 간단할 때만 쓴다. (<a href="https://www.w3schools.com/python/python_if_shorthand.asp">W3Schools</a>)</p>
<pre class="code"><code>money = 15000
print("초밥" if money &gt;= 20000 else "연어덮밥" if money &gt;= 15000 else "떡볶이")    # 연어덮밥</code></pre>
</details>
`
    },
    {
      id: "3-2",
      title: "3-2 while 문",
      html: `
<h3>while 문의 기본 구조</h3>
<p><code>while</code> 문은 문장을 반복해서 실행할 때 쓴다. "조건문이 참인 동안 아래 문장들을 실행한다"로 읽는다.</p>
<pre class="code norun"><code>while 조건문:
    수행할_문장1
    수행할_문장2
    ...</code></pre>
<pre class="code"><code>plates = 0
while plates &lt; 3:
    plates = plates + 1    # plates += 1 이라고 써도 된다
    print(f"초밥 {plates}접시째")
# 초밥 1접시째
# 초밥 2접시째
# 초밥 3접시째</code></pre>
<div class="viz"><svg width="430" height="172" viewBox="0 0 430 172"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c"><text x="20" y="20">확인할 때 plates</text><text x="120" y="20">조건</text><text x="220" y="20">결과</text><text x="300" y="20">실행</text></g><line x1="10" y1="30" x2="420" y2="30" stroke="#171717" stroke-width="1.2"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="400"><text x="20" y="52">0</text><text x="120" y="52">0 &lt; 3</text><text x="220" y="52">True</text><text x="300" y="52" font-family="Wanted Sans Variable, Wanted Sans, sans-serif">초밥 1접시째</text></g><line x1="10" y1="64" x2="420" y2="64" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="400"><text x="20" y="86">1</text><text x="120" y="86">1 &lt; 3</text><text x="220" y="86">True</text><text x="300" y="86" font-family="Wanted Sans Variable, Wanted Sans, sans-serif">초밥 2접시째</text></g><line x1="10" y1="98" x2="420" y2="98" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="400"><text x="20" y="120">2</text><text x="120" y="120">2 &lt; 3</text><text x="220" y="120">True</text><text x="300" y="120" font-family="Wanted Sans Variable, Wanted Sans, sans-serif">초밥 3접시째</text></g><line x1="10" y1="132" x2="420" y2="132" stroke="#e5e5e5"/><rect x="10" y="133" width="410" height="33" fill="var(--hl)"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="600"><text x="20" y="154">3</text><text x="120" y="154">3 &lt; 3</text><text x="220" y="154">False</text><text x="300" y="154" font-family="Wanted Sans Variable, Wanted Sans, sans-serif">반복 끝</text></g><line x1="10" y1="166" x2="420" y2="166" stroke="#e5e5e5"/></svg></div>
<p><mark>반복할 때마다 조건을 먼저 확인하고, 거짓이 되는 순간 반복이 끝난다.</mark> 위 코드에서 <code>plates</code>가 3이 되면 <code>3 &lt; 3</code>이 거짓이라 멈춘다.</p>
<details class="deep"><summary>조건에 쓸 변수를 미리 만들지 않으면 어떻게 될까?</summary>
<p><code>while</code> 문은 처음 들어갈 때부터 조건을 확인한다. 그래서 조건에 쓰는 변수는 반복 전에 만들어 둬야 한다. 위 예제에서 <code>plates = 0</code>을 빼면 에러가 난다.</p>
<pre class="code"><code>while count &lt; 3:    # NameError: name 'count' is not defined
    count += 1</code></pre>
</details>
<details class="deep"><summary>i++로 1을 더할 수는 없을까?</summary>
<p>파이썬에는 <code>++</code>가 없다. <code>i++</code>라고 쓰면 <code>SyntaxError</code>가 나서 <code>i += 1</code>로 쓴다. <code>++i</code>는 에러가 안 나는데 값도 안 바뀐다. 파이썬은 이걸 <code>+(+i)</code>, 즉 양수 부호를 두 번 붙인 것으로 읽는다.</p>
<pre class="code"><code>i = 1
print(++i)    # 1
print(i)      # 1</code></pre>
</details>

<h3>break로 빠져나가기</h3>
<p>반복하다가 특정 조건에서 반복을 멈추고 빠져나가야 할 때 <code>break</code>를 쓴다. 보통 <code>if</code>와 함께 쓴다.</p>
<pre class="code"><code>plates = 0
while plates &lt; 10:
    plates = plates + 1
    print(f"초밥 {plates}접시째")
    if plates == 4:
        print("배부르다. 그만 먹자")
        break
# 초밥 1접시째
# 초밥 2접시째
# 초밥 3접시째
# 초밥 4접시째
# 배부르다. 그만 먹자</code></pre>
<details class="deep"><summary>break와 pass는 무엇이 다를까?</summary>
<p>둘 다 키워드 하나로 된 문(statement)이다. <code>pass</code>는 아무것도 하지 않고, <code>break</code>는 반복문을 빠져나간다.</p>
</details>

<h3>continue로 처음으로 돌아가기</h3>
<p>아래 문장을 건너뛰고 다시 조건을 확인하러 가야 할 때는 <code>continue</code>를 쓴다.</p>
<pre class="code"><code>plates = 0
while plates &lt; 5:
    plates = plates + 1
    if plates == 3:    # 3번째 접시는 건너뛴다
        continue
    print(f"초밥 {plates}접시째")
# 초밥 1접시째
# 초밥 2접시째
# 초밥 4접시째
# 초밥 5접시째</code></pre>
<div class="viz"><svg width="620" height="176" viewBox="0 0 620 176"><defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L6,4 L0,8" fill="none" stroke="#171717" stroke-width="1.2"/></marker></defs><text x="100" y="18" text-anchor="middle" font-family="JetBrains Mono" font-size="14" font-weight="600">break</text><rect x="30" y="34" width="140" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="100" y="54" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#171717">반복 조건 확인</text><rect x="30" y="84" width="140" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="100" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#171717">조건이 참이면 break</text><rect x="30" y="134" width="140" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="100" y="154" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#a3a3a3">아래 문장</text><line x1="100" y1="64" x2="100" y2="82" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><line x1="100" y1="114" x2="100" y2="132" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><path d="M30 149 H14 V49 H28" fill="none" stroke="#c8c8c8" stroke-width="1.2"/><path d="M170 99 H204" fill="none" stroke="var(--hl)" stroke-width="6" stroke-linejoin="round"/><path d="M170 99 H204" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><text x="210" y="103" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" font-weight="600">반복 빠져나가기</text><text x="430" y="18" text-anchor="middle" font-family="JetBrains Mono" font-size="14" font-weight="600">continue</text><rect x="360" y="34" width="140" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="430" y="54" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#171717">반복 조건 확인</text><rect x="360" y="84" width="140" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="430" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#171717">조건이 참이면 continue</text><rect x="360" y="134" width="140" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="430" y="154" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" fill="#a3a3a3">아래 문장</text><line x1="430" y1="64" x2="430" y2="82" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><line x1="430" y1="114" x2="430" y2="132" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><path d="M360 149 H344 V49 H358" fill="none" stroke="#c8c8c8" stroke-width="1.2"/><path d="M500 99 H522 V49 H502" fill="none" stroke="var(--hl)" stroke-width="6" stroke-linejoin="round"/><path d="M500 99 H522 V49 H502" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#ar2)"/><text x="532" y="70" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12.5" font-weight="600"><tspan x="532">반복 조건</tspan><tspan x="532" dy="16">다시 확인하기</tspan></text></svg></div>
<p><mark><code>break</code>는 반복을 끝내고, <code>continue</code>는 이번 차례만 건너뛴다.</mark></p>

<h3>무한 루프</h3>
<p>조건을 항상 참인 값으로 두면 반복이 끝나지 않는다. 이걸 무한 루프라고 한다.</p>
<pre class="code norun"><code>while True:
    print("배고프다")</code></pre>
<p>서버처럼 계속 기다려야 하는 프로그램, 입력 대기, 이벤트 처리 같은 곳에서 쓴다. 이런 경우가 아니면 무한 루프를 쓸 일은 거의 없다. 실수로 무한 루프에 빠지면 <code>Ctrl + C</code>를 눌러 프로그램을 멈춘다.</p>

<h3>while-else</h3>
<p><code>while</code> 문 뒤에 <code>else</code>를 붙일 수 있다. 조건이 거짓이 되어 반복이 끝나면 <code>else</code>가 실행되고, <code>break</code>로 빠져나오면 실행되지 않는다.</p>
<pre class="code"><code>menus = ["떡볶이", "비빔밥"]
i = 0
while i &lt; len(menus):
    if menus[i] == "초밥":
        print("초밥집 찾았다")
        break
    i = i + 1
else:
    print("초밥집이 없다")
# 초밥집이 없다</code></pre>
<details class="deep"><summary>반복문에 붙는 else는 어디에 쓰라고 만든 걸까?</summary>
<p>반복하면서 뭔가를 찾다가 찾으면 <code>break</code>로 빠져나오는 코드에서 "끝까지 못 찾았을 때"를 처리하려고 만든 문법이다. <code>else</code>가 없으면 찾았는지를 기억하는 변수를 따로 둬야 한다.</p>
<pre class="code norun"><code>found = False
while ...:
    if ...:
        found = True
        break
if not found:
    print("초밥집이 없다")</code></pre>
<p>반복문 안에는 "아직 안 끝났으면 본문을 계속 실행한다"는 <code>if</code>가 숨어 있고, 반복문의 <code>else</code>는 이 <code>if</code>에 붙는 <code>else</code>다. 레이먼드 헤팅어에 따르면 이 아이디어는 귀도 반 로섬이 아니라 <a href="https://ko.wikipedia.org/wiki/%EB%8F%84%EB%84%90%EB%93%9C_%EC%BB%A4%EB%88%84%EC%8A%A4">도널드 커누스</a>에게서 왔다.</p>
<p>헤팅어는 PyCon 2013 발표에서 이 이름을 아쉬워했다. 예전에는 반복문 안에 <code>if</code>와 <code>goto</code>가 숨어 있다는 걸 다들 알아서 <code>else</code>가 자연스러웠지만, 지금은 아는 사람이 거의 없다. 차라리 <code>no break</code>라고 불렀다면 누구나 무슨 일을 하는지 알았을 거라고 했다.</p>
<blockquote>"If I could go back in time and talk to Guido, … I would say … why don't you call it no break? If it was called no break everybody would know what it did."</blockquote>
<p>참고: <a href="https://youtu.be/OSGv2VnC0go?t=1021">Transforming Code into Beautiful, Idiomatic Python (17:01)</a>, <a href="https://docs.python.org/3/tutorial/controlflow.html#else-clauses-on-loops">파이썬 공식 튜토리얼 - else Clauses on Loops</a></p>
</details>

<h3>중첩된 while 문</h3>
<p><code>while</code> 문 안에 <code>while</code> 문을 또 넣을 수 있다. 바깥이 한 번 돌 때마다 안쪽 반복이 처음부터 끝까지 돈다.</p>
<pre class="code"><code>day = 1
while day &lt;= 2:
    plates = 1
    while plates &lt;= 3:
        print(f"{day}일차 초밥 {plates}접시째")
        plates += 1
    day += 1
# 1일차 초밥 1접시째
# 1일차 초밥 2접시째
# 1일차 초밥 3접시째
# 2일차 초밥 1접시째
# 2일차 초밥 2접시째
# 2일차 초밥 3접시째</code></pre>
<p>바깥 반복이 한 줄을 맡고, 안쪽 반복이 그 줄의 칸을 왼쪽부터 채운다.</p>
<div class="viz"><svg width="360" height="126" viewBox="0 0 360 126"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c" text-anchor="middle"><text x="120" y="18">plates 1</text><text x="210" y="18">plates 2</text><text x="300" y="18">plates 3</text></g><text x="20" y="53" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="13" fill="#171717">1일차</text><rect x="78" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="120" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">1번째</text><rect x="168" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="210" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">2번째</text><rect x="258" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="300" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">3번째</text><text x="20" y="101" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="13" fill="#171717">2일차</text><rect x="78" y="76" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="120" y="100" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">4번째</text><rect x="168" y="76" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="210" y="100" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">5번째</text><rect x="258" y="76" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="300" y="100" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">6번째</text></svg></div>
<p>들여쓰기 깊이가 어느 반복문에 속하는지를 정한다. 같은 <code>day += 1</code>이라도 몇 칸 들여썼느냐에 따라 안쪽에 속하기도 하고 바깥에 속하기도 한다.</p>
<details class="deep"><summary>안쪽 변수를 바깥 while 위로 빼면 어떻게 될까?</summary>
<p>2일차가 아예 출력되지 않는다. 1일차가 끝난 뒤 <code>plates</code>가 4에서 1로 돌아가지 않아서, 2일차에는 안쪽 조건 <code>4 &lt;= 3</code>이 처음부터 거짓이다. 안쪽 반복에 쓰는 변수는 바깥 <code>while</code> 문 <b>안</b>에서 초기화해야 한다.</p>
<pre class="code"><code>day = 1
plates = 1          # 바깥으로 빼면
while day &lt;= 2:
    while plates &lt;= 3:
        print(f"{day}일차 초밥 {plates}접시째")
        plates += 1
    day += 1
# 1일차 초밥 1접시째
# 1일차 초밥 2접시째
# 1일차 초밥 3접시째</code></pre>
<div class="viz"><svg width="470" height="126" viewBox="0 0 470 126"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c" text-anchor="middle"><text x="120" y="18">plates 1</text><text x="210" y="18">plates 2</text><text x="300" y="18">plates 3</text></g><text x="20" y="53" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="13" fill="#171717">1일차</text><rect x="78" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="120" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">1번째</text><rect x="168" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="210" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">2번째</text><rect x="258" y="28" width="84" height="38" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="300" y="52" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">3번째</text><text x="20" y="101" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="13" fill="#171717">2일차</text><rect x="78" y="76" width="84" height="38" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/><rect x="168" y="76" width="84" height="38" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/><rect x="258" y="76" width="84" height="38" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/><text x="354" y="100" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#a3a3a3">plates가 이미 4</text></svg></div>
</details>
<details class="deep"><summary>안쪽에서 break하면 바깥 반복도 끝날까?</summary>
<p>아니다. <code>break</code>와 <code>continue</code>는 자기를 감싼 가장 안쪽 반복문 하나에만 적용된다.</p>
<pre class="code"><code>day = 1
while day &lt;= 2:
    plates = 1
    while plates &lt;= 3:
        if plates == 2:
            break      # 안쪽 while 문만 빠져나간다
        print(f"{day}일차 초밥 {plates}접시째")
        plates += 1
    day += 1
# 1일차 초밥 1접시째
# 2일차 초밥 1접시째</code></pre>
<p>Java나 JavaScript는 <code>break outer;</code>처럼 레이블을 붙여 바깥 반복문까지 한 번에 빠져나올 수 있지만, 파이썬에는 이 기능이 없다. <code>break outer</code>라고 쓰면 <code>SyntaxError</code>가 난다. 두 겹을 한 번에 빠져나오려면 플래그 변수를 두고 바깥에서도 확인하거나, 반복문을 함수로 만들고 <code>return</code>으로 빠져나온다.</p>
<p class="lead"><b>플래그 변수를 쓰는 방법</b></p>
<pre class="code"><code>full = False
day = 1
while day &lt;= 2:
    plates = 1
    while plates &lt;= 3:
        if plates == 2:
            full = True
            break
        print(f"{day}일차 초밥 {plates}접시째")
        plates += 1
    if full:          # 바깥에서도 확인한다
        break
    day += 1
# 1일차 초밥 1접시째</code></pre>
<p class="lead"><b>함수와 return을 쓰는 방법 (함수는 4장에서 배운다)</b></p>
<pre class="code"><code>def eat():
    day = 1
    while day &lt;= 2:
        plates = 1
        while plates &lt;= 3:
            if plates == 2:
                return    # 함수 전체를 빠져나간다
            print(f"{day}일차 초밥 {plates}접시째")
            plates += 1
        day += 1

eat()
# 1일차 초밥 1접시째</code></pre>
</details>
`
    },
    {
      id: "3-3",
      title: "3-3 for 문",
      html: `
<h3>for 문의 기본 구조</h3>
<pre class="code norun"><code>for 변수 in 리스트(또는 튜플, 문자열):
    수행할_문장1
    수행할_문장2
    ...</code></pre>
<p><mark><code>in</code> 뒤에 있는 것의 원소를 앞에서부터 하나씩 꺼내 변수에 넣고, 블록을 실행한다.</mark> 원소를 다 꺼내면 끝난다.</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
for menu in menus:
    print(f"{menu} 먹자")
# 초밥 먹자
# 연어덮밥 먹자
# 포케 먹자</code></pre>
<p>문자열을 돌면 한 글자씩 나온다.</p>
<pre class="code"><code>for ch in "초밥":
    print(ch)
# 초
# 밥</code></pre>
<details class="deep"><summary>다른 언어의 for와 무엇이 다를까?</summary>
<p>C나 Java의 <code>for (i = 0; i &lt; n; i++)</code>처럼 인덱스 변수를 따로 두지 않고 원소를 바로 꺼낸다. JavaScript의 <code>for...of</code>나 <code>forEach</code>에 가깝다. 리스트, 튜플, 문자열 말고 딕셔너리와 집합도 돌 수 있다. 딕셔너리를 돌면 키가 나온다. (<a href="https://www.w3schools.com/python/python_for_loops.asp">W3Schools</a>)</p>
<pre class="code"><code>prices = {"초밥": 20000, "포케": 10000}
for menu in prices:
    print(menu)
# 초밥
# 포케</code></pre>
</details>
<p>원소가 튜플이면 변수 자리에서 바로 나눠 받을 수 있다.</p>
<pre class="code"><code>prices = [("초밥", 20000), ("연어덮밥", 15000), ("포케", 10000)]
for (menu, price) in prices:
    print(f"{menu}: {price}원")
# 초밥: 20000원
# 연어덮밥: 15000원
# 포케: 10000원</code></pre>
<details class="deep"><summary>튜플이 아니어도 나눠 받을 수 있을까?</summary>
<p>된다. 변수 자리를 <code>[menu, price]</code>처럼 써도 되고, 괄호 없이 <code>menu, price</code>라고만 써도 된다. 나눠 받는 원소가 <code>["초밥", 20000]</code> 같은 리스트여도 된다. 개수만 맞으면 된다.</p>
<pre class="code"><code>for menu, price in [["초밥", 20000], ["포케", 10000]]:
    print(menu, price)
# 초밥 20000
# 포케 10000</code></pre>
</details>

<h3>continue, break</h3>
<p><code>while</code> 문에서 본 <code>continue</code>와 <code>break</code>를 <code>for</code> 문에서도 쓴다. <code>for</code> 문에는 다시 확인할 조건이 없으니, <code>continue</code>를 만나면 바로 다음 원소로 넘어간다.</p>
<pre class="code"><code>menus = ["초밥", "떡볶이", "포케"]
for menu in menus:
    if menu == "떡볶이":
        continue
    print(f"{menu} 먹자")
# 초밥 먹자
# 포케 먹자</code></pre>
<pre class="code"><code>menus = ["떡볶이", "초밥", "포케"]
for menu in menus:
    print(f"{menu} 확인")
    if menu == "초밥":
        print("초밥 찾았다")
        break
# 떡볶이 확인
# 초밥 확인
# 초밥 찾았다</code></pre>

<h3>for-else</h3>
<p><code>while</code> 문과 같다. 원소를 끝까지 다 돌면 <code>else</code>가 실행되고, <code>break</code>로 빠져나오면 실행되지 않는다. 리스트에서 원하는 값을 끝내 못 찾았을 때를 처리하기 좋다.</p>
<pre class="code"><code>menus = ["떡볶이", "비빔밥"]
for menu in menus:
    if menu == "초밥":
        print("초밥집 찾았다")
        break
else:
    print("초밥집이 없다")
# 초밥집이 없다</code></pre>

<h3>range</h3>
<p><code>range</code>는 연속된 숫자를 만들어 준다. <a href="https://docs.python.org/3/library/stdtypes.html#range">공식 문서</a>의 모양은 이렇다.</p>
<pre class="code norun"><code>range(stop)
range(start, stop, step=1)</code></pre>
<ul>
  <li><code>start</code>를 생략하면 0부터 시작한다.</li>
  <li><mark><code>range</code>의 <code>stop</code>은 포함하지 않는다.</mark> <code>start</code> 이상 <code>stop</code> 미만이다.</li>
  <li><code>step</code>은 몇씩 건너뛸지다. 생략하면 1이고, 음수면 거꾸로 센다.</li>
</ul>
<pre class="code"><code>print(list(range(5)))           # [0, 1, 2, 3, 4]
print(list(range(1, 11)))       # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(list(range(0, 10, 3)))    # [0, 3, 6, 9]
print(list(range(10, 0, -2)))   # [10, 8, 6, 4, 2]</code></pre>
<div class="viz"><svg width="508" height="132" viewBox="0 0 508 132"><defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L6,4 L0,8" fill="none" stroke="#171717" stroke-width="1.2"/></marker></defs><text x="10" y="16" font-family="JetBrains Mono" font-size="13" font-weight="600">range(0, 12, 4)</text><rect x="11" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="28.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">0</text><rect x="47" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="64.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">1</text><rect x="83" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="100.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">2</text><rect x="119" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="136.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">3</text><rect x="155" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="172.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">4</text><rect x="191" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="208.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">5</text><rect x="227" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="244.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">6</text><rect x="263" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="280.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">7</text><rect x="299" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="316.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">8</text><rect x="335" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="352.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">9</text><rect x="371" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="388.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">10</text><rect x="407" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="424.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">11</text><rect x="443" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#a3a3a3" stroke-dasharray="4 3"/><text x="460.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">12</text><path d="M28.0 46 Q100.0 24 172.0 46" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#ar3)"/><text x="100.0" y="32" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#525252">+4</text><path d="M172.0 46 Q244.0 24 316.0 46" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#ar3)"/><text x="244.0" y="32" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#525252">+4</text><text x="28.0" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12">start</text><text x="460.0" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">stop</text><text x="460.0" y="120" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">포함 안 함</text></svg></div>
<p><code>for</code> 문과 함께 쓰면 1부터 10까지 더하기가 간단해진다.</p>
<pre class="code"><code>add = 0
for i in range(1, 11):
    add = add + i
print(add)    # 55</code></pre>
<p>인덱스가 필요하면 <code>range(len(리스트))</code>로 인덱스를 만들어 돈다.</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
for i in range(len(menus)):
    print(i, menus[i])
# 0 초밥
# 1 연어덮밥
# 2 포케</code></pre>
<details class="deep"><summary>range(1, 11)은 리스트일까?</summary>
<p>아니다. <code>range</code>라는 별도의 자료형이다. 그대로 출력하면 숫자가 아니라 <code>range(1, 11)</code>이 나온다.</p>
<pre class="code"><code>print(range(1, 11))          # range(1, 11)
print(type(range(1, 11)))    # &lt;class 'range'&gt;</code></pre>
<p>숫자를 미리 다 만들어 두지 않고 필요할 때 하나씩 꺼내 쓴다. 그래서 내용을 보려면 <code>list()</code>로 감싼다. 리스트는 아니지만 인덱싱, 슬라이싱, <code>in</code>, <code>len()</code>은 된다. 값을 바꿀 수는 없다. (<a href="https://www.w3schools.com/python/python_range.asp">W3Schools</a>)</p>
<pre class="code"><code>r = range(0, 10, 2)    # 0, 2, 4, 6, 8
print(r[2])        # 4
print(r[:3])       # range(0, 6, 2)
print(6 in r)      # True
print(len(r))      # 5
r[0] = 100         # TypeError: 'range' object does not support item assignment</code></pre>
<p>엄밀히는 함수가 아니라 클래스다. 공식 문서에도 <code>class range</code>로 나온다. <code>range(1, 11)</code>은 <code>range</code> 자료형의 값을 하나 만드는 것이다. 쓰는 방법이 함수와 같아서 함수라고 불러도 쓰는 데는 문제가 없다.</p>
</details>
<details class="deep"><summary>숫자는 필요 없고 횟수만 반복하려면 어떻게 쓸까?</summary>
<p><code>for _ in range(n)</code>처럼 쓴다. 변수 이름을 <code>_</code>로 두는 건 "이 값은 쓰지 않는다"는 관례다.</p>
<pre class="code"><code>for _ in range(3):
    print("초밥 한 접시 추가")
# 초밥 한 접시 추가
# 초밥 한 접시 추가
# 초밥 한 접시 추가</code></pre>
</details>

<h3>중첩된 for 문과 print의 end</h3>
<pre class="code"><code>for day in range(1, 3):
    print(f"{day}일차:", end=" ")
    for plates in range(1, 4):
        print(plates, end=" ")
    print("")
# 1일차: 1 2 3
# 2일차: 1 2 3</code></pre>
<p><code>print</code>는 출력이 끝나면 줄을 바꾼다. <code>end</code>의 기본값이 줄바꿈 문자(<code>\\n</code>)라서다. <code>end=" "</code>로 바꾸면 줄을 바꾸지 않고 같은 줄에 이어서 출력한다. 마지막 <code>print("")</code>는 한 일차가 끝날 때 줄을 바꾸는 역할이다. <code>print</code>는 4장에서 자세히 다룬다.</p>

<h3>리스트 컴프리헨션</h3>
<p>리스트를 만드는 규칙을 한 줄로 적는 문법이다.</p>
<pre class="code"><code>print([x * x for x in [1, 2, 3]])    # [1, 4, 9]</code></pre>
<p>같은 일을 <code>for</code> 문으로 하면 빈 리스트 만들기, 반복하기, 하나씩 추가하기의 세 단계가 필요하다. <mark>리스트 컴프리헨션은 빈 리스트에 <code>for</code> 문으로 하나씩 추가하는 코드를 한 줄로 줄인 것이다.</mark> 결과는 늘 새 리스트이고 원래 리스트는 바뀌지 않는다.</p>
<pre class="code"><code>result = []
for x in [1, 2, 3]:
    result.append(x * x)
print(result)    # [1, 4, 9]</code></pre>
<p>뒤에 <code>if</code>를 붙이면 조건에 맞는 원소만 담는다. <code>if</code> 부분은 생략할 수 있다.</p>
<pre class="code norun"><code>[표현식 for 항목 in 반복_가능_객체 if 조건문]</code></pre>
<pre class="code"><code>prices = [("초밥", 20000), ("연어덮밥", 15000), ("포케", 10000), ("떡볶이", 5000)]
print([menu for menu, price in prices if price &lt;= 15000])    # ['연어덮밥', '포케', '떡볶이']</code></pre>
<details class="deep"><summary>if를 for 앞에 쓰면 어떻게 될까?</summary>
<p>하는 일이 달라진다. 뒤에 쓰는 <code>if</code>는 걸러 내는 필터라서 원소가 빠진다. 앞에 쓰는 <code>if … else …</code>는 조건부 표현식이라서 원소 개수는 그대로 두고 값만 바꾼다. 뒤쪽 <code>if</code>에는 <code>else</code>를 붙일 수 없다. (<a href="https://www.w3schools.com/python/python_lists_comprehension.asp">W3Schools</a>)</p>
<pre class="code"><code>menus = ["초밥", "떡볶이", "포케"]
print([m for m in menus if m != "떡볶이"])                 # ['초밥', '포케']
print([m if m != "떡볶이" else "비빔밥" for m in menus])    # ['초밥', '비빔밥', '포케']</code></pre>
</details>
<p><code>for</code>를 여러 개 이어 쓸 수도 있다. 앞의 <code>for</code>가 바깥 반복, 뒤의 <code>for</code>가 안쪽 반복이다.</p>
<pre class="code norun"><code>[표현식 for 항목1 in 반복_가능_객체1 if 조건문1
        for 항목2 in 반복_가능_객체2 if 조건문2
        ...
        for 항목n in 반복_가능_객체n if 조건문n]</code></pre>
<pre class="code"><code>print([f"{day}일차 {menu}" for day in range(1, 3) for menu in ["초밥", "포케"]])
# ['1일차 초밥', '1일차 포케', '2일차 초밥', '2일차 포케']</code></pre>
<details class="deep"><summary>왜 컴프리헨션이라고 부를까?</summary>
<p>수학의 집합 표기법(조건제시법)에서 왔다. 원소를 하나하나 나열하지 않고 어떤 규칙으로 만들어지는 원소들이라고 정의하는 방식이다.</p>
<pre class="code norun"><code>{ x² | x ∈ {1, 2, 3} }      → {1, 4, 9}</code></pre>
<p>이런 문법을 "comprehension"이라고 처음 부른 건 1977년 로드 버스톨(Rod Burstall)과 존 달링턴(John Darlington)의 NPL 언어 설명이다. "list comprehension"이라는 이름은 필립 와들러(Phil Wadler)가 지었다. 파이썬은 이 문법을 함수형 언어 Haskell에서 가져왔다.</p>
<p>참고: <a href="https://en.wikipedia.org/wiki/List_comprehension">Wikipedia - List comprehension</a>, <a href="https://docs.python.org/3/howto/functional.html#generator-expressions-and-list-comprehensions">파이썬 공식 문서 - Functional Programming HOWTO</a></p>
</details>

<h3>enumerate</h3>
<p><code>enumerate</code>는 반복하면서 몇 번째인지(인덱스)와 값을 함께 꺼내 준다. enumerate는 '하나하나 세다', '열거하다'라는 뜻이다. <a href="https://docs.python.org/3/library/functions.html#enumerate">공식 문서</a>의 모양은 <code>enumerate(iterable, start=0)</code>이다.</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
for i, menu in enumerate(menus):
    print(i, menu)
# 0 초밥
# 1 연어덮밥
# 2 포케</code></pre>
<p><code>(인덱스, 값)</code> 튜플을 하나씩 꺼내 주니까 <code>for i, menu in</code>으로 바로 나눠 받는다. <code>range(len())</code>을 쓸 때처럼 <code>menus[i]</code>로 다시 꺼낼 필요가 없다. <code>start</code>로 시작 번호를 정할 수 있고, 생략하면 0부터 센다.</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
for i, menu in enumerate(menus, start=1):
    print(i, menu)
# 1 초밥
# 2 연어덮밥
# 3 포케</code></pre>
<details class="deep"><summary>enumerate는 튜플이 담긴 리스트를 돌려줄까?</summary>
<p>아니다. <code>range</code>처럼 <code>enumerate</code>라는 별도의 객체를 돌려준다. 튜플을 미리 다 만들어 두지 않고, <code>for</code> 문이 다음 원소를 달라고 할 때마다 하나씩 만든다.</p>
<pre class="code"><code>e = enumerate(["초밥", "포케"])
print(next(e))    # (0, '초밥')
print(next(e))    # (1, '포케')
print(list(e))    # []</code></pre>
<p><code>range</code>와 다른 점은 한 번 다 꺼내면 끝이라는 것이다. 두 번 꺼낸 뒤 <code>list(e)</code>를 하면 빈 리스트가 나온다. 이렇게 하나씩 꺼내 쓰는 객체를 이터레이터(iterator)라고 하고, 7장에서 자세히 다룬다.</p>
</details>

<h3>zip</h3>
<p>여러 리스트를 동시에 돌고 싶을 때 <code>zip</code>을 쓴다. 각 리스트에서 같은 순서의 원소를 하나씩 모아 튜플로 묶어 주니까, 튜플 나눠 받기로 꺼내 쓴다. (<a href="https://docs.python.org/3/library/functions.html#zip">공식 문서</a>)</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
prices = [20000, 15000, 10000]
for menu, price in zip(menus, prices):
    print(menu, price)
# 초밥 20000
# 연어덮밥 15000
# 포케 10000</code></pre>
<details class="deep"><summary>zip이 묶은 내용을 바로 보려면 어떻게 할까?</summary>
<p><code>list()</code>로 감싼다. <code>zip</code>도 <code>enumerate</code>처럼 튜플을 하나씩 만들어 주는 이터레이터다. 공식 문서 표현으로는 "returns an iterator of tuples"다.</p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
prices = [20000, 15000, 10000]
print(list(zip(menus, prices)))    # [('초밥', 20000), ('연어덮밥', 15000), ('포케', 10000)]</code></pre>
</details>
<details class="deep"><summary>묶는 리스트의 길이가 다르면 어떻게 될까?</summary>
<p>짧은 쪽에 맞춘다. 남는 원소가 에러 없이 빠지기 때문에 버그가 생겨도 알아채기 어렵다.</p>
<pre class="code"><code>print(list(zip(["초밥", "연어덮밥", "포케"], [20000, 15000])))    # [('초밥', 20000), ('연어덮밥', 15000)]</code></pre>
<p><code>strict=True</code>를 주면 길이가 다를 때 <code>ValueError</code>가 난다. 파이썬 3.10부터 쓸 수 있다.</p>
<pre class="code"><code>print(list(zip(["초밥", "연어덮밥", "포케"], [20000, 15000], strict=True)))    # ValueError: zip() argument 2 is shorter than argument 1</code></pre>
<p>긴 쪽에 맞추고 싶으면 <a href="https://docs.python.org/3/library/itertools.html#itertools.zip_longest"><code>itertools.zip_longest</code></a>를 쓴다. 모자란 자리는 <code>None</code>으로 채운다.</p>
<pre class="code"><code>from itertools import zip_longest
print(list(zip_longest(["초밥", "연어덮밥", "포케"], [20000, 15000])))    # [('초밥', 20000), ('연어덮밥', 15000), ('포케', None)]</code></pre>
</details>
<details class="deep"><summary>zip은 반복 말고 어디에 쓸 수 있을까?</summary>
<p class="lead"><b>딕셔너리 만들기</b></p>
<pre class="code"><code>menus = ["초밥", "연어덮밥", "포케"]
prices = [20000, 15000, 10000]
print(dict(zip(menus, prices)))    # {'초밥': 20000, '연어덮밥': 15000, '포케': 10000}</code></pre>
<p class="lead"><b>다시 풀기</b></p>
<p>묶여 있는 짝들을 메뉴끼리, 가격끼리 다시 나눈다. 공식 문서도 <code>zip</code>을 행과 열을 바꾸는 것(행렬 전치)과 비슷하다고 설명한다.</p>
<pre class="code"><code>pairs = [("초밥", 20000), ("포케", 10000)]
names, costs = zip(*pairs)
print(names)    # ('초밥', '포케')
print(costs)    # (20000, 10000)</code></pre>
<p><code>*pairs</code>는 리스트를 풀어서 각 원소를 따로따로 인자로 넘기는 문법이다. <code>zip(*pairs)</code>는 <code>zip(("초밥", 20000), ("포케", 10000))</code>과 같다. 함수 인자는 4장에서 자세히 다룬다.</p>
<p class="lead"><b>남는 값 모으기</b></p>
<p>반대로 받는 쪽 변수에 <code>*</code>를 붙이면 남는 값을 리스트로 모은다. (<a href="https://www.w3schools.com/python/python_tuples_unpack.asp">W3Schools</a>)</p>
<pre class="code"><code>menus = ("초밥", "연어덮밥", "포케", "비빔밥", "떡볶이")
first, second, *rest = menus
print(rest)      # ['포케', '비빔밥', '떡볶이']
first, *middle, last = menus
print(middle)    # ['연어덮밥', '포케', '비빔밥']</code></pre>
</details>
`
    }
  ],

  questions: [
    // 3-1 (12)
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "money = 12000\nif money >= 15000:\n    print(\"연어덮밥\")\nelif money >= 10000:\n    print(\"포케\")\nelse:\n    print(\"떡볶이\")",
      options: ["연어덮밥", "떡볶이", "포케"], answer: 2,
      explain: "위에서부터 조건을 하나씩 확인한다. 12000은 15000보다 작아서 첫 조건은 거짓이고, 10000 이상이라 두 번째 조건이 참이다. 참인 블록을 실행하면 아래 <code>else</code>는 보지 않는다.",
      viz: `<svg width="380" height="146" viewBox="0 0 380 146"><defs><marker id="arq1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L6,4 L0,8" fill="none" stroke="#171717" stroke-width="1.2"/></marker></defs><rect x="10" y="8" width="190" height="30" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="105" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">money &gt;= 15000</text><text x="226" y="28" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#171717">False</text><line x1="105" y1="38" x2="105" y2="52" stroke="#171717" stroke-width="1.2" marker-end="url(#arq1)"/><rect x="10" y="54" width="190" height="30" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="105" y="74" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">money &gt;= 10000</text><text x="226" y="74" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">True → 포케</text><rect x="10" y="100" width="190" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="105" y="120" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">else</text><text x="226" y="120" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">검사하지 않음</text></svg>` },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?", code: "print(\"a\" in \"banana\", \"ban\" in [\"banana\"])",
      options: ["True True", "False False", "True False"], answer: 2,
      explain: "문자열에서 <code>in</code>은 그 글자들이 문자열 안에 들어 있는지 본다. <code>\"banana\"</code>에 <code>\"a\"</code>가 있으니 <code>True</code>다. 리스트에서 <code>in</code>은 원소 하나와 통째로 같은지 본다. 리스트에는 <code>\"banana\"</code> 한 개뿐이라 <code>\"ban\"</code>은 <code>False</code>다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?", code: "print(not 3 > 5)",
      options: ["True", "False", "오류"], answer: 0,
      explain: "<code>not</code>은 비교보다 나중에 계산한다. <code>3 &gt; 5</code>가 먼저 계산되어 <code>False</code>가 되고, <code>not</code>이 이를 뒤집어 <code>True</code>가 된다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "money = 20000\ncard = False\nif money >= 15000 and card:\n    print(\"A\")\nelif money >= 15000 or card:\n    print(\"B\")\nelse:\n    print(\"C\")",
      options: ["A", "B", "C"], answer: 1,
      explain: "<code>card</code>가 <code>False</code>라서 <code>money &gt;= 15000 and card</code>는 거짓이다. <code>and</code>는 양쪽이 모두 참이어야 한다. 다음 <code>elif</code>의 <code>or</code>는 한쪽만 참이어도 되는데, 돈 조건이 참이라 B가 출력된다.",
      viz: `<svg width="410" height="156" viewBox="0 0 410 156"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c"><text x="20" y="20">식</text><text x="250" y="20">값</text></g><line x1="10" y1="30" x2="400" y2="30" stroke="#171717" stroke-width="1.2"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="400"><text x="20" y="50">money &gt;= 15000</text><text x="250" y="50">True</text></g><line x1="10" y1="60" x2="400" y2="60" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="400"><text x="20" y="80">card</text><text x="250" y="80">False</text></g><line x1="10" y1="90" x2="400" y2="90" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#a3a3a3" font-weight="400"><text x="20" y="110">money &gt;= 15000 and card</text><text x="250" y="110">False → 건너뜀</text></g><line x1="10" y1="120" x2="400" y2="120" stroke="#e5e5e5"/><rect x="10" y="121" width="390" height="29" fill="var(--hl)"/><g font-family="JetBrains Mono" font-size="13" fill="#171717" font-weight="600"><text x="20" y="140">money &gt;= 15000 or card</text><text x="250" y="140">True → B</text></g><line x1="10" y1="150" x2="400" y2="150" stroke="#e5e5e5"/></svg>` },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "count = 0\nif count > 0:\n    count = count + 10\ncount = count + 1\nprint(count)",
      options: ["11", "0", "1"], answer: 2,
      explain: "<code>count &gt; 0</code>이 거짓이라 <code>count = count + 10</code>은 건너뛴다. <code>count = count + 1</code>은 들여쓰지 않아서 <code>if</code> 블록 밖에 있으므로, 조건과 상관없이 실행된다.",
      viz: `<svg width="400" height="150" viewBox="0 0 400 150"><text x="12" y="23" font-family="JetBrains Mono" font-size="13" fill="#171717" xml:space="preserve">count = 0</text><text x="12" y="51" font-family="JetBrains Mono" font-size="13" fill="#171717" xml:space="preserve">if count &gt; 0:</text><text x="230" y="51" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" font-weight="400" fill="#171717">False</text><text x="12" y="79" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3" xml:space="preserve">    count = count + 10</text><text x="230" y="79" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" font-weight="400" fill="#a3a3a3">건너뜀 (if 블록 안)</text><rect x="6" y="90" width="200" height="24" rx="4" fill="var(--hl)"/><text x="12" y="107" font-family="JetBrains Mono" font-size="13" fill="#171717" xml:space="preserve">count = count + 1</text><text x="230" y="107" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" font-weight="600" fill="#171717">항상 실행 (if 블록 밖)</text><text x="12" y="135" font-family="JetBrains Mono" font-size="13" fill="#171717" xml:space="preserve">print(count)</text><text x="230" y="135" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" font-weight="400" fill="#171717">1</text></svg>` },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "x = 5\nmsg = \"?\"\nif x > 3:\n    pass\nelse:\n    msg = \"작다\"\nprint(msg)",
      options: ["?", "작다", "오류"], answer: 0,
      explain: "<code>x &gt; 3</code>이 참이라 <code>if</code> 블록이 실행된다. 그런데 블록 안에는 아무것도 하지 않는 <code>pass</code>뿐이다. <code>else</code> 블록은 실행되지 않으니 <code>msg</code>는 처음 넣은 <code>\"?\"</code> 그대로다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "score = 95\nif score >= 60:\n    grade = \"D\"\nelif score >= 90:\n    grade = \"A\"\nelse:\n    grade = \"F\"\nprint(grade)",
      options: ["A", "F", "D"], answer: 2,
      explain: "95는 <code>score &gt;= 90</code>에도 맞지만, 위에서부터 검사하므로 먼저 <code>score &gt;= 60</code>을 만난다. 이게 참이라 <code>grade</code>에 <code>\"D\"</code>를 넣고, 아래 <code>elif</code>와 <code>else</code>는 검사하지 않는다.",
      more: { q: "A가 나오게 하려면 어떻게 고칠까?", a: "기준이 큰 조건을 위에 둔다. <code>if score &gt;= 90:</code>을 먼저 쓰고 <code>elif score &gt;= 60:</code>을 아래에 두면, 95는 첫 조건에서 멈춰 A가 된다." },
      viz: `<svg width="420" height="146" viewBox="0 0 420 146"><rect x="10" y="8" width="190" height="30" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="105" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#171717">score &gt;= 60</text><text x="226" y="28" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">True → D</text><rect x="10" y="54" width="190" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="105" y="74" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">score &gt;= 90</text><text x="226" y="74" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">참이지만 검사하지 않음</text><rect x="10" y="100" width="190" height="30" rx="6" fill="#fff" stroke="#c8c8c8" stroke-width="1.2"/><text x="105" y="120" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">else</text><text x="226" y="120" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">검사하지 않음</text></svg>` },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "if 0: print(\"A\")\nelse: print(\"B\")",
      options: ["A", "오류", "B"], answer: 2,
      explain: "블록 안 문장이 한 줄이면 콜론 바로 뒤에 써도 문법에 맞는다. <code>0</code>은 거짓으로 취급되므로 <code>if</code> 쪽은 건너뛰고 <code>else</code> 쪽의 B가 출력된다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "menu = \"비빔밥\"\nplace = \"미정\"\nmatch menu:\n    case \"초밥\" | \"연어덮밥\":\n        place = \"일식집\"\n    case \"떡볶이\":\n        place = \"분식집\"\nprint(place)",
      options: ["일식집", "미정", "오류"], answer: 1,
      explain: "<code>\"비빔밥\"</code>은 첫 번째 <code>case</code>(<code>\"초밥\"</code> 또는 <code>\"연어덮밥\"</code>)에도, 두 번째 <code>case</code>(<code>\"떡볶이\"</code>)에도 맞지 않는다. <code>case _</code>가 없으면 아무 블록도 실행하지 않고 넘어간다. 그래서 <code>place</code>는 처음 값 <code>\"미정\"</code> 그대로다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?", code: "x = 15\nprint(10 < x < 20, 10 < x > 20)",
      options: ["True False", "True True", "False False"], answer: 0,
      explain: "<code>10 &lt; x &lt; 20</code>은 <code>(10 &lt; x) and (x &lt; 20)</code>이라 둘 다 참이므로 <code>True</code>다. <code>10 &lt; x &gt; 20</code>도 같은 방식으로 <code>(10 &lt; x) and (x &gt; 20)</code>으로 읽는다. 15는 20보다 크지 않으니 <code>False</code>다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?",
      code: "money = 15000\nlunch = \"초밥\" if money > 15000 else \"떡볶이\"\nprint(lunch)",
      options: ["초밥", "떡볶이", "False"], answer: 1,
      explain: "<code>15000 &gt; 15000</code>은 같은 값끼리라 거짓이다. <code>&gt;=</code>였다면 참이었을 것이다. 조건부 표현식은 조건이 거짓이면 <code>else</code> 뒤의 값을 돌려주므로 <code>lunch</code>는 <code>\"떡볶이\"</code>다." },
    { unit: "3-1", question: "실행하면 무엇이 출력될까?", code: "print(True or False and False)",
      options: ["False", "True"], answer: 1,
      explain: "<code>and</code>가 <code>or</code>보다 먼저 계산된다. 그래서 <code>True or (False and False)</code>가 되고, <code>False and False</code>는 <code>False</code>, <code>True or False</code>는 <code>True</code>다.",
      more: { q: "왼쪽부터 계산하게 하려면?", a: "괄호로 묶는다. <code>(True or False) and False</code>는 <code>False</code>다." } },

    // 3-2 (8)
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "n = 1\ntotal = 0\nwhile n <= 4:\n    total += n\n    n += 1\nprint(total)",
      options: ["10", "6", "15"], answer: 0,
      explain: "<code>n</code>이 1, 2, 3, 4일 때 <code>total</code>에 차례로 더해 1 + 2 + 3 + 4 = 10이다. <code>n</code>이 5가 되면 <code>5 &lt;= 4</code>가 거짓이라 멈춘다. 조건이 <code>&lt;=</code>라서 4까지 더해진다.",
      viz: `<svg width="310" height="186" viewBox="0 0 310 186"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c"><text x="20" y="20">n</text><text x="90" y="20">n &lt;= 4</text><text x="200" y="20">total</text></g><line x1="10" y1="30" x2="300" y2="30" stroke="#171717" stroke-width="1.2"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="50">1</text><text x="90" y="50">True</text><text x="200" y="50">1</text></g><line x1="10" y1="60" x2="300" y2="60" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="80">2</text><text x="90" y="80">True</text><text x="200" y="80">3</text></g><line x1="10" y1="90" x2="300" y2="90" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="110">3</text><text x="90" y="110">True</text><text x="200" y="110">6</text></g><line x1="10" y1="120" x2="300" y2="120" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="140">4</text><text x="90" y="140">True</text><text x="200" y="140">10</text></g><line x1="10" y1="150" x2="300" y2="150" stroke="#e5e5e5"/><rect x="10" y="151" width="290" height="29" fill="var(--hl)"/><g font-family="JetBrains Mono" font-size="13" font-weight="600"><text x="20" y="170">5</text><text x="90" y="170">False</text><text x="200" y="170">반복 끝</text></g><line x1="10" y1="180" x2="300" y2="180" stroke="#e5e5e5"/></svg>` },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "n = 5\nwhile n < 3:\n    n += 1\nelse:\n    n = 100\nprint(n)",
      options: ["6", "100", "5"], answer: 1,
      explain: "<code>while</code> 문은 들어가기 전에 조건부터 확인한다. <code>5 &lt; 3</code>이 처음부터 거짓이라 블록은 한 번도 실행되지 않는다. <code>break</code>로 빠져나온 게 아니므로 <code>else</code>는 실행되어 <code>n</code>에 100이 들어간다." },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "n = 0\nwhile n < 10:\n    n += 1\n    if n == 4:\n        break\nprint(n)",
      options: ["5", "10", "4"], answer: 2,
      explain: "<code>n</code>이 1, 2, 3, 4로 늘어나다가, 4가 된 순간 <code>if n == 4</code>가 참이 되어 <code>break</code>로 반복을 빠져나온다. 조건 <code>n &lt; 10</code>은 다시 확인하지 않으니 4가 출력된다." },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "n = 0\ncnt = 0\nwhile n < 5:\n    n += 1\n    if n % 2 == 0:\n        continue\n    cnt += 1\nprint(cnt)",
      options: ["2", "5", "3"], answer: 2,
      explain: "<code>n</code>이 1부터 5까지 바뀐다. 2와 4일 때는 <code>continue</code>를 만나 아래 <code>cnt += 1</code>을 건너뛰고 조건으로 돌아간다. 1, 3, 5일 때만 <code>cnt</code>가 늘어서 3이다.",
      viz: `<svg width="410" height="186" viewBox="0 0 410 186"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c"><text x="20" y="20">n</text><text x="70" y="20">n % 2 == 0</text><text x="180" y="20">실행</text><text x="340" y="20">cnt</text></g><line x1="10" y1="30" x2="400" y2="30" stroke="#171717" stroke-width="1.2"/><g font-family="JetBrains Mono" font-size="13" fill="#171717"><text x="20" y="50">1</text><text x="70" y="50">False</text><text x="180" y="50">cnt += 1</text><text x="340" y="50" font-weight="400">1</text></g><line x1="10" y1="60" x2="400" y2="60" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#a3a3a3"><text x="20" y="80">2</text><text x="70" y="80">True</text><text x="180" y="80">continue (건너뜀)</text><text x="340" y="80" font-weight="400">1</text></g><line x1="10" y1="90" x2="400" y2="90" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#171717"><text x="20" y="110">3</text><text x="70" y="110">False</text><text x="180" y="110">cnt += 1</text><text x="340" y="110" font-weight="400">2</text></g><line x1="10" y1="120" x2="400" y2="120" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" fill="#a3a3a3"><text x="20" y="140">4</text><text x="70" y="140">True</text><text x="180" y="140">continue (건너뜀)</text><text x="340" y="140" font-weight="400">2</text></g><line x1="10" y1="150" x2="400" y2="150" stroke="#e5e5e5"/><rect x="330" y="153" width="40" height="24" rx="4" fill="var(--hl)"/><g font-family="JetBrains Mono" font-size="13" fill="#171717"><text x="20" y="170">5</text><text x="70" y="170">False</text><text x="180" y="170">cnt += 1</text><text x="340" y="170" font-weight="600">3</text></g><line x1="10" y1="180" x2="400" y2="180" stroke="#e5e5e5"/></svg>` },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "n = 0\nwhile n < 5:\n    n += 1\n    if n == 2:\n        break\nelse:\n    n = 100\nprint(n)",
      options: ["100", "5", "2"], answer: 2,
      explain: "<code>n</code>이 2가 되자 <code>break</code>로 반복을 빠져나온다. 반복문의 <code>else</code>는 <code>break</code> 없이 끝났을 때만 실행되므로 여기서는 실행되지 않는다. <code>n</code>은 2 그대로다." },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "i = 0\ncnt = 0\nwhile i < 2:\n    j = 0\n    while j < 3:\n        cnt += 1\n        j += 1\n    i += 1\nprint(cnt)",
      options: ["6", "3", "9"], answer: 0,
      explain: "바깥 반복은 <code>i</code>가 0, 1일 때 두 번 돈다. 그때마다 <code>j = 0</code>으로 다시 시작해서 안쪽 반복이 세 번 돈다. 그래서 <code>cnt</code>는 2 × 3 = 6이다." },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "i = 0\ncnt = 0\nwhile i < 2:\n    j = 0\n    while j < 3:\n        cnt += 1\n        j += 1\n        i += 1\nprint(cnt)",
      options: ["3", "6", "2"], answer: 0,
      explain: "<code>i += 1</code>이 안쪽 반복과 같은 깊이로 들여써져 있어서 안쪽 반복에 속한다. 안쪽이 세 번 도는 동안 <code>cnt</code>와 <code>i</code>가 함께 3이 된다. 바깥 조건 <code>3 &lt; 2</code>가 거짓이라 바깥 반복은 한 번만 돌고 끝난다.",
      viz: `<svg width="330" height="186" viewBox="0 0 330 186"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c"><text x="20" y="20">안쪽 반복</text><text x="130" y="20">j</text><text x="190" y="20">cnt</text><text x="250" y="20">i</text></g><line x1="10" y1="30" x2="320" y2="30" stroke="#171717" stroke-width="1.2"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="50">1번째</text><text x="130" y="50">1</text><text x="190" y="50">1</text><text x="250" y="50">1</text></g><line x1="10" y1="60" x2="320" y2="60" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="80">2번째</text><text x="130" y="80">2</text><text x="190" y="80">2</text><text x="250" y="80">2</text></g><line x1="10" y1="90" x2="320" y2="90" stroke="#e5e5e5"/><g font-family="JetBrains Mono" font-size="13" font-weight="400"><text x="20" y="110">3번째</text><text x="130" y="110">3</text><text x="190" y="110">3</text><text x="250" y="110">3</text></g><line x1="10" y1="120" x2="320" y2="120" stroke="#e5e5e5"/><text x="20" y="140" font-family="JetBrains Mono" font-size="13" font-weight="400">j &lt; 3 → 3 &lt; 3 False: 안쪽 끝</text><line x1="10" y1="150" x2="320" y2="150" stroke="#e5e5e5"/><rect x="10" y="151" width="310" height="29" fill="var(--hl)"/><text x="20" y="170" font-family="JetBrains Mono" font-size="13" font-weight="600">i &lt; 2 → 3 &lt; 2 False: 바깥 끝</text><line x1="10" y1="180" x2="320" y2="180" stroke="#e5e5e5"/></svg>` },
    { unit: "3-2", question: "실행하면 무엇이 출력될까?",
      code: "cnt = 0\ni = 0\nwhile i < 3:\n    j = 0\n    while j < 3:\n        if j == 1:\n            break\n        cnt += 1\n        j += 1\n    i += 1\nprint(cnt)",
      options: ["1", "3", "9"], answer: 1,
      explain: "안쪽 반복은 <code>j</code>가 0일 때 <code>cnt</code>를 1 늘리고, <code>j</code>가 1이 되면 <code>break</code>로 멈춘다. <code>break</code>는 안쪽 반복만 빠져나가므로 바깥 반복은 <code>i</code>가 0, 1, 2일 때 세 번 다 돈다. 그래서 1씩 세 번 더해 3이다.",
      viz: `<svg width="300" height="160" viewBox="0 0 300 160"><g font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c" text-anchor="middle"><text x="98" y="18">j = 0</text><text x="172" y="18">j = 1</text><text x="246" y="18">j = 2</text></g><text x="14" y="50" font-family="JetBrains Mono" font-size="13">i = 0</text><rect x="64" y="28" width="68" height="34" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="98" y="50" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">+1</text><rect x="138" y="28" width="68" height="34" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="172" y="50" text-anchor="middle" font-family="JetBrains Mono" font-size="13">break</text><rect x="212" y="28" width="68" height="34" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/><text x="14" y="92" font-family="JetBrains Mono" font-size="13">i = 1</text><rect x="64" y="70" width="68" height="34" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="98" y="92" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">+1</text><rect x="138" y="70" width="68" height="34" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="172" y="92" text-anchor="middle" font-family="JetBrains Mono" font-size="13">break</text><rect x="212" y="70" width="68" height="34" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/><text x="14" y="134" font-family="JetBrains Mono" font-size="13">i = 2</text><rect x="64" y="112" width="68" height="34" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="98" y="134" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">+1</text><rect x="138" y="112" width="68" height="34" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="172" y="134" text-anchor="middle" font-family="JetBrains Mono" font-size="13">break</text><rect x="212" y="112" width="68" height="34" rx="6" fill="#fff" stroke="#c8c8c8" stroke-dasharray="4 3"/></svg>` },

    // 3-3 (10)
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "cnt = 0\nfor ch in \"banana\":\n    if ch == \"a\":\n        cnt += 1\nprint(cnt)",
      options: ["3", "1", "6"], answer: 0,
      explain: "<code>for</code> 문으로 문자열을 돌면 한 글자씩 꺼낸다. b, a, n, a, n, a 중 <code>\"a\"</code>는 세 번이라 <code>cnt</code>는 3이다." },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?", code: "print(list(range(1, 10, 3)))",
      options: ["[0, 3, 6, 9]", "[1, 4, 7]", "[1, 4, 7, 10]"], answer: 1,
      explain: "1에서 시작해 3씩 건너뛰면 1, 4, 7, 10이 된다. 그런데 끝 숫자 10은 포함하지 않으므로 1, 4, 7까지만 나온다.",
      viz: `<svg width="436" height="132" viewBox="0 0 436 132"><defs><marker id="arq22" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L6,4 L0,8" fill="none" stroke="#171717" stroke-width="1.2"/></marker></defs><text x="10" y="16" font-family="JetBrains Mono" font-size="13" font-weight="600">range(1, 10, 3)</text><rect x="11" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="28.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">0</text><rect x="47" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="64.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">1</text><rect x="83" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="100.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">2</text><rect x="119" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="136.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">3</text><rect x="155" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="172.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">4</text><rect x="191" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="208.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">5</text><rect x="227" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="244.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">6</text><rect x="263" y="50" width="34" height="34" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="280.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600" fill="#171717">7</text><rect x="299" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="316.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">8</text><rect x="335" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#e0e0e0" stroke-width="1.2"/><text x="352.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400" fill="#a3a3a3">9</text><rect x="371" y="50" width="34" height="34" rx="5" fill="#fff" stroke="#a3a3a3" stroke-dasharray="4 3"/><text x="388.0" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="13" fill="#a3a3a3">10</text><path d="M64.0 46 Q118.0 24 172.0 46" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#arq22)"/><text x="118.0" y="32" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#525252">+3</text><path d="M172.0 46 Q226.0 24 280.0 46" fill="none" stroke="#171717" stroke-width="1.2" marker-end="url(#arq22)"/><text x="226.0" y="32" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#525252">+3</text><text x="64.0" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12">start</text><text x="388.0" y="104" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">stop</text><text x="388.0" y="120" text-anchor="middle" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">포함 안 함</text></svg>` },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "result = []\nfor x in [1, 2, 3, 4]:\n    if x == 2:\n        continue\n    result.append(x)\nprint(result)",
      options: ["[1]", "[2]", "[1, 3, 4]"], answer: 2,
      explain: "원소가 2일 때 <code>continue</code>를 만나 <code>append</code>를 건너뛰고 다음 원소로 넘어간다. 반복을 끝내는 <code>break</code>와 달리 3과 4는 계속 처리된다. 그래서 2만 빠진다." },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "for x in [1, 3, 5]:\n    if x % 2 == 0:\n        msg = \"짝수 있음\"\n        break\nelse:\n    msg = \"짝수 없음\"\nprint(msg)",
      options: ["짝수 있음", "짝수 없음", "오류"], answer: 1,
      explain: "1, 3, 5 모두 홀수라 <code>if</code> 블록은 한 번도 실행되지 않는다. <code>break</code> 없이 끝까지 돌았으므로 <code>else</code>가 실행되어 <code>msg</code>에 <code>\"짝수 없음\"</code>이 들어간다." },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "for a, b in [(1, 2), (3, 4)]:\n    print(a * b, end=\" \")",
      options: ["3 7", "2 12", "1 2 3 4"], answer: 1,
      explain: "첫 번째 튜플 <code>(1, 2)</code>는 <code>a = 1</code>, <code>b = 2</code>로 나눠 받아 2를 출력하고, 두 번째 <code>(3, 4)</code>는 12를 출력한다. <code>end=\" \"</code>라서 줄을 바꾸지 않고 한 줄에 이어서 나온다." },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "scores = [90, 25, 67]\nfor i in range(len(scores)):\n    if scores[i] < 60:\n        print(i)",
      options: ["1", "25", "2"], answer: 0,
      explain: "<code>range(len(scores))</code>는 <code>range(3)</code>이라 <code>i</code>에는 점수가 아니라 인덱스 0, 1, 2가 들어간다. 60보다 작은 25가 <code>scores[1]</code>이므로 출력되는 건 인덱스 1이다.",
      viz: `<svg width="360" height="70" viewBox="0 0 360 70"><text x="42" y="16" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="400" fill="#8c8c8c">0</text><rect x="10" y="26" width="64" height="34" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="42" y="48" text-anchor="middle" font-family="JetBrains Mono" font-size="14" font-weight="400">90</text><text x="112" y="16" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="600" fill="#171717">1</text><rect x="100" y="3" width="24" height="18" rx="4" fill="var(--hl)"/><text x="112" y="16" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="600">1</text><rect x="80" y="26" width="64" height="34" rx="6" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="112" y="48" text-anchor="middle" font-family="JetBrains Mono" font-size="14" font-weight="600">25</text><text x="182" y="16" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="400" fill="#8c8c8c">2</text><rect x="150" y="26" width="64" height="34" rx="6" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="182" y="48" text-anchor="middle" font-family="JetBrains Mono" font-size="14" font-weight="400">67</text><text x="232" y="16" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">← i (인덱스)</text><text x="232" y="48" font-family="Wanted Sans Variable, Wanted Sans, sans-serif" font-size="12" fill="#8c8c8c">← scores[i] (값)</text></svg>` },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?", code: "print([x * 2 for x in range(5) if x % 2 == 1])",
      options: ["[1, 3]", "[0, 4, 8]", "[2, 6]"], answer: 2,
      explain: "<code>range(5)</code>는 0, 1, 2, 3, 4다. 뒤의 <code>if x % 2 == 1</code>이 홀수인 1과 3만 남기고, 남은 값에 앞의 <code>x * 2</code>를 적용해 2와 6이 된다.",
      viz: `<svg width="380" height="144" viewBox="0 0 380 144"><text x="10" y="27" font-family="JetBrains Mono" font-size="12" fill="#525252">range(5)</text><rect x="150" y="6" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="169" y="27" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">0</text><rect x="194" y="6" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="213" y="27" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">1</text><rect x="238" y="6" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="257" y="27" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">2</text><rect x="282" y="6" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="301" y="27" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">3</text><rect x="326" y="6" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="345" y="27" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">4</text><text x="10" y="77" font-family="JetBrains Mono" font-size="12" fill="#525252">if x % 2 == 1</text><rect x="150" y="56" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/><rect x="194" y="56" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="213" y="77" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">1</text><rect x="238" y="56" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/><rect x="282" y="56" width="38" height="32" rx="5" fill="#fff" stroke="#171717" stroke-width="1.2"/><text x="301" y="77" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="400">3</text><rect x="326" y="56" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/><text x="10" y="127" font-family="JetBrains Mono" font-size="12" fill="#525252">x * 2</text><rect x="150" y="106" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/><rect x="194" y="106" width="38" height="32" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="213" y="127" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">2</text><rect x="238" y="106" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/><rect x="282" y="106" width="38" height="32" rx="5" fill="var(--hl)" stroke="#171717" stroke-width="1.2"/><text x="301" y="127" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="600">6</text><rect x="326" y="106" width="38" height="32" rx="5" fill="#fff" stroke="#d4d4d4" stroke-dasharray="4 3"/></svg>` },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?", code: "print([x if x > 1 else 0 for x in [1, 2, 3]])",
      options: ["[0, 2, 3]", "[2, 3]", "[1, 0, 0]"], answer: 0,
      explain: "<code>for</code> 앞에 있는 <code>x if x &gt; 1 else 0</code>은 걸러 내는 게 아니라 값을 정하는 조건부 표현식이다. 1은 조건이 거짓이라 0으로 바뀌고, 2와 3은 그대로 들어간다. 그래서 원소 개수는 3개 그대로다.",
      more: { q: "원소를 빼고 싶으면?", a: "<code>if</code>를 <code>for</code> 뒤로 옮긴다. <code>[x for x in [1, 2, 3] if x &gt; 1]</code>은 <code>[2, 3]</code>이다." } },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "for i, m in enumerate([\"a\", \"b\", \"c\"], 1):\n    if m == \"c\":\n        print(i)",
      options: ["2", "(3, 'c')", "3"], answer: 2,
      explain: "<code>enumerate</code>에 시작 번호 1을 주었으니 <code>\"a\"</code>가 1, <code>\"b\"</code>가 2, <code>\"c\"</code>가 3이다. <code>(번호, 값)</code> 튜플은 <code>i</code>와 <code>m</code>으로 나눠 받았으므로 <code>i</code>만 출력하면 3이다." },
    { unit: "3-3", question: "실행하면 무엇이 출력될까?",
      code: "for a, b in zip([1, 2, 3], [10, 20, 30]):\n    print(a + b, end=\" \")",
      options: ["6 60", "11 22 33", "1 10 2 20 3 30"], answer: 1,
      explain: "<code>zip</code>은 두 리스트에서 같은 순서의 원소끼리 짝을 짓는다. (1, 10), (2, 20), (3, 30) 짝마다 더해 11, 22, 33이 되고, <code>end=\" \"</code>라서 한 줄에 이어서 나온다." }
  ]
};
