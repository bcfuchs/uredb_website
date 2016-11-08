
describe('ure_project integration tests',function(){
    var name = "blabla";
    var proj = name;
    var badname = "";    
    var create = function(n){ ure_projects.create(n)}
    
    beforeEach(function(){
//	ure_projects.delete_all(); // delete all projects and remove current project
	ure_projects.reset();
    })
    
    it('create a project',function(){
	
	ure_projects.create(name)
	expect(ure_projects.get(name)).not.toBeNull();
    })

    it('create a project but empty name',function(){

	expect(function(){ure_projects.create(badname)}).toThrow();
	
    })
    
    it('create a project but undefined',function(){

	expect(function(){ure_projects.create()}).toThrow();
	
    })
    
    
    it('create existing project throws error',function(){

	create(name);
	expect(function(){create(name)}).toThrow();

    })

    it('delete  project then create no  error',function(){


	create(name);	
	ure_projects.remove(name);
	expect(function(){create(name)}).not.toThrow();
    })

    it('create many  projects',function(){
	var max = 100;

	for (var i = 0 ; i < max; i++) {
	    ure_projects.create(name+i);
	}
	expect(ure_projects.list().length).toEqual(max);
    })

    it('create many  projects and delete',function(){
	var max = 100;

	for (var i = 0 ; i < max; i++) {
	    ure_projects.create(name+i);
	    ure_projects['delete'](name+i);
	}
	expect(ure_projects.list().length).toEqual(0);
    });

    it('set/get current project',function(){
	var max = 1;

	for (var i = 0 ; i < max; i++) {
	    var n = name+i;
	    ure_projects.create(n);
	    ure_projects.current(n);
	    expect(ure_projects.current()).toEqual(n)
	    
	}

    })
    
    it('current project isnt set',function(){

	expect(ure_projects.current()).toEqual(null)	    


    })

    it('set and get one item in a project',function(){
	
	var accnum = "1.2.3"
	var item = "some string";
	ure_projects.put(proj,accnum,item);
	var out = ure_projects.get_by_accnum(proj,accnum)
	expect(out[item]).toEqual(1);
	expect(Object.keys(out)[0]).toEqual(item);

    })

    
    it('set and get many items in a project',function(){
	var max = 100;
	create(proj);
	for (var i = 0 ; i < max; i++) {
	    var accnum = "1.2.3"+i
	    var item = "some string"+i; 
	    ure_projects.put(proj,accnum,item);
	    var out = ure_projects.get_by_accnum(proj,accnum)
	    expect(out[item]).toEqual(1);
	}
	
    })
    
    it('set and get many item in a project',function(){

	var max = 100;
	var accnums = [];
	create(proj);
	for (var i = 0 ; i < max; i++) {
	    var accnum = "1.2.3"+i
	    accnums.push(accnum);
	    var item = "some string"+i; 
	    ure_projects.put(proj,accnum,item);

	}
	expect(ure_projects.get_accnums(proj).length).toEqual(accnums.length);
	expect(ure_projects.get_accnums(proj+"a")).toBeNull();;
    })
    it('get by accnum for no project',function(){

	expect(ure_projects.get_by_accnum('','1.2.3')).toBeNull();
    })
        it('get no project',function(){

	expect(ure_projects.get('')).toBeNull();
	})
    
    it('get all',function(){


	var max = 100;

	for (var i = 0 ; i < max; i++) {

	    var n = proj + i;
	    ure_projects.create(n);
	    
	}

	var total = Object.keys(ure_projects.get_all().projects).length;
	expect(total).toEqual(max);
    })
    
    it('no seting for current project',function(){
	create(name);
	ure_projects.current(name);
	expect(ure_projects.current(null)).toBeNull();
	

    })
        
    it('delete all',function(){


	var max = 100;

	for (var i = 0 ; i < max; i++) {

	    var n = proj + i;
	    ure_projects.create(n);
	    
	}
	ure_projects.delete_all();
	var total = Object.keys(ure_projects.get_all().projects).length;
	expect(total).toEqual(0);
    })

    it('reset',function(){

	ure_projects.create(name);
	ure_projects.reset();
	expect(ure_projects.list().length).toEqual(0);
    });    

    it('qs',function(){



    })
});

