
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
		