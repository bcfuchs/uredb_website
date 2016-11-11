
<r:script>
// NOTE: do not refactor to pure js-- this needs to set session vars. 
;
! function(){
		// set global js vars for highlighting text
		uredb_matcher_hasMatch = false;
		<g:if test="${session.uredb_hasMatch}">
			uredb_matcher_matchfield = "${session.uredb_matchfield}";
			uredb_matcher_matchval = "${session.uredb_matchval}";
			uredb_matcher_hasMatch = true;
		</g:if>		
		<%
		// now set hasMatch to false so a match is displayed only when there's actually a match. 
		session.uredb_hasMatch  = false;
		%>
		$(document).ready(function(){
		 // save data about this object to the DOM
		 $(document).data('ure-item',{accnum:'${accnum}'});
		 $(document).data('eu-items',{})
		
		// add an item to menubar
		  	$("#breadcrumb-items-left").html('<a href="/fieldlist/accession_number">objects</a> > ${accnum}');
		  	$("#breadcrumb-items-left").css("margin-left","-85px")
  
		})
		}()
	</r:script>