/**
* 作者:天琊丶
*/


//获取最外面div
var box = my$("box");
//获取相框
var screen = box.children[0];
//获取相框的宽度
var imgWidth = screen.offsetWidth;
// console.log(imgWidth);
//获取ul
var ulObj = screen.children[0];
//获取ul中所有li
var list = ulObj.children;
//获取ol
var olObj = box.children[1].children[0];
// console.log(olObj);
//获取ol中的li

//焦点的div
var arr = my$("arr");

var liObj = olObj.children;
// console.log(liObj[0]);
var pic = 0;//全局变量
for (var i = 0; i < 4; i++) {
    liObj[i].onclick = function () {
        for (var j = 0; j < 4; j++)
            olObj.children[j].removeAttribute("class");
        this.className = "current";
        pic = this.getAttribute("index");
        animate(ulObj, -pic * imgWidth);
    };
}
ulObj.appendChild(ulObj.children[0].cloneNode(true));
var timeId = setInterval(clickHandle, 4000);
olObj.onmouseover = f1;
olObj.onmouseout = f2;
function clickHandle() {
    //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
    //所以,如果用户再次点击按钮,用户应该看到第二个图片
    if (pic == list.length - 1) {
        //如何从第6个图,跳转到第一个图
        pic = 0;//先设置pic=0
        ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
    }
    pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
    animate(ulObj, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
    //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
    if (pic == list.length - 1) {
        //第五个按钮颜色干掉
        olObj.children[olObj.children.length - 1].className = "";
        //第一个按钮颜色设置上
        olObj.children[0].className = "current";
    } else {
        //干掉所有的小按钮的背景颜色
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }

};
function animate(element, target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 8);
}
//右边按钮
my$("right").onclick = clickHandle;
//左边按钮
my$("left").onclick = function () {
    if (pic == 0) {
        pic = 4;
        ulObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(ulObj, -pic * imgWidth);
    //设置小按钮的颜色---所有的小按钮干掉颜色
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    //当前的pic索引对应的按钮设置颜色
    olObj.children[pic].className = "current";

};
//添加左右按钮点击事件
my$("left").onmouseover = f1;
my$("left").onmouseout = f2;
my$("right").onmouseover = f1;
my$("right").onmouseout = f2;
function f1() {
    clearInterval(timeId);
}
function f2() {
    timeId = setInterval(clickHandle, 4000);
}




//获取person下的元素
var per = my$("person");
//获取detail下的元素
var det = my$("detail");
//获取person下的span标签
var spans = per.getElementsByTagName("span");
//获取detal下的li标签
var lis = det.getElementsByTagName("li");

//为每个span添加点击事件
for (var i = 0; i < spans.length; i++) {
    //为每个span创建index属性及赋值
    spans[i].setAttribute("index", i);
    //span的点击事件
    spans[i].onclick = function () {
        for (var j = 0; j < spans.length; j++) {
            //第一步移除所有class标签
            spans[j].removeAttribute("class");
        }
        //第二步，为当前被点击的span添加class
        this.className = "current";
        // 获取当前span的index值
        var num = this.getAttribute("index");
           
        //移除每个li的属性
        for (var k = 0; k < lis.length; k++) {
            lis[k].removeAttribute("class");
        }
        //为第几个属性添加class="current"
        lis[num].className = "current";
    };
}


//二维码的显示与隐藏
var nodesh=my$("node_small");
nodesh.onmouseover=function() {
    my$("er").className="erweima node-show";
}
nodesh.onmouseout=function() {
    my$("er").className="erweima node-hide";
}


//返回顶部
var toTop =my$("backtop"); 
window.onscroll = function(){
    //距离页面顶部的距离
    var distance = document.documentElement.scrollTop || document.body.scrollTop; 
    //当距离顶部超过300px时，显示图片
    if( distance >= 400 ) { 
        toTop.style.display = "";
    } else { 
        //距离顶部小于300px，隐藏图片
        toTop.style.display = "none";
    }
    //获取图片所在的div  
    toTop.onclick = function(){ 
        //点击图片时触发的点击事件
        document.documentElement.scrollTop = document.body.scrollTop = 0; //页面移动到顶部
    }
}