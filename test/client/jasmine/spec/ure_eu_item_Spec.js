
describe('ure_eu_item unit  tests', function() {
  var eu = ure_eu_items;
  var accnum = '1.2.3';
  var non_accnum = '1.2.3a';
  var url = 'http://hi.there'
  var thumb = url;
  var eu_id = "http://some_eu_url";
  var meta = {
    "guid" : "a",
    "provider" : "b",
    "ure_accnum" : accnum,
    "thumb" : "c",
    "link" : "d"
  };

  var create_one = function() {
    return eu.create(accnum, url);
  }

  beforeEach(function() {
    eu.reset(); // delete all projects and remove current project

  })
  it('create one', function() {
    expect(create_one()).toBeTruthy();

  });
  it('create fail', function() {
    create_one();
    expect(create_one()).toBeFalsy();

  });
  it('get one', function() {
    create_one();
    var out = eu.get(accnum);
    expect(eu.get(accnum).thumb).toEqual(url);
  });

  it('get one wrong', function() {
    create_one();
    expect(eu.get(non_accnum)).toBeNull();

  });
  it('get random', function() {
    create_one();
    expect(eu.random().thumb).toEqual(url);
    ;
  });

  it('put one good one', function() {
    var accnum = '1.2.3';

    create_one();
    var out = eu.put(accnum, eu_id, meta)
    expect(out).toBeTruthy();

  });

  it('put one when item doesnt exist', function() {
    var accnum = '1.2.3';
    var eu_id = "123";
    var out = eu.put(accnum, eu_id, meta)
    expect(out).toBeFalsy();

  });

  it('put one with bad meta', function() {
    var accnum = '1.2.3';
    var eu_id = "123";
    expect(function() {
      eu.put(accnum, eu_id, "123")
    }).toThrowError(TypeError);
    ;

  });
  it('put one with no eu_id', function() {
    var accnum = '1.2.3';
    var eu_id = null;
    expect(function() {
      eu.put(accnum, eu_id, "123")
    }).toThrowError(TypeError);
    

  });
  it('put one with no eu_id', function() {
    var accnum = '1.2.3';
    var eu_id;
    expect(function() {
      eu.put(accnum, eu_id, "123")
    }).toThrowError(Error);
    ;

  });

  it('list eu_items', function() {
    create_one();
    expect(eu.list().length).toEqual(1);

  });
  it('get thumb for accnum', function() {
    create_one();
    expect(eu.get_thumb_for_accnum(accnum)).toEqual(url);

  });
  it('get thumb ! accnum', function() {
    create_one();
    expect(eu.get_thumb_for_accnum(non_accnum)).toBeNull();

  });

  it('get accnums for eupic-create one then get index value', function() {
    create_one();
    eu.put(accnum, eu_id, meta);
    expect(eu.get_accnums_for_eupic(eu_id).length).toEqual(1);
  });

  it('get accnums for eupic bad accnum', function() {
    create_one();
    eu.put(accnum, eu_id, meta);
    var bad_eu_id = eu_id + eu_id;
    expect(eu.get_accnums_for_eupic(bad_eu_id)).toBeNull();
  });

  it('get all the data', function() {
    expect(('eu_items' in eu.data())).toBeTruthy();
  });

  it('reset', function() {
    var url = 'http://hi.there'
    var accnum = '1.2.3';
    eu.create(accnum, url);
    eu.reset();
    expect(Object.keys(eu.get_all()).length).toEqual(0);
  });

});
