package org.ac.uk.reading.ure.uredb

/**
 * Archive
 * A domain class describes the data object and it's mapping to the database
 */
class Archive {

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
    String title // varchar(255) DEFAULT NULL,
    String creator // varchar(255) DEFAULT NULL,
    String creator_location // varchar(255) DEFAULT NULL,
    String  recipients // varchar(255) DEFAULT NULL,
    Date  publication_date // date DEFAULT NULL,
    String  publication_date_comments // varchar(255) DEFAULT NULL,
    String personal_subjects // varchar(255) DEFAULT NULL,
    String subjects // varchar(255) DEFAULT NULL,
    String excavation_season // varchar(255) DEFAULT NULL,
    String keywords // varchar(255) DEFAULT NULL,
    String document_lang // varchar(255) DEFAULT NULL,
    String physical_extent // varchar(255) DEFAULT NULL,
    String physical_description // varchar(255) DEFAULT NULL,
    String provenance // varchar(255) DEFAULT NULL,
    String collection // varchar(255) DEFAULT NULL,
    String location // varchar(255) DEFAULT NULL,
    String reference_number // varchar(255) DEFAULT NULL,
    String access // varchar(255) DEFAULT NULL,
    String conditions_of_use // varchar(255) DEFAULT NULL,
    String copyright // varchar(255) DEFAULT NULL,
    String citation_information // varchar(255) DEFAULT NULL,
    String images // varchar(255) DEFAULT NULL,
    String related_links // varchar(255) DEFAULT NULL,
    String transcription // varchar(255) DEFAULT NULL,
    String exhibition // varchar(255) DEFAULT NULL,
    String related_media // varchar(255) DEFAULT NULL,
    String related_images // varchar(255) DEFAULT NULL,
    String record_author // varchar(255) DEFAULT NULL,
    String record_editor // varchar(255) DEFAULT NULL,
    
    
	static constraints = {
    }
	
	/*
	 * Methods of the Domain Class
	 */
//	@Override	// Override toString for a nicer / more descriptive UI 
//	public String toString() {
//		return "${name}";
//	}
}
