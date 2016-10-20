package org.ac.uk.reading.ure.uredb

/**
 * LabelService
 * 
 */
class LabelService {
/**	
	Accession_Number
	Shape
	Shape_description 	
	Material	Terracotta
	Fabric	Corinthian
	Fabric_description	Pale ground
	Munsell_color	10YR 8/4
	Decoration	(Dipped) black on handles; streaky black on interior; exterior decorated with continuous black zigzags, red band, black band; black foot-ring.
	Inscriptions
	Condition	Intact. Paint worn inside and on top part of outer surface.
	Technique/Style	LC I / II
	Provenance	From Anavysos (Anaphlystos), Attica
	Period	Late Archaic / Early Classical / High Classical
	Date	500-450
	Dating_details
	Artis
	Attribution
  */
    static transactional = true
    /**
     * This class is no longer used. Instead, labels are handled via preset javascript. 
     */
   /**
    * getLabel
    * get the label for a field
    * @param field
    * @return String label 
    */
    def getLabel(field) {
           def LabelsInstance =  Labels.findByField(field);
           if (LabelsInstance) {
               return LabelsInstance.label;
           }
           return null;
    }
}
