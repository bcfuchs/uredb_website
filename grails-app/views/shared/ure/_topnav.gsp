
<div id="topNavWrap">
	<g:if test="${type == 'editor'}">
			<span class="firsttitle" id="editor-title">Ure Museum Database Editor</span>
		</g:if>	
	<sec:ifLoggedIn>
		
		<span id="loggedin_message">
			Hi! You are logged in as
			<span style="font-weight: bold">
				<sec:loggedInUserInfo field="username" />
			</span>
		</span>
	</sec:ifLoggedIn>

	<% //application.test1 = "heyo" %>
	<ul id="topNav" class="nav2 ">
		<sec:ifLoggedIn>
			<li><sec:ifAnyGranted roles="ROLE_ADMIN">
					<g:if test="${isRecordPage == true}">
						<a href="${createLink( action:'edit',id:recordId,controller:'uremeta')}"> +Edit this page </a>
					</g:if>
				</sec:ifAnyGranted></li>
			<li><a id="ctl00_lv_LoginView_lnk_LogOut" href="/logout">Log Out</a></li>
			<li><a id="ctl00_lv_LoginView_lnk_LogOut" href="/admin">Admin</a></li>
		</sec:ifLoggedIn>
		<li style="float: left; margin-right: 140px"><a id="ctl00_lv_LoginView_lnk_LogOut" href="/">Home</a></li>
	</ul>
</div>
<div class="clearfix"></div>
		<style>
		.firsttitle {
		color: #FFFFCC;
		font-size: 150%;
		padding: 2px 10px 0 0;
		}
		#topNavWrap {
			position: relative; //
			left: 140px;
			float: right;
			width: 100%;
			margin-bottom: 10px;
			font-size: 12px;
			background-color: black;
			color: grey;
			height: 31px;
			padding: 3px 0 0 20px;
		}
		
		#topNavWrap a:hover {
			color: silver;
		}
		
		span#loggedin_message {
			position: relative;
			left: 10px;
		}
		
		ul#topNav {
			position: relative;
			float: right;
			height: 27px;
			padding: 5px 0 0 250px;
			top: -10px;
			font-size: 1em;
			margin: 0em 0px 0px 0em;
		}
		
		ul#topNav li {
			float: left;
			padding: 5px;
			list-style: none;
		}
		
		ul#topNav li a {
			font-size: 0.8em;
			text-decoration: none;
			text-transform: uppercase;
			color: #ff942b;
		}
		
		ul#topNav li a:hover {
			color: #33a0ff;
		}
		</style>