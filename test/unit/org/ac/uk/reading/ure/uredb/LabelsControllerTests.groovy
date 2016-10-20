package org.ac.uk.reading.ure.uredb



import org.junit.*
import grails.test.mixin.*

/**
 * LabelsControllerTests
 * 
 */
@TestFor(LabelsController)
@Mock(Labels)
class LabelsControllerTests {


    def populateValidParams(params) {
        
        params['clazz'] = 'a'
        params['field'] = 'a'
        params['label'] = 'a'
        params['context'] = 'a'
        return params
    }

    void testIndex() {
        controller.index()
        assert "/labels/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()
        System.out.println model
        assert model.labelsInstanceList.size() == 0
        assert model.labelsInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.labelsInstance != null
    }

    void testSave() {
        // no params --> redir to create
//        populateValidParams(params)
//        controller.save()
//   
//        assert model.labelsInstance != null
//        assert view == '/labels/create'
//        response.reset()
        
        // with good params --> redir to show
        populateValidParams(params)
        controller.save()
        assert response.redirectedUrl == '/labels/show/1'
        assert controller.flash.message != null
        assert Labels.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/labels/list'


        populateValidParams(params)
        def labels = new Labels(params)

        assert labels.save() != null

        params.id = labels.id

        def model = controller.show()

        assert model.labelsInstance == labels
    }

    void testEdit() {
        
        controller.edit()
        assert flash.message != null
      //  assert response.redirectedUrl == '/labels/list'

      
        populateValidParams(params) 
        def labels = new Labels(params)

        assert labels.save(flush:true) != null

        params.id = labels.id

        def model = controller.edit()

        assert model.labelsInstance == labels
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/labels/list'

        response.reset()

        populateValidParams(params)
        def labels = new Labels(params)

        assert labels.save() != null

        params.id = labels.id
        params.clazz = 'b'
        controller.update()
        
  
       
        assert response.redirectedUrl == "/labels/show/$labels.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        labels.clearErrors()

        populateValidParams(params)
        params.id = labels.id
        params.version = -1
        controller.update()

        assert view == "/labels/edit"
        assert model.labelsInstance != null
        assert model.labelsInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/labels/list'

        response.reset()

        populateValidParams(params)
        def labels = new Labels(params)

        assert labels.save() != null
        assert Labels.count() == 1

        params.id = labels.id

        controller.delete()

        assert Labels.count() == 0
        assert Labels.get(labels.id) == null
        assert response.redirectedUrl == '/labels/list'
    }
}
