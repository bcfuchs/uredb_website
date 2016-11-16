

! function() {
 
$(document).ready(function(){
  console.log("setting close iframe")
  $(document).on('click',"#return-to-record",function(){
    $("#iframeOverlay").slideUp(1000,function(){
      $("#externalsite-iframe").hide();
    });
  });

   
  // add the item to the comparanda list
  $(document).on('click',"#add-item",function(){
    
    // add the thumb to the thumb strip
    var thumb_display_sel = "#iframe-thumb"
    var thumb = $("#add-item").data('eu_item').thumb;
    $(thumb_display_sel).append('<img src="'+thumb+'"/>');
    // add data to savable data list
    // TODO -- this should be saved to localstore NOT to DOM. 
    //     --   in  a k/v that saves info for each url. 
    // use the thumb url as the key
    
    var items = $(document).data('eu-items');
    items[thumb] = $("#add-item").data('eu_item');

    // save it to localstorage as well 
    var storage=$.localStorage;
    // init if not yet
    // TODO do this in a real init
    if (! storage.isSet('eu_items'))
      storage.set('eu_items','{}');
    
//    var eu_items_ls = JSON.parse(storage.get('eu_items'));
//    eu_items_ls[thumb] = items[thumb] = $("#add-item").data('eu_item');
//    storage.set('eu_items',JSON.stringify(eu_items_ls));
    
    // NOTE: very important -- these need to be grouped with the comparand !!!
    // add to comparanda strip
    var thumbs = $("#comparanda-thumbs").data('thumbs');
    if (thumbs === undefined) {
      thumbs = {};
    }
    if (! thumbs[thumb]) {
      $("#comparanda-thumbs").append('<img src="'+thumb+'"/>');
      thumbs[thumb] = "";
      $("#comparanda-thumbs").data('thumbs',thumbs);
    }
    
  }
      )
})
}()