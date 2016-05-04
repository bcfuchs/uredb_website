package org.ac.uk.reading.ure.uredb
/**
 * Store application options
 * 
 * longer values would normally be json
 * @author bfuchs
 * 
 * Options displayed on options page. 
 *
 */

class Options {

    String key;
    String value;
    String tags;
    
	/* Default (injected) attributes of GORM */
//	Long	id
//	Long	version
	
	/* Automatic timestamping of GORM */
//	Date	dateCreated
//	Date	lastUpdated
	
//	static belongsTo	= []	// tells GORM to cascade commands: e.g., delete this object if the "parent" is deleted.
//	static hasOne		= []	// tells GORM to associate another domain object as an owner in a 1-1 mapping
//	static hasMany		= []	// tells GORM to associate other domain objects for a 1-n or n-m mapping
//	static mappedBy		= []	// specifies which property should be used in a mapping 
	
    static mapping = {
        value:'text';
        tags: 'text';
    }
    
	static constraints = {
    }
	
}
