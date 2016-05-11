<html>
<head>
<title>Ure Museum Database</title>
<meta name="layout" content="ure/main" />     
</head>
<body>
	<div id="toprow-reclist2" class="container">
		<div class="row">
			<div class="col-md-5">
				<%
				def f_orig = f;
   				 def fa  = g.message(code:"uredb.labels.uremeta."+f);
   				 if (!(fa ==~ /uredb.labels.uremeta.*/)) { f = fa }
   				 // quick fix in case the label isnt in i18n
   					 f = (f =~ /_/).replaceAll(" ").capitalize();
 			 %>
				<div class="page_title_1">
					Records containing "${val}" in field "${f}"
				</div>
			</div>
			<div class="col-md-2">
			 <span class="glyphicon glyphicon-arrow-up"> <a href="/fieldlist/${f_orig}">${f}</a></span>
			</div>
			<div class="col-md-3">
				<g:render template="/taglibTemplates/gridToggler" model="[listid:'field-listview',gridid:'field-gridview']"></g:render>
			</div>
			<div class="col-md-2"></div>
		</div>
	</div>
	<div id="field-listview">
		<g:render template="/taglibTemplates/listWidget" model="[recs:rlist,context:context,word:val,field:f]"></g:render>
	</div>
	<div id="field-gridview">
		<div class="container">
			<div class="row">
				<div class="col-md-9">
					<ure:gridWidgetForAccessionNumbers gridid="tokenlist-grid" klass="testwidget" accs="${rlist}"
						displayAccessionNumber="true" displayInfobox="false" height="100px" width="100px" searchLimit="96" 
						addCellClick="true">
					</ure:gridWidgetForAccessionNumbers>
				</div>
				<div class="col-md-3"></div>
			</div>
		</div>
	</div>
</body>
<html>