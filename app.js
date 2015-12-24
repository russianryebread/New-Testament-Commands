$(function(){
  $.getJSON('1050_nt_commands.json', function(data){
    $.each(data, function(i, el){
      $.each(el, function(title, list_items){
        var commands = $("#commands");
        commands.append('<h3 class="col-md-6">'+title+'</h3>');
        var list = $('<ol class="list-group col-md-6"></ol>');
        commands.append(list);
        commands.append('<div class="clearfix"></div><hr>');

        $.each(list_items, function(i, list_item){
          var html_class = (localStorage.getItem(list_item)) ? ' list-group-item-success' : '';
          var hide = (localStorage.getItem(list_item)) ? '' : 'hide';
          var list_i = $(list).append('<li class="list-group-item'+html_class+'"><span class="item">'+list_item+'</span><span class="check glyphicon glyphicon-ok '+hide+' pull-right" aria-hidden="true"></span></li>');
          $(list_i).append('');
        });
      });
    });

    $('.list-group-item').click(function(el){
      $(this).toggleClass("list-group-item-success");
      $(this).find('span.check').toggleClass("hide");
      var total = $('.list-group-item').length;
      var count = $('.list-group-item-success').length;
      var percentage = (count / total)*100;
      percentage = Number(Math.round(percentage+'e2')+'e-2')
      $('.count span').html(percentage);

      // persistence
      var key = $(el.target).find('span.item').html();
      if($(el.target).hasClass("list-group-item-success")){
        localStorage.setItem(key, true);
      } else {
        localStorage.removeItem(key);
      }
    });

    $('#reset').click(function(){
      localStorage.clear();
      var li = $(".list-group-item")
      li.removeClass("list-group-item-success");
      $(li).find('span.check').addClass("hide");
    });

  });
});
