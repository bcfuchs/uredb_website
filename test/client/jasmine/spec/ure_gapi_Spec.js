describe('ure_gapi unit test',function(){

    var file = "test1.js";
    var data = {a:1,b:2,c:"test"}
    var gapi = ure_gapi;
    var j = function(d) {
	return JSON.stringify(d);
    }
    var check_event = function(signal,cb) {
	$(window).on(signal),function(e,d) {
	    return cb();
	}

    }
    beforeEach(function(){
	
	
    })

    it('return an instance',function(){
	var g = gapi(file);
	expect(typeof g.onSignIn).toEqual('function');
    })
    
    it('save data',function(){

	
    })
    
    it('read data',function(){
	var g = gapi(file);
	g.save(data);

	var success = function(d) { 
	    expect(j(d)).toEqual(j(data));
	}
	// there is no error
	g.read(success,success)

    })

    
    it('on read complete',function(){

	var cb2 = jasmine.createSpy('callback');
	
	var  cb = function() {
	    cb2();
	}
	gapi(file).onReadComplete(cb,file);
	var g = gapi(file);

	g.save(data);

	var success = function(d) {
	}

	var p = new Promise(function(resolve,reject){
	    resolve(g.read(success,success));
	});

	p.then(function(){
	    expect(cb2).toHaveBeenCalled();
	},function(){});
	
    })
    
    it('on read complete -- fail',function(){
	// read should time out
	//	fail();
    })

    // this signal will fire  other methods in other specs.!!!
    it('on sign in',function(){
	
	var cb = jasmine.createSpy('callback');

	var g = gapi(file);
	g.onSignIn(cb);
	
	var signInSignal = function() {
	    console.log("triggered signin");
	    var e = $.Event('ure_gapi_signed_in');
	    $(window).trigger(e);
	    
	}
	var p = new Promise(function(resolve,reject){

	    resolve(signInSignal());
	});

	p.then(function(){
	    expect(cb).toHaveBeenCalled();
	},function(){});

	
    })

    it('on sign in no call',function(){
	
	var cb = jasmine.createSpy('callback');

	var g = gapi(file);
	g.onSignIn(cb);
	
	var signInSignal = function() {
	    console.log("triggered signin");
	    var e = $.Event('ure_gapi_signed_in_wrong');
	    $(window).trigger(e);
	    
	}
	var p = new Promise(function(resolve,reject){

	    resolve(signInSignal());
	});

	p.then(function(){
	    expect(cb).not.toHaveBeenCalled();
	},function(){});

	
    })



});
