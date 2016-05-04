def f;
println "go"
try {
	f = new XmlSlurper().parse('src/ure.xml')
}
catch(e) {
	println e
}
def els = f.data.record.list();
println els.size();
els.each {

	//	  it.childNodes().each {
	//
	//		  println it.name();
	//
	//		   }

	//	 println it.childNodes().size();
	if (it.childNodes().size() > 34) {
		println it.childNodes().size();
		def out = [];
		def el = ['Accession_Number':'','Acquisition':'','Archive_Ref':'','Artist':'','Attribution':'','Beazley_DB':'','Bibliography':'','Comments':'','Comparanda':'','Condition':'','Date':'','Date_edited':'','Dating':'','Dating_details':'','Description':'','Diameters':'','Edited_by':'','Fabric':'','Fabric_Description':'','Fabric_description':'','Handle_height':'','Height':'','Image':'','Inscriptions':'','Location':'','Material':'','Munsell_color':'','Other_dims':'','Period':'','Provenience':'','Shape':'','Shape_details':'','Technique':'','caption':'','img':'',]
		;

		it.childNodes().each {
			// println "\t" + it.name();
			def name = it.name();
			if (name == 'Other_dims.') { name = "Other_dims"}
			
	
				
				el.put(name,escape(it.text()));
		
			

			out << it.name();

			//	 println "if (it.name() == '${it.name()}' ) {  }"

		}
		def a = "";
		for (o in out) {

			//	 a += "\$$o"+'\\t';
			//		 a += "\${el."+o+ "}" + '\\t';
			a += "'$o':'',";
		}
		//		 println "[$a]";
		println el;
//		println  "${el.Accession_Number}\t${el.Acquisition}\t${el.Archive_Ref}\t${el.Artist}\t${el.Attribution}\t${el.Beazley_DB}\t${el.Bibliography}\t${el.Comments}\t${el.Comparanda}\t${el.Condition}\t${el.Date}\t${el.Date_edited}\t${el.Dating}\t${el.Dating_details}\t${el.Description}\t${el.Diameters}\t${el.Edited_by}\t${el.Fabric}\t${el.Fabric_Description}\t${el.Fabric_description}\t${el.Handle_height}\t${el.Height}\t${el.Inscriptions}\t${el.Location}\t${el.Material}\t${el.Munsell_color}\t${el.Other_dims}\t${el.Period}\t${el.Provenience}\t${el.Shape}\t${el.Shape_details}\t${el.Technique}"
println "--"

		 		 //$Accession_Number\t$Acquisition\t$Archive_Ref\t$Artist\t$Attribution\t$Beazley_DB\t$Bibliography\t$Comments\t$Comparanda\t$Condition\t$Date\t$Date_edited\t$Dating\t$Dating_details\t$Description\t$Diameters\t$Edited_by\t$Fabric\t$Fabric_Description\t$Fabric_description\t$Handle_height\t$Height\t$Image\t$Inscriptions\t$Location\t$Material\t$Munsell_color\t$Other_dims.\t$Period\t$Provenience\t$Shape\t$Shape_details\t$Technique\t$caption\t$img\t

	 }
		
		 
	  
	  
	  
	 
	 
	  }
 def escape(txt) {
	 
	 
 }
 }
 println "done"