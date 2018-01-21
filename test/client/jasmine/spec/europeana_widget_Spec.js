describe('europeana_widget tests',function(){
  var pre_init = window.eu_widget_pre_init_funcs;
  console.log(pre_init)
    it('test get_whitelist_providers_facet',function(){
    
      var providers = ["ure museum","british museum"];
      var res = pre_init.get_whitelist_providers_facet(providers);
      console.log(res)
      fail(res);
    });
    
    it('testreset_querycache',function(){
     expect(1).toEqual(1)
    
    });


});
