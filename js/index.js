$(function() {
    // 节流阀
    var flag = true;
    // 1. 显示/隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航li相应添加和删除current类名
        if (flag) {
            $(".floot .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        // 当我们每次点击li就需要计算页面要去往的位置
        // 选出对应索引号的内容区域的盒子，计算出它的offset().top
        var current = $(".floot .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        // 点击当前的li添加类名current,其余的移除
        $(this).addClass("current").siblings().removeClass("current");
    });
})