$(function() {
    // 1. 全选和全不选的功能模块
    // 就是把全选的按钮(checkall)的状态赋值给三个小按钮(j-checkbox)就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop('checked')) {
            // 让所有的商品添加check-cart-item类
            $(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果复选框全选，则全选按钮要选中，否则不选中
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop('checked', true);
        } else {
            $(".checkall").prop('checked', false);
        }
        if ($(this).prop("checked")) {
            // 当前的商品添加check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块
    // 首先先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框
    $(".increment").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 计算小模块，根据当前文本框的值乘以当前商品的价格，就是商品小计
        // 当前商品的价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    })
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 计算小模块，根据当前文本框的值乘以当前商品的价格，就是商品小计
        // 当前商品的价格p
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    // 4. 用户修改文本框的值，计算小计模块
    $(".itxt").change(function() {
        // 先得到文本框的值乘以当前商品的单价
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; // 计算总件数
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })
})