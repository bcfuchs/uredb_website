package org.ac.uk.reading.ure.uredb

class Media {
	
  
	String type;
	String resource_id; // the legacy identifier = src;
	String uri_local; //full uri to the dir of the resource -- we may need more if it's not local,
    //  e.g. http://uredb.reading.ac.uk/ure/pixdir/2007.56c
	String uri;    // filename e.g. 2007.56.0119.jpg
	String dir; // 2007.03e
	String caption;
	String description;
    static belongsTo = Uremeta;
    static constraints = {
		type(inList:['image','video','audio']) // why not use mimetype
		caption(blank:true,nullable:true);
		dir(blank:true,nullable:true);
		description(blank:true,nullable:true);
		resource_id(blank:true,nullable:true);
    }
    static searchable ={
        
        description: spellCheck 'include'
        caption: spellCheck 'include'
    }
	static mapping = {
		description type:"text";
		caption type: "text";
		type type: "text"
	}
}
