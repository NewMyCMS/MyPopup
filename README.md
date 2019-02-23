# MyPopup
## 版本 0.1.23
麦草CMS（MyCMS），简约而不简单。
##
MyPopup，做的很少。MyPopup就像alert、confirm、propmt等控件一样仅仅弹出一个对话框，其他的交给回调函数yes和no甚至你绑定的事件处理函数，由你随意支配。MyPopup，做的很多。大多数情况下，你不用去管MyPopup弹出的位置、宽度、高度等等，MyPopup都会智能做出判断、渲染。
##
MyPopup是一个JavaScript（js）弹出层、弹窗、对话框组件。MyPopup遵循javascript逻辑，容易理解，上手简单。MyPopup不仅模拟了alert、confirm、propmt等等控件，还扩展出tip（小提示框）、loading（加载中）、iframe（框架）、open（常规弹窗）、blank（空白弹出层）等等常用的弹出层。让我最满意的是tip()方法，它依附于目标弹出一个小提示框。tip()方法会根据目标元素智能渲染小提示框的位置和弹出方向。依据MyPopup的tip()方法可以轻松扩展出下拉菜单组件。小提示框有zhi（带直角尾巴）、zhi1（带边框的直角尾巴）、jian（带尖角尾巴）、noTail（不带尾巴）四种样式，调用方法是MyCMS.popup.tip("麦草CMS问候您",{tipStyle: "zhi"})。

## 简单使用
先容我为MyPopup弹出层吹嘘几句。MyPopup弹出层同时兼容PC端和移动端；MyPopup弹出层用法简单，js主文件引入是必不可少的，不再赘述，它的使用逻辑深度模仿alert、confirm、propmt等等原生对话框组件，简单使用MyPopup弹出层时和使用它们相似；大多数js弹出层插件和其他js插件或js功能的耦合度都很低，MyPopup弹出层也不例外，这就注定了MyPopup弹出层插件很容易整合进其他的js框架，理论上MyPopup弹出层可以不经过任何改写就能用在任何js框架中，具体我不好说，我没用过任何js框架。
##
下载解压缩后的文件夹一级目录包含文件夹css、MyPopup，文件index.html，你只需要将MyPopup移入你的项目即可，其他的是演示文档。
在页面的头部引入MyPopup文件夹下的MyPopup.js主文件。

```
//MyPopup调用：
MyCMS.popup.alert("麦草CMS向你打招呼！", {width: "100%", top: 0, left: 0, 等等等等});
MyCMS.popup.propmt("麦草CMS向你打招呼！", "默认值，我也不知道有什么用，反正一开始就有了", options);//options就是{width: "100%", top: 0, left: 0, 等等等等}(^~^)
MyCMS.popup.confirm("麦草CMS向你打招呼！");
//把MyCMS变短点：
var p = MyCMS.popup;
p.tip("麦草CMS向你打招呼！", {border: "1px solid red"});//内容是一个字符串
p.tip(document.getElementById("myDiv"), {tipStyle: "zhi1"});//内容捕获自一个HTML元素
var c = document.createElement("div");
var d = document.createElement("div");
var t = document.createTextNode("麦草CMS向你打招呼！");
d.appendChild(t);//内容捕获自一个动态创建的元素
c.appendChild(d);
p.tip(c, document.getElementById("target"), {color: red});//document.getElementById("target"),弹出tip的目标元素
//MyPopup弹出层返回弹出层的引用，你可以调用MyCMS.popup.colse()关闭弹出层。
var p = MyCMS.popup.loading();
MyCMS.popup.close(p);
```
## options配置项简介

MyPopup提供了尺寸参数width、height，定位参数position("fix","absolute")、top("30px")、right("10%")、bottom、left、direction("vertical","horizontal"等参数决定小提示框是从目标的上下左右弹出)、tipPosition("follow","target"决定当鼠标事件触发小提示框时，小提示框是依附于鼠标弹出还是依附于目标弹出)，样式参数color、bgColor、titleColor、titleBgColor、contentBgColor、buttonColor、buttonBgcolor、border、tipStyle，回调函数yes、no，按钮参数buttons({buttons: ["你好", "你坏"]}或{buttons: "你好"}或{buttons: ["", ""]}不显示按钮，目前只处理最多两个数组项，多余的项忽略，只穿一个值(字符串或控数组项)时是“确定”按钮值)、closeBtn(是否显示关闭按钮,true或false)，定时关闭参数time({time: 5.8},参数是浮点数,单位是秒)，标题title，是否带遮罩shade，是否点击弹出层外部关闭弹出层outerClick(除了alert,confirm,propmt外默认值true)，移动端特殊效果tipType({tipType: "larger"}，tip专用，模仿百度百科移动端弹出层)，弹出层的外观风格theme({theme: "myThenme"},自定义弹出层风格)，如果空白弹出层是捕获自DOM元素是否拖离出来isOut({isOut: true}，默认值false，即不拖离)。目前只这么多接口，至于弹出层样式若提供的接口不能满足，你可以直接修改弹出层样式表。
## 新增（2019/1/31）
新增func项，{func: function(index){//做想做的}}。在func函数中可以做一些与弹出层密切相关的事情。
## 变动（2019/2/13）
修正options配置项中tipType项赋值时单词larger拼写错误。由原来的lager改为larger。同步更新简易文档中larger拼写错误。
##
修复自定义风格接口代码块中的BUG。
## 变动（2019/2/14）
彻底修正13日发现larger拼写错误。

## 自定义风格
关于自定义风格，存放于myPopup的theme文件夹下，文件夹名即为风格名称(如myTheme)，样式表名称为myPopup.css，所有的样式声明在以风格名称为名的类下(如.myTheme .popup{...})。调用方式如下：
```
//全局调用(调用后整个页面应用该风格):
MyCMS.popup.init("myTheme");
MyCMS.popup.alert("全局配置我的弹出层风格");
//局部调用(只需要在具体弹出层的options配置项中加入theme参数即可，如{theme: "myTheme"}):
MyCMS.popup.alert("我要显得出众点", {theme: "myTheme"});
```
## MyPopup同时兼容PC端和移动端
MyPopup同时兼容PC端和移动端。MyCMS智能判断系统类型，渲染相应风格。MyPopup不依赖任何js库。
##
暂时只这么介绍一下，会陆续完善文档。
## 杂项
在互联网高速发展的今天，Web前端弹出层组件多如牛毛，这只是我个人兴趣之作，去年在网上闲逛发现layer弹出层，一时兴起开始写MyPopup，半途而废，近日捡起来弄完了，MyPopup是个新生儿，在阅读使用过程中的BUG、建议请至http://www.mycms.xyz指教。在这个万物即将互联的时代，阅读方式不发生根本改变，javascript乃至整个web前端只会蓬勃发展
##
MyPopup使用Apache开源协议发布。后续会逐渐完善功能，解决兼容问题。那个悬浮的圆形关闭按钮是最后于匆忙中完成，未做细致调整美化，不是那么美观协调，请见谅。在阅读使用过程中有任何BUG、建议，请至QQ群154340308留言指教。
## 下载
下载：http://www.mycms.xyz/MyPopup/MyPopup.rar
## 演示
演示：[http://www.mycms.xyz/MyPopup/](http://www.mycms.xyz/MyPopup/)
## 图片展示
![MyPopup js弹出层效果图片展示](https://images.gitee.com/uploads/images/2019/0214/120257_2771aca2_1480837.png "MyPopup js弹出层效果图片展示_20190122_142531.png")
![模仿百度百科移动端弹出层效果](https://images.gitee.com/uploads/images/2019/0214/120337_a970bdc9_1480837.png "模仿百度百科移动端弹出层效果")
![模仿百度百科移动端弹出层效果](https://images.gitee.com/uploads/images/2019/0214/120443_7ee0c8f4_1480837.png "模仿百度百科移动端弹出层效果")
![MyPopup js弹出层效果图片展示](https://images.gitee.com/uploads/images/2019/0214/120810_3ee9d0b9_1480837.png "MyPopup js弹出层效果图片展示_20190214_104528.png")
![MyPopup js弹出层效果图片展示](https://images.gitee.com/uploads/images/2019/0214/120836_31e3fc01_1480837.png "MyPopup js弹出层效果图片展示_20190122_143100.png")
![MyPopup js弹出层效果图片展示](https://images.gitee.com/uploads/images/2019/0214/120917_71922f0c_1480837.png "MyPopup js弹出层效果图片展示_20190214_104625.png")