package org.ac.uk.reading.ure.uredb

/**
 * EditorService
 * A service class encapsulates the core business logic of a Grails application
 */
class EditorService {

    static transactional = true

    def selpicdir() {
		return Media.executeQuery('select distinct dir from Media').sort();
		
    }
	
	def picsel(dir) {
		
		
		def med = Media.findAll("from Media as m where m.dir = ?",[dir]);
		return med;
		
		
	}
}
