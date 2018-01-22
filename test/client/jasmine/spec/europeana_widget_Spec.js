describe('europeana_widget tests',function(){
  
  var pre_init = window.eu_widget_pre_init_funcs;
 

    it('test get_whitelist_providers_facet',function(){
    
      var providers = ["ure museum","british museum"];
      var expected = '&qf=provider_aggregation_edm_dataProvider:%22ure%20museum%22+OR+provider_aggregation_edm_dataProvider:%22british%20museum%22'
      var res = pre_init.get_whitelist_providers_facet(providers);
      expect(res).toEqual(expected);
    });
    
    it('testreset_querycache',function(){
     fail();
    
    });


});
