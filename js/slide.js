// JavaScript Document
$(function(){
    //lazyload
    $("img.lazy").show().lazyload({effect : "fadeIn"});
    $("img.lazy_focus").show().lazyload({event:"lazy_focus", effect : "fadeIn"});
    $('.focus_list li:eq(0) img').trigger("lazy_focus").addClass("complete");

    //轮播动画
    var _AdList = $('.focus_box .focus_list');
    var _listWidth = $('.focus_box .focus_list li:eq(0)').width();
    var _listCount = $('.focus_box .focus_list li').length;
    var _nav = $('.focus_box .focus_nav a');
    var _AdWarp = $('.focus_box');
    var _speed = 500;
    var _wait = 4500;
    var _sue = 0;
    _AdList.css({'width':_listCount*_listWidth});
    var scrollAd = function(sue, speed){
        _AdList.stop().animate({left:-_listWidth*sue}, speed, 'easeInOutQuad');
        _nav.removeClass('oncur').eq(sue).addClass('oncur');
        lazy_focus(sue);
    }
    //scrollAd();
    var scrollAdRun = setInterval(function(){
            _sue++;
            if(_sue == _listCount)_sue = 0;
            scrollAd(_sue, _speed);
        },
        _wait+_speed);

    var lazy_focus = function (s) {
        if(!$('.focus_list li:eq('+s+') img').hasClass("complete")){
            $('.focus_list li:eq('+s+') img').trigger("lazy_focus").addClass("complete");
        }
    }

    _AdWarp.live('mouseleave mouseenter', function(e){
        var type = e.type;
        if(type == 'mouseenter'){
            clearInterval(scrollAdRun);
        }else if(type == 'mouseleave'){
            scrollAdRun = setInterval(function(){
                _sue++;
                if(_sue == _listCount)_sue = 0;
                scrollAd(_sue, _speed);
            }, _wait+_speed);
        }
    })
        .delegate('p.focus_nav a', 'mouseenter', function(e){
            _sue = $(e.target).index();
            var type = e.type;
            _AdList.stop().animate({left:-_listWidth*_sue}, _speed, 'easeInOutQuad');
            _nav.removeClass('oncur').eq(_sue).addClass('oncur');
            lazy_focus(_sue);

        });

    //进度条轮播
    var oSj = 5000;
    var i = 0;
    var btm_bar = $(".carousel_box .btm_bar");
    var oImg = $(".carousel_box .carousel_content");
    var oImg_first= $('.carousel_box .carousel_content li:first').clone();
    oImg.append(oImg_first);
    var imgNum = $(".carousel_box .carousel_content li").size();
    for(var j=1;j<=imgNum-1;j++){
        $('.carousel_box .kong_ul').append('<li></li>');
    }
    $('.carousel_box .kong_ul li:first').addClass('index');
    $(".btn_rt").click(function(){
        int();
    });
    $(".btn_lf").click(function(){
        btm_bar.stop().css('width',0);
        i--;
        if(i == -1){
            $('.carousel_box .carousel_content').css('left',-(imgNum-1)*410);
            i = imgNum-2;
        }
        oImg.stop().animate({left:-i*410},500);
        clearInterval(oTime);
        oTime = setInterval(function(){
            int();
        },oSj);
        btm_barAniMate();
        $(".carousel_box .kong_ul li").eq(i).addClass('index').siblings().removeClass('index');
    });
    //鼠标移动到圆点后轮播
    $(".carousel_box .kong_ul li").hover(function() {
        clearInterval(oTime);
        btm_bar.stop().css('width',0);
        var index = $(this).index();
        i=index;
        oImg.stop().animate({left:-index*410},500);
        btm_bar.stop().css('width',0);
        $(this).addClass('index').siblings().removeClass('index');
    },function(){
        btm_barAniMate();
        oTime = setInterval(function(){
            int();
        },oSj);
    });
    //自动轮播
    var oTime = setInterval(function(){
        int();
    },oSj);
    btm_barAniMate();
    //进度条函数动画效果
    function btm_barAniMate(){
        btm_bar.animate({width:'100%'},oSj,function(){
            $(this).css('width',0);
        });
    };
    //自动轮播函数
    function int(){
        btm_bar.stop().css('width',0);
        i++;
        if(i == imgNum){
            oImg.css('left',0);
            i = 1;
        };
        oImg.stop().animate({left:-i*410},500);
        btm_barAniMate();
        clearInterval(oTime);
        oTime = setInterval(function(){
            int();
        },oSj);
        if(i == imgNum-1){
            $(".carousel_box .kong_ul li").eq(0).addClass('index').siblings().removeClass('index');
        }else{
            $(".carousel_box .kong_ul li").eq(i).addClass('index').siblings().removeClass('index');
        };
    };


    //tab选项卡
    $("ol li").mouseover(function(){
        var index=$("ol li").index(this);
        $(this).addClass("click_on").siblings().removeClass("click_on");
        $(".collapse_center div").eq(index).addClass("select").siblings().removeClass("select")
    });

    //导航选中
    $(".nav a").each(function(){
        $(this).click(function(){
            $(".nav a").removeClass("hover");
            $(this).addClass("hover");
            return false;
        });
    });


    //返回顶部
    if($("meta[name=toTop]").attr("content")=="true"){
        $("<div id='toTop'><i title='返回顶部' class='iconfont icon-top'></i></div>").appendTo('body');
        $("#toTop").css({
            width: '50px',
            height: '50px',
            bottom:'50px',
            right:'150px',
            position:'fixed',
            cursor:'pointer',
            zIndex:'999999'
        });
        if($(this).scrollTop()==0){
            $("#toTop").hide();
        }
        $(window).scroll(function(event) {
            /* Act on the event */
            if($(this).scrollTop()==0){
                $("#toTop").hide();
            }
            if($(this).scrollTop()!=0){
                $("#toTop").show();
            }
        });
        $("#toTop").click(function(event) {
            /* Act on the event */
            $("html,body").animate({
                    scrollTop:"0px"},
                666
            )
        });
    }
});