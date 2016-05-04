<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     

</head>
<body>
	<style>
.ure_hidden {
	display: none;
}
</style>
	<h3>Options</h3>
	<%
/**

Two kinds of options: application options, set by admin
cutomization options, set by user.

On page request: 

1. Read values of current options from db. 
   -Controller sends all options
   -Page displays only those with ids' in the input fields
   -Page knows type--db does not know. 
   -Page validates via js
2. Put the current vals in each input field. db key field is also input id
	- A safer way to do this would be to put a hashed value into the page and keep
       in flash memory. 

On submit
*/
def options = [];
10.times {
    def name,id,key,value,label,clazz;
    id = "option_"+it;
    value = it;
    clazz = "myoptions-ure tinybox-ure"
    label = "option ${it}"
    name = "option_" +it
    key = name;
    options << [name:name,id:id,key:key,value:value,label:label,clazz:clazz];
}
def opts = [:]
opts.noLeftPane = true;
//pageScope.options = options;
//servletContext.options = options;

 %>
	<div id="options">
		<div class="optionsbox">
			<label for="noLeftPane">Show/Hide Left pane. 
			</label> 
			<input type="text" name="noLeftPane" 
			data-ure-optionsKey="noLeftPane" 
			id="noLeftPane" value="${opts.noLeftPane}" />
		</div>
		<div class="optionsbox">
		<button type="button" class="btn btn-primary" data-toggle="button">Single toggle</button>
		</div>
		<!-- 
		<g:render template="/shared/ure/optionBox" var="t" collection="${options}" />
	 -->
	</div>
	</div>
	<style>
#options .optionsbox {
	width: 85%;
	height: 30px;
	padding: 10px;
	margin: 5px;
	border: 3px dotted white;
	background-color: silver;
	color: #222;
}

#options .optionsbox label {
	width: 30%;
	float: left;
	text-align: right;
	padding-right: 10px;
}

#options .optionsbox input {
	
}
</style>
</body>
</html>