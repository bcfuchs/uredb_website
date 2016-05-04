// groovy sql settings here.
import groovy.sql.Sql
def sql = Sql.newInstance( 'jdbc:mysql://localhost:3306/uredb', 
						'bcfuchs',
					   'filigree', 
					   'com.mysql.jdbc.Driver' )
//sql.execute("insert into media (version,caption,description) values(?,?,?)",[1,'hey','ok']);


//sql.execute("insert into uremeta (version,accession_number) values(?,?)",[1,'a23']);
//println "done";
System.exit(1)
// create an array of maps = sql insertion rows.
def rows = getData();
println rows.size();
println "done";

// filter out  bad column names etc.

// batch insert.

def getData() {
	def out = [];
	def slurp = new XmlSlurper();
	def  groovy.util.slurpersupport.NodeChild f;

	try {
		f = slurp.parse('src/ure.xml')
	}
	catch(e) {
		println e
	}
	

	def els = f.data.record.list();
	println els.size();
	els.each {
		def a = [:];
		it.childNodes().each {
			// println "\t" + it.name();

			a.put(it.name(), it.text());


		}
		out << a;
		
		println a;
	}

	return out;
}


def doBatch() {
	
	sql.withBatch {stmt->
		100000.times {
			def data = "ok $it";
		  stmt.addBatch("insert into test(name) values('"+data+"')");
		}
		stmt.executeBatch()
	}
	 
	
	

}

def getstmt(Map m) {

	//sql.execute("insert into uremeta (version,accession_number) values(?,?)",[1,'a23']);
	def a,b = [];
	
	m.each { k,v ->
			a << k.toLowerCase();
			a << v;
	}
	
	
}
}