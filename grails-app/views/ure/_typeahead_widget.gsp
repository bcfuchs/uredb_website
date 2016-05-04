<script>
// from http://jsfiddle.net/giorgitbs/52aK9/1/
! function() {

    var typeahead = function (filterboxSelector,filterclass,get_text) {
		
        $(filterboxSelector).keyup(function () {   // id of input box

            var rex = new RegExp($(this).val(), 'i');
            $(filterclass).hide();  // decorate tbody with searchable-typeahead
            $(filterclass).filter(function () {
                return rex.test(get_text(this));
            }).show();

        })

    }
    
$(document).ready(function () {
  var filterboxSelector = "#filter";
  var filterclass = "${filterclass}"
  var get_text = function(el){return $(el).attr('data-ure-word')}
  typeahead(filterboxSelector,filterclass,get_text);
});
}()
</script>
<input id="filter" type="text" class="form-control" placeholder="Type here...">