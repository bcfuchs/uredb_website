
<% 
// IN->name,id,key,value,label,clazz

%>

<div class="optionsbox ${t.clazz}">
	<label for="${t.id}">
		${t.label}
	</label> 
	<input type="text" name="${t.name}" 
	data-ure-optionsKey="${t.key}" id="${t.id}" value="${t.value}" />
</div>