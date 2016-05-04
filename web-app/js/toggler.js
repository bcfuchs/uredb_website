! function() {
  
  var toggler = function(clickSel,showSel) {

    $(clickSel).css({cursor:'pointer'})
    $('[data-toggler-target="'+showSel+'"]')
      .css({'text-decoration':'underline'});
    
    var togglelist = []
    $(clickSel).each(function(){
      togglelist.push($(this).attr('data-toggler-target'))
    });
    
    var targetSel = togglelist.join(",")  
    $(targetSel).hide();
    $(showSel).show();
    
    $(clickSel).click(function(){
      var target = $(this).attr('data-toggler-target');
      $(clickSel).css({'text-decoration':'none'})
      $(this).css({'text-decoration':'underline'});
      $(targetSel).hide();
      $(target).show();
      
    })

    }
  $(document).ready(function(){
    toggler(".list-toggler ","#wordlistwidget-container")
    })

  
  
  
} ()