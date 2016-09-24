! function() {
  
  var toggler = function(clickSel,showSel) {

    $(clickSel).css({cursor:'pointer'})
        
    $('[data-toggler-target="'+showSel+'"]').toggleClass("list-toggler-item-on")
    var togglelist = []
    $(clickSel).each(function(){
      togglelist.push($(this).attr('data-toggler-target'))
    });
    
    var targetSel = togglelist.join(",")  
    $(targetSel).hide();
    $(showSel).show();
    
    $(clickSel).click(function(){
      var target = $(this).attr('data-toggler-target');
      $(clickSel).removeClass('list-toggler-item-on');
      $(this).toggleClass("list-toggler-item-on")
      
      $(targetSel).hide();
      $(target).show();
      
    })

    }
  $(document).ready(function(){
    toggler(".list-toggler-item ","#wordlistwidget-container")
    })

  
  
  
} ()