

            <div id="searchbar_container_small" class="searchbar_small" > 
            	<form action="/searchable/">
                <div class="input-group stylish-input-group">
                	
                    <input id="searchableForm" type="text" 
                    class="form-control"  name="q" placeholder="Explore our collections..." />
                    <input type="hidden" name="max" value="100" id="max" />
                     <input type="hidden" name="suggestQuery" value="true" id="suggestQuery" />
            
                    <span class="input-group-addon">
                        <button id="qs-search" type="submit"  value="go">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>  
                    </span>
                </div>
                </form>
            </div>
  
		
<style>

.stylish-input-group .input-group-addon{
    background: white !important; 
    padding: 0 !important;
}
.stylish-input-group .form-control{
	border-right:0; 
	box-shadow:0 0 0; 
	border-color:#ccc;
}
.stylish-input-group button{
    border:0;
    background:transparent;
}

</style>		