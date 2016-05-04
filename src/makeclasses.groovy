import groovy.text.Template
import groovy.text.SimpleTemplateEngine
/**
 * 1. A single table, with each field in the xsd a field in the table + one extra field
 * 
 * 2. Object table -- id / accession number / metadata id; 
 *    Metadata table   id / metadata_type /     [1-2-M to object table -- an object may have 1..* metadata entries, but only 1 per type. ]
 * 
 * 3. Each field in the xsd is a table with id + column; a large table then contains fks to the ids of entries in the field tables. 
 * 
 * Let's try one first. 
 * 
 */
def f;
try {
	f = new XmlSlurper().parse('src/ure.xsd')
}
catch(e) {
	println e
}
def els = f.complexType.choice.element.list();
println els.size();
def cmd = "/usr/local/share/grails/bin/grails create-domain-class";
def prefix = "org.ac.uk.reading.ure.uredb";
els.each { 

def type =  (it.@name).toString().toLowerCase();
type = type.replaceAll(/\./,"");
println "String $type";
//println "$cmd $prefix.$type";
// println "$cmd $prefix.$type".execute().text;
}

