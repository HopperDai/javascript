#### javascript 组成

- ECMAScript；几乎没有兼容性问题
- DOM（文档对象模型）：操作 HTML 的能力  =》document；有一些操作不兼容
- BOM（浏览器对象模型）：操作浏览器的能力    =》window；没有兼容性问题（完全不兼容）
    - 各组成部分的兼容性，兼容性问题的由来

#### 命名规范

- 可读性：能看懂
- 规范性：符合规则
    - 匈牙利命名法：
        - 类型前缀（函数命名不需要）
        - 首字母大写

#### 函数
函数返回值
- 函数执行的结果
- 函数可以没有 return
- 一个函数应该只有一种类型的返回值

函数参数
- arguments: 可变参/不定参

#### 取非行间样式
- oDiv.style 只能取行间样式
- 取非行间样式：
    - IE
    ```javascript
        oDiv.currentStyle.width
    ```
    - Firefox、Chrome

    ```javascript
        // 第一个参数：DOM；第二个参数随意
        getComputedStyle(oDiv,false).width
    ```

    - 兼容获取非行间样式的方法

    ```javascript
        function getStyle(obj,name){    // 没法获取复合样式，只能获取单一样式
            if(obj.currentStyle){
                return obj.currentStyle[name];  // IE
            }else{
                return getComputedStyle(obj,false)[name];  // Firefox、Chrome
            }
        }
    ```

- css 样式的类型
    - 复合样式：background、border
    - 单一样式：width、height、position

#### 数组    
- length 属性：既可获取，又可以设置。（例子：快速清空数组）
- 数组中最好只存一种类型的变量
- 方法：
    - 添加（尾部/头部）
        - push(元素)：从尾部添加
        - unshift(元素)：从头部添加
    - 删除（尾部/头部）
        - pop()：从尾部弹出
        - shift()：从头部弹出
    - 插入/删除（中间）
        - splice 方法
            - 删除：splice(起点，长度)
            - 插入：splice(起点，长度，元素...)  =》长度的值为 0
            - 替换：splice(起点，长度，元素...)  =》长度的值为 元素的长度
            ```javascript
                var arr = [1,2,3,4,5];

                arr.splice(1,2);    // [2,3]
                console.log(arr);  // [1,4,5]

                arr.splice(1,0,'a,'b'); // []
                console.log(arr);  // [1, "a", "b", 2, 3, 4, 5]

                arr.splice(1,2,'a,'b'); // [2,3]
                console.log(arr);  // [1, "a", "b", 4, 5]
          ```
    - 排序
        - sort(比较函数)    // arr.sort() 只认识字符串，隐藏需要传比较函数
            - 字符串数组
            - 数字数组  // 返回值：-1，0，1。 return n1-n2
    - 转换
        - 数组连接：arr1.concat(arr2)
        - join(分隔符)  > split
            - 用分隔符，组合数组元素，生成字符串
            ```javascript
                var arr = [1,2,3];

                arr.join('&');  // 1&2&3
            ```
#### DOM

##### 子节点（只算第一层）
- childNodes：文本节点（没有 style） + 元素节点；（IE6-8：元素节点）    
- nodeType：节点的类型（兼容的）
    - 3：文本节点
    - 1：元素节点  
- children：只包括元素不包括文本的节点。

##### 父节点
- parentNode：查找元素的父节点
- offsetParent：获取元素用来定位的父级

##### 首尾子节点
- firstChild（IE6-8）  firstElementChild：高级浏览器使用
```javascript
    // 兼容处理
    if(oUl.firstElementChild){  // 高级浏览器
        oUl.firstElementChild.style.background = 'red';
    } else {    // 低版本浏览器
        oUl.firstChild.style.background = 'red';
    }
```
- lastChild    lastElementChild

##### 兄弟节点（兼容性问题处理和首节点一样）
- nextSibling      nextElementSibling
- previousSibling      nextElementSibling

##### DOM 方式操作元素的属性
- 设置：元素.setAttribute(属性名，属性值)
- 获取：元素.getAttribute(属性名)
- 删除：元素.removeAttribute(属性名)

##### 使用 className 选取元素

- 好处：
    - 相对 id 选取，clssName 能够批量选取元素
    - 相对 tagName 选取，clssName 能够有条件地筛选元素
- 封装函数
```javascript
    function getByClass(oParent,sClass){
        var aResult = [];
        var aEle = oParent.getElementsByTagName('*');  // 通配符获取所有的元素

        for(var i = 0; i<aEle.length; i++){
            if(aEle[i].className===sClass){
                aResult.push(aEle[i]);
            }
        }
        return aResult;
    }
```

##### DOM 应用操作
- 创建 DOM 元素
    - 创建一个节点：createElement(标签名)
    - 追加一个节点：父级.appendChild(子节点)
- 插入元素
    - 在已有元素前插入：父级.insertBefore(节点，原有节点)  原有节点：指定在谁前面插入
    ```javascript
        // IE 兼容性处理
        if(aLi.length>0){  // oUl 本来为空，aLi[0] 报错
            oUl.insertBefore(oLi,aLi[0]);
        } else {
            oUl.appendChild(oLi);
        }
    ```
- 删除 DOM 元素
    - removeChild(节点)
- 文档碎片
    - 可以提高 DOM 操作性能（理论上）—— 低级浏览器才起作用
    - 原理：
    - document.createDocumentFragment(); // 创建碎片

##### DOM 操作高级应用

###### 表格应用  
- 便捷操作
    - tbodies = getElementsByTagName('tbody')
    - rows = getElementsByTagName('tr')
    - cells = getElementsByTagName('td')
    - 注意：tbodies.rows.cells
    ```javascript
        // 表格隔行变色
        for(var i=0; i<oTab.tbodies[0].rows.length, i++){
            if(i%2===0){
                // 奇数行
                oTab.tbodies[0].rows[i].style.background = red;
            }else{
                // 偶数行
                oTab.tbodies[0].rows[i].style.background = blue;
            }
        }

        // 鼠标高亮效果
        var oldColor = '';  // 颜色保存变量 
        for(var i = 0 ; i<oTab.tbodies[0].rows.length; i++){
            oTab.tbodies[0].rows[i].mouseover = function(){
                oldColor = this.style.background; // 保存原始的背景颜色
                this.style.background = green;
            }
            oTab.tbodies[0].rows[i].mouseout = function(){
                this.style.background = oldColor;
            }
        }
    ```
- 表格添加、删除行  =》 DOM
- search 方法：找到并且返回字符串出现的位置，没找到返回 -1
    ```javascript
        var str = 'abc';
        str.search('a');    // 0
        str.search('d');    // -1
    ```
- 排序
    - appendChild()：1.先把元素从原有父级上删掉；2.添加到新的父级

###### 表单应用
- 表单：向服务器提交数据。比如：用户注册
- action：提交到哪
- 表单事件：
    - onsubmit  提交时发生
    - onreset  重置时发生
- 表单验证
    - 阻止用户输入非法字符  阻止事件
    - 输入时、失去焦点是验证    onkeyup、onblur
    - 提交时验证    onsubmit
    - 后台数据检验*

##### 运动
###### 匀速运动
- 运动框架
    - 在开始运动时，关闭已有定时器
    - 把运动和停止隔开（if/else）
- 透明度的兼容
    - IE：fiter:alpha(opacity:30)
    - chrome、firfox：opacity:0.3
- 停止条件：Math.abs(目标值 - 当前值) <= speed 。 最终两点重合

###### 缓冲运动    
- 逐渐变慢，最后停止
- 距离越远速度越大
    - 速度由距离决定
    - 速度 = （目标值-当前值）/ 缩放系数
    - 注意取整操作。向上取整：Math.ceil();向下取整：Math.floor()
        ```javascript
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        ```
- Math.abs()    求绝对值
