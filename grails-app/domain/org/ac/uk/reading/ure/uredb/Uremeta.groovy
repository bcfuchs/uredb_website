package org.ac.uk.reading.ure.uredb
// Note for dynamic validation, we can use custom validator with a file (basically a closure).
// http://grails.1312388.n4.nabble.com/Dynamic-inList-constraints-td2279264.html
// http://www.grails.org/doc/latest/ref/Constraints/validator.html

class Uremeta {
	//TODO we should probably not indicate a relation here
	String accession_number
	String shape    // inList
	String shape_details
	String material    // 1-to-many
	String fabric      // inList
	String fabric_description
	String munsell_color  // inList
	String description    // decoration
	String inscriptions
	String condition_object
	String technique   // 1-to-many
	String provenience
    String short_title
	String acquisition
	String period  // inList
	String date  // the legacy date field -- this is normally a range of BC/AD years

	Date daterange_start; // the new date field  -- these should be absolute dates.
	Date daterange_end; // the new date filed
	String daterange_type; // approximate etc.

	String dating; // legacy
	String dating_details
	String artist     //one-to-many
	// NOTE: artist attribution can be disputed ! Also, there can be groups of artists

	String attribution // currently a text_field with discussion -- should go into artist_details, with structured data.
	// String image  // replaced by Media
	String comparanda
	String comments
	String bibliography
	String archive_ref
	String beazley_db
	String height
	String diameters
	String handle_height
	String other_dims
	String location  // inList -- legacy from old db
	Geolocation geolocation;
	String edited_by  // get from user auth
	String date_edited // legacy
	Date dateCreated;
    Date lastUpdated;
	Date date_edited_cal // legacy

//	static searchable = {
//        
//        description: spellCheck 'include'
//    }
    static searchable = true;
   // static searchable = [only: ['comments']]
    
	static hasMany = [ media : Media ]
	static mapping =  {
    //    autoTimestamp true
        cache true
        media cache: true
		accession_number(nullable:false,unique:true);
		
		shape_details type:"text";
		bibliography type:"text";
        provenience type:"text";
		fabric_description type:"text";
		description type:"text";
		condition_object type:"text";
		acquisition type:"text";
		dating type:"text"; //TODO some data too long
		diameters type:"text"; //TODO some data too long
		comparanda type:"text"; //TODO some data too long
		technique type:"text"; //TODO some data too long
		short_title type: "text";
		other_dims type:"text"; //TODO some data too long
		inscriptions type:"text"; //TODO some data too long
		munsell_color type:"text"; //TODO some data too long
		attribution type:"text"; //TODO some data too long
		dating_details type:"text";
		comments type:"text";
   
	}
	static constraints = {
		shape(blank:true,nullable:true)
        short_title(blank:true,nullable:true)
		shape_details(blank:true,nullable:true)
		material(blank:true,nullable:true)
		fabric(blank:true,nullable:true)
		fabric_description(blank:true,nullable:true)
		munsell_color(blank:true,nullable:true)
		description(blank:true,nullable:true)
		inscriptions(blank:true,nullable:true)
		condition_object(blank:true,nullable:true)
		technique(blank:true,nullable:true)
		provenience(blank:true,nullable:true)
		acquisition(blank:true,nullable:true)
		period(blank:true,nullable:true)
		date(blank:true,nullable:true)

		daterange_start(nullable:true)
		daterange_end(nullable:true)
		daterange_type(blank:true,nullable:true)

		dating(blank:true,nullable:true)
		dating_details(blank:true,nullable:true)
		artist(blank:true,nullable:true)


		attribution(blank:true,nullable:true)
		comparanda(blank:true,nullable:true)
		comments(blank:true,nullable:true)
		bibliography(blank:true,nullable:true)
		archive_ref(blank:true,nullable:true)
		beazley_db(blank:true,nullable:true)
		height(blank:true,nullable:true)
		diameters(blank:true,nullable:true)
		handle_height(blank:true,nullable:true)
		other_dims(blank:true,nullable:true)
		location(blank:true,nullable:true)
		geolocation(nullable:true);
		edited_by(blank:true,nullable:true)
		date_edited(blank:true,nullable:true)
		date_edited_cal(nullable:true)
       
		
	}
	
}
