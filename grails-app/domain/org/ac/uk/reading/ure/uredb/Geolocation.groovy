package org.ac.uk.reading.ure.uredb

//import com.vividsolutions.jts.geom.Polygon;
//import org.hibernatespatial.GeometryUserType

//import org.hibern


//TODO configure grails for geospatial w/ MySQL
//http://grails.1312388.n4.nabble.com/Putting-an-index-on-a-joinTable-td1390033.html 
// Set up grails for gis + mysql
//http://www.grails.org/MySQL+GIS-Geometry+with+Grails 
class Geolocation {
/**
 * create table Points ( 
name VARCHAR(20) PRIMARY KEY, 
location Point NOT NULL, 
description VARCHAR(200), 
SPATIAL INDEX(location) 
); 
 * 
 */
	
	String location; // lat lon as string
	String name;
	String description;
    static belongsTo = Uremeta;
    static mapping = {
	//	location type:"point";
		
    }
}
