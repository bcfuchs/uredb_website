<style>
.searchbar-col {
	width: 40%;
	margin-left: 8%;
}
</style>
	
<div class="container">
	<div class="row">
        <div class="col-sm-6 col-sm-offset-3 searchbar-col">
            <div id="searchbar_container"> 
            	<form action="/searchable/">
                <div class="input-group stylish-input-group">
                    <input id="searchableFormInput" type="text" 
                    class="form-control"  name="q" placeholder="Explore our collections..." />
                    <input type="hidden" name="max" value="100" id="maxSearchable" />
                     <input type="hidden" name="suggestQuery" value="true" id="suggestQuerySearchable" />
            
                    <span class="input-group-addon">
                        <button class="qs-search" type="submit"  value="go">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>  
                    </span>
                </div>
                </form>
            </div>
        </div>
	</div>
</div>


	