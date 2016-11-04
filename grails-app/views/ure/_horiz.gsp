<div id="horiz">
	<div id="skipnav">
		<a href="http://www.rdg.ac.uk">
			<img src="${resource(dir:'assets',file:'web-black.gif')}" alt="[ University Home Page ]"
				style="float: left; margin: 0 0 0 0; border: 0;">
		</a>
		<g:render template="/ure/gapi_login"></g:render>
		<a href="http://www.rdg.ac.uk/Ure/index.php">
			<img src="${resource(dir:'images',file:'urelogo1.gif')}" alt="[ Ure Museum Home Page ]"
				style="float: right; margin: 0 0 0 0; border: 0;">
		</a>
		<br style="clear: both;">
		<a name="top"></a>
		<a href="#main" class="skip">[ Skip main navigation menu ]</a>
	</div>
	<div id="top2_nav">
		<h1>Ure Museum Database</h1>
	</div>
	<!-- Start of Breadcrumbs -->
	<nav id="topnav" class="navbar navbar-default">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/">UMDB Home</a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li><a id="navbar-search" href="/search">Search</a></li>
					<li><a id="navbar-browse" href="/fieldlist">Browse</a></li>
					<li><a id="navbar-search" href="/comparanda">Projects</a></li>
					<li><a id="navbar-permissions" href="/permissions">Permissions</a></li>
					<li><a href="http://www.reading.ac.uk/Ure/collection/index.php">About</a></li>
					<li><a id="navbar-urehome" href="http://www.reading.ac.uk/Ure/index.php">Ure Museum Home</a></li>
					<li><a id="navbar-options" href="/options">
							<span class="glyphicon glyphicon-wrench"></span>
						</a></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>
	<!-- End of Breadcrumbs -->
</div>