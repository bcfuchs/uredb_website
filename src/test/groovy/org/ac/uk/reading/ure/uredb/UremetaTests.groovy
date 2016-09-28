package org.ac.uk.reading.ure.uredb 


import grails.test.mixin.*

@TestFor(UremetaController)
@Mock(Uremeta)
class UremetaTests  {
   

    void testSaveInvalidUremeta() {
        controller.save()
        
                assert model.uremetaInstance != null
                assert view == '/uremeta/create'
    }
    
    void testConstraints() {
        assert 1 == 0;
    }
}
