!function() {
  // highlight string $w in text within a breadth of $breadth
  var highlight_context = function(sel,w,field,contentsel,breadth) {


  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'gi'), replacement);
  };
  
  var complete = function(d,loadIntoSel) {

          var t = d.text();
          var index = t.search(w.toLowerCase());
          console.log(w + ' ' + index + " "+ start)
          console.log(loadIntoSel)
          var start = index - breadth;
          if (start < 0  ) { start = 0 }
          var end = index + breadth;;
          if (end > t.length  ) { end = t.length }
          var ss = t.substring(start,end);
    console.log(ss)
          $(loadIntoSel).html(ss.replaceAll(w,'&rarr; <span class="kw-highlight" style="font-weight:bold">'+w+'</span> &larr;'))
   }

  
   $(sel).each(function(){
      var data = $(this).find(contentsel);
     
      complete(data,data);
   });
  }
  $(document).ready(function(){
  var breadth = 80;
  var sel = ".fieldlist-row"
    var contentsel = ".context-col";
    var w = $("#kw-span").text(); // where is the word? 
    var field = $("#field-span").text(); 
    // sel = container
    // contentsel = where content is within container
    // w - word
    // field - field
    // breadth -- chars on either side of first match.     
    highlight_context(sel,w,field,contentsel,breadth);
  })
  
}()
