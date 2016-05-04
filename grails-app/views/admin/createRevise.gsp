<%@ page import="org.ac.uk.reading.ure.uredb.*"%>
<html>
<head>
<meta name="layout" content="ure/editor" />
</head>
<body>
	<div id="content" class="createRevise">
		<div id="session-msg">
			Hello
			<sec:loggedInUserInfo field="username" />
			<br> <br>What would you like to do? <br> <br> <br>
		</div>
		<div class="clearboth"></div>
		<style>
</style>
		<div id="options">
			<ul>
				<li><a href="/uremeta/create">Create a new record</a></li>
				<li><a href="/admin/revise">Revise an existing record</a></li>
			</ul>
		</div>
	</div>
</body>
</html>
