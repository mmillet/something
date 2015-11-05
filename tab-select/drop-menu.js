"use strict";
(function($) {
  var _init = function($this, options) {
    var data = options.data;
    var width = /^\d+$/g.test(options.width) ? (options.width + 'px'): options.width;
    var isGroupData = $.isArray(data);


    var marginTop = isGroupData? (($this.height()+2)+"px") : ("2px");

    $this.wrap('<span class="drop-menu-wrapper"></span>');
    var $container = $this.parent();
    var content = '<div class="drop-menu" style="width: ' + width + ';margin-top:' + marginTop + ';">';
    var _makeItems = function(items) {
      var str = "";
      $.each(items, function(itemIndex, item) {
        str += '<li class="drop-menu-item" data-dropmenuk="' + item.key + '">' + item.value + '</li>';
      });
      return str;
    };

    if(isGroupData) {
      content += '<div class="drop-menu-tab-title-wrapper">';
      $.each(data, function(tabIndex, tab) {
        content += '<h3 class="drop-menu-tab-title' + (tabIndex==0?' current':'') + '">' + (tab.title || "") + '</h3>';
      });
      content += '</div>';
      content += '<div class="drop-menu-tab-content-wrapper">';
      $.each(data, function (tabIndex, tab) {
        content += '<ul class="drop-menu-tab-content' + (tabIndex == 0 ? ' current' : '') + '">';
        content += _makeItems(tab.items);
        content += '</ul>';
      });
      content += '</div>';
    } else {
      content += '<div class="drop-menu-tab-content-wrapper">';
      content += '<ul class="drop-menu-tab-content current">';
      content += _makeItems(data.items);
      content += '</ul></div>';
    }

    content += '</div>';

    var $content = $(content);
    $container.append($content);
    return $content;
  }

  var _bindEvent = function($this, $content, options) {
    $this.on("click", function(e) {
      $content.toggleClass("open");
      setTimeout(function() {
        if($content.is(":visible")) {
          $(window.document).one("click", function(e) {
            if($(e.target) != $this) {
              $content.removeClass("open");
            }
          });
        }
      }, 10);
    });

    $content.on("click", ".drop-menu-tab-title", function(e) {
      var _$this = $(this);
      _$this.siblings(".drop-menu-tab-title").removeClass("current");
      _$this.addClass("current");
      $content.find(".drop-menu-tab-content").removeClass("current").eq(_$this.index()).addClass("current");
      e.stopPropagation();
    });

    $content.on("click", ".drop-menu-item", function() {
      var _$this = $(this);
      $content.find(".drop-menu-item").removeClass("current");
      _$this.addClass("current");
      if(typeof options.change == "function") {
        options.change.call(null, $(this).data("dropmenuk"));
      }
    });
  };

  var commands = {
    hide: function() {
      this.$content.removeClass("open");
    },
    show: function() {
      this.$content.addClass("open");
    },
    destroy: function() { //销毁
      this.$content.remove();
      this.$this.unwrap();
    },
    //可以在这里添加自己的方法...
    testCommmand: function(data) {
      console.log("testCommmand", data);
    }
  };

  $.extend($.fn, {
    dropMenu: function(options) {
      var $this = $(this); //保存自身
      var $content; //保存弹出框
      if(options === undefined || typeof options == "object") { //初始化逻辑
        options = options || {};
        options.data = options.data || {}; //数据
        options.width = options.width || 200; //默认宽度200
        if(!$this.data("tabSelectInited")) {
          $content = _init($this, options);
          $this.data("tabSelectInited", true);
          _bindEvent($this, $content, options);
        }
      } else if(typeof options == "string") { //命令逻辑
        $content = $this.next(".drop-menu");
        if(commands.hasOwnProperty(options)) {
          var args = Array.prototype.slice.call(arguments, 1);
          commands[options].apply({
            "$this": $this,
            "$content": $content
          }, args);
        } else {
          throw("tabMenu hasn`t the command:" + options + " yet");
        }
      }
      return $this; //链式返回
    }
  });
}(jQuery, window));