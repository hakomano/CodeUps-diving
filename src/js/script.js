
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


  //========================================================*
  // ハンバーガーメニュー(フェードイン・アウト)
  //========================================================*
  $(function () {
    $(".js-hamburger").on("click", function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        openDrawer();
      } else {
        closeDrawer();
      }
    });

    // backgroundまたはページ内リンクをクリックで閉じる
    $(".js-drawer a[href]").on("click", function () {
      closeDrawer();
    });

    // resizeイベント
    $(window).on('resize', function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeDrawer();
      }
    });
  });

  function openDrawer() {
    $(".js-drawer").fadeIn();
    $(".js-hamburger").addClass("is-open");
  }

  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-hamburger").removeClass("is-open");
  }

  //========================================================*
  // ページトップボタン処理(フッター手前で止まる)
  //========================================================*
  $(function (){
    const pageTop = $(".js-page-top");

    //トップへ戻るボタンのクリックイベント
    // pageTop.on("click", scrollTop);
    $(window).on("scroll", function() {
      btnScrollEvent();
      btnPosition();
    });

    //ページトップへスムーススクロールする
    pageTop.click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500 //スクロールの速さを変える場合はここ
      );
      return false;
    });

    //700pxスクロールしたらボタンを表示・非表示
    function btnScrollEvent() {
      if ($(window).scrollTop() > 700) {
        pageTop.fadeIn(); // 700px以上スクロールしたら表示
      } else {
        pageTop.fadeOut(); //スクロールが700px以下の場合、非表示
      }
    }

    //フッター手前での処理(ボタンはフッターより上で止まる)
    function btnPosition() {
      const scrollHeight = $(document).height();
      const scrollPosition = $(window).height() + $(window).scrollTop();
      const footHeight = $("footer").outerHeight();

      if (scrollHeight - scrollPosition <= footHeight && window.matchMedia("(max-width: 768px)").matches) {
        pageTop.css({
          position: "absolute",
          bottom: footHeight + 16 + "px" //フッター手前のsp時
        });
      } else if (scrollHeight - scrollPosition <= footHeight && window.matchMedia("(min-width: 767px)").matches) {
        pageTop.css({
          position: "absolute",
          bottom: footHeight + 20 + "px" //フッター手前のpc時
        });
      } else if(window.matchMedia("(max-width: 768px)").matches) {
        pageTop.css({
          position: "fixed",
          bottom: 16 + "px" //sp時
        });
      } else if(window.matchMedia("(min-width: 767px)").matches) {
        pageTop.css({
          position: "fixed",
          bottom: 20 + "px" //pc時
        });
      }
    }
  });

  //========================================================*
  // 画面サイズが変わったときに高さを更新する(100vh対応)
  //========================================================*
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  //========================================================*
  // ファーストビュースライダー(swiper)
  //========================================================*
  const fvSwiper = new Swiper(".js-fv-swiper", {
    loop: true,//無限ループさせる
    speed: 2000,//スライド切替アニメーションのスピードを指定(ミリ秒)
    // effect: "fade", //フェード切替の場合はこれ
    // fadeEffect: {
    //     crossFade: true,
    // },
    autoplay: {
        delay: 3000,//次のスライドに切り替わるまでの時間を指定（ミリ秒）
        disableOnInteraction: false,//ユーザーが操作時に自動再生止めない
    },
  });

  //========================================================*
  // 背景色の後に画像やテキストが表示されるエフェクトアニメーション
  //========================================================*
  //要素の取得とスピードの設定
  var box = $('.colorbox'),
  speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
        if(counter == 0){
          $(this).delay(200).animate({'width':'100%'},speed,function(){
            image.css('opacity','1');
            $(this).css({'left':'0' , 'right':'auto'});
            $(this).animate({'width':'0%'},speed);
          })
          counter = 1;
        }
    });
  });

  //========================================================*
  // フッター表示されたら追従ヘッダーを非表示
  //========================================================*
  $(".footer").on('inview', function(event, isInViewHeader){
    if (isInViewHeader) {
      $(".js-header").fadeOut();
    } else {
      $(".js-header").fadeIn();
    }
  })


});
