package org.ac.uk.reading.ure.uredb

class Image {
	
	String resource_id; // the legacy identifier = src;
	
	// caption - image association should happen at another level.
	
    static constraints = {
		resource_id(blank:false)
    }
}
