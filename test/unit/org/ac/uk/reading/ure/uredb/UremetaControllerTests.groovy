package org.ac.uk.reading.ure.uredb

@TestMixin(GrailsUnitTestMixin)
import org.junit.*
import grails.test.mixin.*
import grails.test.mixin.Mock
import grails.test.mixin.TestFor

/**
 * UremetaControllerTests
 * A unit test class is used to test individual methods or blocks of code without considering the surrounding infrastructure
 */

@TestFor(UremetaController)
@Mock([Uremeta])
class UremetaControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/uremeta/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.uremetaInstanceList.size() == 0
        assert model.uremetaInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.uremetaInstance != null
    }

    void testSave() {
        controller.save()

        assert model.uremetaInstance != null
        assert view == '/uremeta/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/uremeta/show/1'
        assert controller.flash.message != null
        assert Uremeta.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/uremeta/list'


        populateValidParams(params)
        def uremeta = new Uremeta(params)

        assert uremeta.save() != null

        params.id = uremeta.id

        def model = controller.show()

        assert model.uremetaInstance == uremeta
    }

    void testEdit() {
        
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/uremeta/list'


        populateValidParams(params)
        def uremeta = new Uremeta(params)

        assert uremeta.save() != null

        params.id = uremeta.id

        def model = controller.edit()

        assert model.uremetaInstance == uremeta
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/uremeta/list'

        response.reset()


        populateValidParams(params)
        def uremeta = new Uremeta(params)

        assert uremeta.save() != null

        // test invalid parameters in update
        params.id = uremeta.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/uremeta/edit"
        assert model.uremetaInstance != null

        uremeta.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/uremeta/show/$uremeta.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        uremeta.clearErrors()

        populateValidParams(params)
        params.id = uremeta.id
        params.version = -1
        controller.update()

        assert view == "/uremeta/edit"
        assert model.uremetaInstance != null
        assert model.uremetaInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/uremeta/list'

        response.reset()

        populateValidParams(params)
        def uremeta = new Uremeta(params)

        assert uremeta.save() != null
        assert Uremeta.count() == 1

        params.id = uremeta.id

        controller.delete()

        assert Uremeta.count() == 0
        assert Uremeta.get(uremeta.id) == null
        assert response.redirectedUrl == '/uremeta/list'
    }
}
