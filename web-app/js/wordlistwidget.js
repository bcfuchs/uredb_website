

 

  /** hide any items that pass tests 
   * 
   * @attr sel  // css selector for els to test , assumes attr data-ure-word contains the word
   * @attr tests // an array of boolean functions to run, if true, then hide el
   */


! function(){

 

  /** run tests on selector
   * 
   * @attr sel  // css selector for els to test , assumes attr data-ure-word contains the word
   * @attr tests // an array of boolean functions to run, if true, then hide el
   */
  var tester = function(sel,get_content,tests){

    $(sel).each(function(){
      var word = get_content(this)
      
      if (word) {
        for (var i in tests) {
          tests[i][0](word)?tests[i][1](this):0;
        } 
       
      }
    })  
  }
  $(document).ready(function(){
  var tests = [
    // test, action
        [(function(w){ return (w === "")?true:false }),(function(el){ $(el).hide()}) ],  // hide blanks
        [(function(w){ return /[0-9\+\?\-]/.exec(w)?true:false }),(function(el){ $(el).hide()}) ],    // hide words with numbers
        [(function(w){ return ($.inArray(w.toLowerCase(),window.stoplist) > -1)?true:false}),(function(el){ $(el).hide()}) ] // hide stop words

               ]
  
  var get_content = function(el){return $(el).attr('data-ure-word');}
  var selector = ".wordcellhead"
  
  tester(selector,get_content,tests);
  $(".wordcellhead").removeClass("hideme");
  
  })
  
  
  
  
}()

/**  simple chart sorter */

! function(){

  var chartsorter = function(chartsel,rowsel,get_sortable,asc) {

    var rows = $(rowsel);

    rows = rows.sort(function(a,b){
      var c = get_sortable(a)
      var d = get_sortable(b)
      if (c > d) {
        return asc?1:-1;
      }
      if (c < d) {

        return asc?-1:1;
      }

      return 0;
    })
    $(chartsel).html(rows);
  }
window.chartsorter = chartsorter
}()