<g:each in="${rlist.words}" var="word">
<% 
def linktype = "record";

if (type) {
linktype = type;	
}

 %>
<li class="wordcellhead"><a
	href="/${linktype}list/${rlist.f}/${word.encodeAsURL()}">${word}</a></li>
</g:each>
