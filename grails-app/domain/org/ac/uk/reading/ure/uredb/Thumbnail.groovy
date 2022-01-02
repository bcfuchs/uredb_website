package org.ac.uk.reading.ure.uredb

class Thumbnail {
	
	String accnum; // the legacy identifier = src;
	String pic_id; 
	
	// caption - image association should happen at another level.
	
    static constraints = {
		accnum(blank:true)
		pic_id(blank:true)	
    }
}
