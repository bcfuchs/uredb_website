package org.ac.uk.reading.ure.uredb



import org.junit.*
import grails.test.mixin.*

@TestFor(ImageController)
@Mock(Image)
class ImageControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/image/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.imageInstanceList.size() == 0
        assert model.imageInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.imageInstance != null
    }

    void testSave() {
        controller.save()

        assert model.imageInstance != null
        assert view == '/image/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/image/show/1'
        assert controller.flash.message != null
        assert Image.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/image/list'

        populateValidParams(params)
        def image = new Image(params)

        assert image.save() != null

        params.id = image.id

        def model = controller.show()

        assert model.imageInstance == image
    }

    void testEdit() {
        
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/image/list'

        populateValidParams(params)
        def image = new Image(params)
  //      log.warn(response.redirectedUrl)
//        log.warn(image.id)
        log.info response.toString();
        log.info controller.toString();
        log.info params.toString()
        assert image.save() != null

        params.id = image.id

        def model = controller.edit()

        assert model.imageInstance == image
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/image/list'

        response.reset()

        populateValidParams(params)
        def image = new Image(params)

        assert image.save() != null

        // test invalid parameters in update
        params.id = image.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/image/edit"
        assert model.imageInstance != null

        image.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/image/show/$image.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        image.clearErrors()

        populateValidParams(params)
        params.id = image.id
        params.version = -1
        controller.update()

        assert view == "/image/edit"
        assert model.imageInstance != null
        assert model.imageInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/image/list'

        response.reset()

        populateValidParams(params)
        def image = new Image(params)

        assert image.save() != null
        assert Image.count() == 1

        params.id = image.id

        controller.delete()

        assert Image.count() == 0
        assert Image.get(image.id) == null
        assert response.redirectedUrl == '/image/list'
    }
}
