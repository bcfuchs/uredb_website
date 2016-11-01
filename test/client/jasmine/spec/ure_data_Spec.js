


describe('ure_project integration tests',function(){

    beforeEach(function(){
	ure_projects.delete_all(); // delete all projects and remove current project

    })
    
    it('create a project',function(){
	var name = "blabla";
	ure_projects.create(name)
	expect(ure_projects.get(name)).not.toBeNull();
    })

    it('create a project but empty name',function(){
	var name = "";
	expect(function(){ure_projects.create(name)}).toThrow();
	
    })
    it('create a project but undefined',function(){

	expect(function(){ure_projects.create()}).toThrow();
	
    })
    
    
    it('create existing project throws error',function(){
	var name = "blabla2";
	var f = function(n) {ure_projects.create(n)};
	f(name);
	expect(function(){f(name)}).toThrow();
    })
    it('delete  project then create no  error',function(){
	var name = "blabla2";
	var f = function(n) {ure_projects.create(n)};
	f(name);	
	ure_projects.delete(name);
	expect(function(){f(name)}).not.toThrow();
    })

    it('create many  projects',function(){
	var max = 100;
	var name = "blabla";
	for (var i = 0 ; i < max; i++) {
	    ure_projects.create(name+i);
	}
	expect(ure_projects.list().length).toEqual(max);
    })

    it('create many  projects and delete',function(){
	var max = 100;
	var name = "blabla";
	for (var i = 0 ; i < max; i++) {
	    ure_projects.create(name+i);
	    ure_projects.delete(name+i);
	}
	expect(ure_projects.list().length).toEqual(0);
    });

    it('set/get current project',function(){
	var max = 1;
	var name = "blabla";
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

	var proj = "blabla";
	var accnum = "1.2.3"
	var item = "some string";
	ure_projects.put(proj,accnum,item);
	var out = ure_projects.get_by_accnum(proj,accnum)
	expect(out[item]).toEqual(1);
	expect(Object.keys(out)[0]).toEqual(item);

    })

    
    it('set and get many item in a project',function(){

	var proj = "blabla";
	var max = 100;
	ure_projects.create(proj);
	for (var i = 0 ; i < max; i++) {
	    var accnum = "1.2.3"+i
	    var item = "some string"+i; 
	    ure_projects.put(proj,accnum,item);
	    var out = ure_projects.get_by_accnum(proj,accnum)
	    expect(out[item]).toEqual(1);
	}
	
    })
    
    it('set and get many item in a project',function(){

	var proj = "blabla";
	var max = 100;
	var accnums = [];
	ure_projects.create(proj);
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
	var proj = "blabla";
	var max = 100;


	for (var i = 0 ; i < max; i++) {
	    var n = proj + i;
	    ure_projects.create(n);
	    
	}
	console.log(Object.keys(ure_projects.get_all().projects).length);
	expect(Object.keys(ure_projects.get_all().projects).length).toEqual(max);
    })
    it('reset',function(){
	var name = 'wazzup2'

	ure_projects.create(name);
	ure_projects.reset();
	expect(ure_projects.list().length).toEqual(0);
    });    
});


describe('ure_storage test',function(){

    beforeEach(function(){
	ure_storage.clear();
    })


    it('set and get one item',function(){

	var name = 'wazzup2'
	var t = 2;
	ure_storage.set(name,JSON.stringify(t));
	expect(ure_storage.get(name)).toEqual(t);


    })
        it('set  one item but fail to stringify',function(){

	    var name = 'wazzup2'
	    var t = '234a';
	    ure_storage.set(name,t);
	    expect(function(){return ure_storage.get(name)}).toThrow();

    })
    it('get non-ex object',function(){
	
	expect(ure_storage.get("12345")).toEqual(null);

    });
    
    it('set and get one object',function(){

	var name = 'wazzup2'
	var t = {'a':1}
	ure_storage.set(name,JSON.stringify(t));
	var out = ure_storage.get(name);
	expect(out.a).toEqual(t.a);


    })

    it('set and get one object repeatedly',function(){

	var name = 'wazzup2'

	for (var i ; i < 100; i++){
	    var key = 'a'+i
	    var t = {key:i}
	    ure_storage.set(name,JSON.stringify(t));
	    expect(ure_storage.get(name)[key]).toEqual(t.a);
	    ure_storage.remove(name);
	}
    })

    it('isSet? yes',function(){

	var name = 'wazzup'
	var t = {'a':1}
	ure_storage.set(name,JSON.stringify(t));
	expect(
	    ure_storage.isSet(name)
	).toEqual(true);

	

    })

    it('isSet? no',function(){

	var name = 'wazzup'
	var t = {'a':1}
	ure_storage.set(name,JSON.stringify(t));
	expect(
	
		ure_storage.isSet(name+"hey")
	
	).toEqual(false);

	

    })

    it('isSet? no',function(){

	var name = 'wazzup'
	var t = {'a':1}
	ure_storage.set(name,JSON.stringify(t));
	expect(ure_storage.isSet(name+"hey")).toEqual(false);

	

    })
    it('clear-is it Set?',function(){

	var name = 'wazzup'
	var t = {'a':1}
	ure_storage.set(name,JSON.stringify(t));

	ure_storage.remove(name);
	expect(ure_storage.isSet(name)).toEqual(false);

    })

    it('clear? length == 1',function(){


	var name = 'wazzup89'
	var t = {'a':1,'b':2}
	var len = ure_storage.length();
	ure_storage.set(name,JSON.stringify(t));


	expect(ure_storage.length()).toEqual(len+1);

    })
        it('clear? length == 10',function(){

	    var len = ure_storage.length();
	    var name = 'wazzup9'
	    var max =1000
	    var names = [];
	    for (var i = 0; i < max; i++) {
		var t = {'a':1,'b':2}
		var n = name + i
		ure_storage.set(n,JSON.stringify(t));
		names.push(n);
		

	    }
	    expect(ure_storage.length()).toEqual(max+len );
	    names.forEach(function(n){

		ure_storage.remove(n);
	    })
	       expect(ure_storage.length()).toEqual(len);
	})

    it('returns a key',function(){
	var name = 'www';
	ure_storage.set(name,{});
	expect(ure_storage.key(0)).toEqual(name);

    })

    it('returns null for non key',function(){
	
	expect(ure_storage.key(0)).toBeNull();

    })
    it('is empty',function(){
	var name = 'www';
	
	ure_storage.set(name,"");
	expect(ure_storage.isEmpty(name)).toBeTruthy();
    })
    it('is not empty',function(){
	var name = 'www';
	
	ure_storage.set(name,{});
	expect(ure_storage.isEmpty(name)).toBeFalsy();
    })
})

