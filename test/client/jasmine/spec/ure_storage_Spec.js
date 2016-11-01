
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
        it('set one item but forget to stringify',function(){

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

