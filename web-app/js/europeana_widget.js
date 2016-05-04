! function() {
  var makeGrid = function(gridid,width,height,displayInfobox,wallWidth){
  // START
  
 var storage,cellSelector,blacklist_store,providerBlacklist,providerBlacklistThreshold,
 providerBlacklist_store;
 
 blacklist_store = "vote"
 providerBlacklist_store = "providerBlacklist"
 
 providerBlacklistThreshold = 1;
 cellSelector = gridid + " .cell";
 storage = $.localStorage;
 if (storage.isSet(providerBlacklist_store)) {
   providerBlacklist = storage.get(providerBlacklist_store);
 }
 else {
   providerBlacklist = storage.set(providerBlacklist_store,{}); 
 }
 //remove blacklisted items
 if (storage.isSet(blacklist_store)) {
   var vote = storage.get(blacklist_store);
  
   $(cellSelector).each(function(k,v){
     var id = $(this).attr('data-ure-image-url');
     var provider = $(this).attr('data-eu-provider');
    if (id in vote) {
      $(this).remove();
    }
    else {
      storage.set(blacklist_store,{})
    
    }
    
 
      if (provider in providerBlacklist 
          && providerBlacklist[provider] > providerBlacklistThreshold) {
        // remove item
          $(this).remove();
       // remove filter in provider checklist
          console.log($('[data-eu-provider-list="'+provider+'"]'));
          console.log(provider);
          $('[data-eu-provider-list="'+provider+'"]').remove();
          
      
      }
    
    
   })
 }
 
 //build the grid. 
 var wall = new Freewall(gridid);
             wall.reset({
               selector : '.cell',
               delay: 25,
               animate : true,
               cellW : width,
               cellH : height,
               onResize : function() {
                 wall.refresh();
               }
             });
             wall.fitWidth(wallWidth);
             // for scroll bar appear;
             $(window).trigger("resize");
              
             $(gridid).delay(3000).show();

          // show the infobox on hover
            
             if (displayInfobox === true) {
            $(cellSelector).hover(function(){ $(this).find(".image-infobox").toggleClass("hide-infodiv")});
             }
         $(cellSelector).css("cursor","pointer");

         // click on image pops to overlay
        var overlayHandler = function() {
             var url = $(this).attr("data-eu-link");
            $("#externalsite-iframe").attr('src',url);
          
          $("#iframeOverlay").slideDown(1000);
           $("#externalsite-iframe").load(function(){
              $("#externalsite-iframe").fadeIn(1000);
           });
           // add data to the add-item button
           var eu_link= $(this).attr("data-eu-link");
           var thumb= $(this).attr("data-ure-image-url");
           var guid= $(this).attr("data-eu-guid");
           var eu_item = {
              link:eu_link,
              thumb:thumb,
              ure_accnum:$(document).ure_accnum,
              guid:guid
                  }
        // add data about this object to the add-item button in the overlay
        
           $("#add-item").data('eu_item',eu_item);
        } 
  $(cellSelector).bind('click',overlayHandler);
  window.wall = wall
  window.overlayHandler = overlayHandler
// END
  } 
window.europeanaWidget_makeGrid = makeGrid;  

/** relevance voting 
 * 
 * voteSetup
 *
 * put a vote button on each -- when pressed , disappears
 * problem: need to turn off overlay click. 
 * problem: image selection is currently done on server! server needs to send pure json
 */

var voteSetup = function(itemSelector,toggleSelector) {
  // START voteSetup
  var voteHandler,store;
  
    storage = $.localStorage;
    // create vote object if not present
    if (!(storage.isSet('vote'))) {
      storage.set('vote',{})
    }
    if (!(storage.isSet('providerBlacklist'))) {
      console.log("setting providerBlacklist...")
      storage.set('providerBlacklist',{})
      }
  // START vote
var vote = function(divs) {
    var votebutton = '<button class="voterbtn btn btn-sm btn-success">x</button>' 
// overlay a click button
    $(divs).each(function(k,v){
    $(v).append(votebutton)
    })
    
 // remove the overlay click function
   $(itemSelector).unbind('click',window.overlayHandler)
//  Vote handler
  voteHandler = function(){
    $(this).toggleClass('btn-success').toggleClass('btn-danger')
    var v = storage.get('vote');
    var providerBlacklist = storage.get('providerBlacklist');
    var item = $(this).parent().attr('data-ure-image-url');
    var provider = $(this).parent().attr('data-eu-provider');
   
    console.log($(this).parent());
    if ($(this).hasClass('btn-danger')) {
      // add to blacklist
        v[item] = ""
        if (provider in providerBlacklist) {
          providerBlacklist[provider] += 1
        }
        else {
          providerBlacklist[provider] = 1
        }
      
      }
    else {
      // remove from blacklist
      if (item in v) {
        delete v[item];
        }
      if (provider in providerBlacklist) {
        providerBlacklist[provider] > 1? 
              providerBlacklist[provider] -= 1: delete providerBlacklist[provider]
      }
    
      
      }
    storage.set('vote',v);
    storage.set('providerBlacklist',providerBlacklist);
    window.testV = v;
    }
  
  $(document).on('click','.voterbtn',voteHandler) 
  // END vote
  } // vote = function(divs)


// link to toggle voting

$(document).on('click',toggleSelector,function(){
  var sw = $(this).attr('data-relevance-toggle');
  if (sw === 'off') {
    vote(itemSelector);
    $(this).attr('data-relevance-toggle','on');
  }
  else {
    $(itemSelector).unbind('click',voteHandler)
    $('.voterbtn').remove();
    $(itemSelector).bind('click',window.overlayHandler)
    $(this).attr('data-relevance-toggle','off');

    }
  
  })
}
window.europeanaWidget_voteSetup = voteSetup
} ()
