<div id="horiz">
	<div id="skipnav">
		<a href="http://www.rdg.ac.uk">
			<img src="${resource(dir:'assets',file:'web-black.gif')}" alt="[ University Home Page ]"
				style="float: left; margin: 0 0 0 0; border: 0;">
		</a>
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
	<div id="breadcrumb-nav" class="ure-nav newpage-breadcrumb">
		<div class="nav-item-left">
			<div id="breadcrumb-items-left" class="nav-item"></div>
			<div id="breadcrumb-items-middle" class="nav-item">
			<%
                def qs
                if (flash.lastQuerystring != null) {
                	qs = "?"+flash.lastQuerystring
                }
                 %>
			<g:if test="${flash.lastURI}">
			<a href="${flash.lastURI +qs}">back</a>
			</g:if>
			</div>
			<div class="nav-links np2-navlinks">
				<div class="nav-item">
					<a id="navbar-home" href="/">Home</a>
				</div>
				<div class="nav-item">
					<a id="navbar-search" href="/search">Search</a>
				</div>
				<div class="nav-item">
					<a id="navbar-browse" href="/fieldlist">Browse</a>
				</div>
				<div class="nav-item">
					<a href="http://www.reading.ac.uk/Ure/collection/index.php">About</a>
				</div>
				<div class="nav-item">
					<a id="navbar-permissions" href="/permissions">Permissions</a>
				</div>
				<div class="nav-item">
					<a id="navbar-urehome" href="http://www.reading.ac.uk/Ure/index.php">Ure Museum Home</a>
				</div>
				<div class="nav-item">
					<a id="navbar-options" href="/options"><span class="glyphicon glyphicon-option-vertical"></span></a>
				</div>
				
			</div>
		</div>
	</div>
	<!-- End of Breadcrumbs -->
</div>