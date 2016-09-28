import org.ac.uk.reading.ure.uredb.*;
import groovy.json.*;
class BootStrap {
	def img;
    def searchableService;
	def init = { servletContext ->
        
        searchableService.reindex()
    //	addMedia();
    //  addDirs();
	}
    
	def destroy = {
	}
	
	def addMedia  = {
		// get all of the media objects
		def  media = Media.list();
		// println media.getClass();
		media.each {
			def meta = Uremeta.findByAccession_number(it.resource_id);
			if (meta) {
				meta.addToMedia(it);
			//	meta.save();
			}
		}

      

	}
	def addDirs = {
		//new URL("http://localhost")
		loadImg();
		def  media = Media.list();
		def img2 = img.clone();
		media.each { m->
			def uri = m.uri;
			;
			def dir = img[uri];
			img2.remove(uri);
		//	println uri + " $dir";
			def base = "http://uredb.reading.ac.uk/ure/pixdir/"
			m.uri_local = base+dir;
			m.dir = dir;
			m.save();
		}
		println "${img.size();} ${img2.size()} ${media.size()}";
		// create new media objects for the rest.
		img2.each {k,v->
			def m = new Media(uri:k,
				type:"image",
				uri_local:"http://uredb.reading.ac.uk/ure/pixdir/"+v,
				);
			println "adding $k";
			m.save(failOnError:true);
		}
		

	}

	def loadImg() {
		def url = "http://localhost/~bfuchs/img.json"
		def u = new URL(url).getText();
		def slurper = new JsonSlurper()
		img = slurper.parseText(u);


	}



}
