<%@ page import="org.ac.uk.reading.ure.uredb.Uremeta"%>
<h2>Create record</h2>

<%
                        def names = grailsApplication.getDomainClass('org.ac.uk.reading.ure.uredb.Uremeta').persistentProperties.collect { it.name }
                            
          // need to sccoiate a validation method with each of these-- or handle in domain object
    
                            
                             %>
<table class="recfields">
	<g:each in="${names}" var="item">
	<tr>
		<td class="reccellhead"><b>
					${item}
				</b></td>
		<td class="reccellcontent"><input id="rec_${item}"  type="text"></input></td>
	</tr>

	</g:each>
</table>
