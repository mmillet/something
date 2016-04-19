function init() {
  //var $ = window.$;
  const AJAX_TIME_REQUEST_URL = '/mall/ajax/gettime';
  var serverTimeNow = Date.now(),
      serverTimeStart = (function() {
        var spans = $('.activity-time > span');
        return new Date('2016-' +
          $(spans[0]).text() + '-' +
          $(spans[1]).text() + ' ' +
          $(spans[2]).text().trim()).getTime()
      }());

  function bindClickOnce() {
    setTimeout(function() {
        $('#J-activity-btn').click();
    }, 500);
    var timeOffset = serverTimeStart - serverTimeNow;
    var $tips = $(`<div style="color:red;text-align: center">请输入验证码后，保持该页面，验证码每隔几分钟请刷新一次防止过期。
      <br/><i>${timeOffset}</i> 毫秒后将自动提交</div>`);

    setTimeout(function() {
      $('#ui-id-1').after($tips);
      var cnt = 0;
      setInterval(function() {
        $tips.find('i').text(timeOffset - ((++cnt) * 250) );
      }, 250);
      setTimeout(function() {
        $('#ui-id-1').siblings('.ui-dialog-buttonpane').find('.ok-btn').click();
      }, timeOffset);
    }, 2000);
    bindClickOnce = null;
  }

  $.ajaxSetup({
    dataFilter: function(data, type) {
      console.log(data);
      if(new RegExp(AJAX_TIME_REQUEST_URL).test(this.url)) {
        data = data.replace(/("data": \{"time":)(\d{10})/, function($0, $1, $2) {
          serverTimeNow = parseInt($2 + '000');
          return $1 + parseInt((serverTimeStart / 1000));
        });
        bindClickOnce && bindClickOnce();
      }
      return data;
    }
  });
}
setTimeout(function() {
  if(/fck/.test(window.location.href)) {
    console.log('Fck baidu lvyou miaosha...');
    init();
  }
}, 2000);

//document.addEventListener('click', function(event) {
//  console.log(event);
//});

console.log(window, document, chrome, this, $("#body"));