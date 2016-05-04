<%@ page import="grails.converters.*"%>
<div id="wordmap-widget" class="${klass }">
 

<!--  show a clickable graph of most words  -->


<div class="binstat-chart"></div>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js"></script>
<script>

var bar = function(data,vals) {

var color = d3.scale.category10();

var rangeMax = 1000;
var x = d3.scale.linear()
    .domain([0, d3.max(vals)])
    .range([0, rangeMax]);
var path = window.location.pathname.replace("fieldlist","recordlist");
d3.select(".binstat-chart")
  .selectAll("div")
    .data(domain)
  .enter().append("div")
    .attr("data-tracker-next",function(d) { return path + "/" + d})
    .style("background", function(d) { return color(d) })
    .style("width", function(d) { return x(data[d]) + "px"; })
    
    .text(function(d) { return d + " " +data[d]; });

// now set the links

$('.binstat-chart > div').each(function(k,v) { 
    var url = $(v).attr('data-tracker-next');
    $(v).css({'cursor':'pointer'});
    $(v).click(function(e) {
        location.href = url

      });
});

}

// make the data
var data =  [];
var vals = [];
var domain  = [];
var words = <% print wordcount as JSON %>;
var max = ${max};
var makeSortedList = function(words,tests,max) {
	// get the top 20
	var sortable = []
	for (var w in words) {
	  var OK = true
	  for (var i in tests) {
		 	if (tests[i](w)) {
		 		OK = false
		 	}
	  	}
		if (OK) {
		  sortable.push([w,words[w]])
		}
		else {
		// console.log(w +": failed " + i)
			}
		}	
	return sortable.sort(function(a, b) {return b[1] - a[1]}).slice(0,max)
	}  // var makeSortedList = function(words,tests,max) {

var tests = [
			(function(w){ return /[0-9\+\?\-]/.exec(w)?true:false }),   // remove words with numbers
			(function(w){ return (window.stoplist.indexOf(w.toLowerCase()) > -1)?true:false})  // remove stop words

             ]
var sorted = makeSortedList(words,tests,max)


for (var i  in sorted) {
  var item = sorted[i]
  var w = item[0];
  var v = item[1]
  console.log(item)
	data[w] = v
	vals.push(v)
	domain.push(w)
	
}




  bar(data,vals,domain)

</script>
<style>

.binstat-chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
}

</style>
</div>