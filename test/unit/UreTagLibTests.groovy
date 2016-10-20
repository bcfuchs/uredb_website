
import spock.lang.*;
import grails.test.mixin.*




import org.ac.uk.reading.ure.uredb.*;
import org.springframework.mock.web.*;
import org.junit.*
import grails.test.mixin.support.*

/**
 * See the API for {@link grails.test.mixin.web.GroovyPageUnitTestMixin} for usage instructions
 */


@TestMixin(GrailsUnitTestMixin)
@TestFor(UreTagLib)
class UreTagLibTests {

    void testNoEdit() {
        def uretags = new UreTagLib();
        def u = [:]
        u.id = 23
        pageScope.uremetaInstance = u;
        pageScope.currentUser = 'acsmith';

        uretags.servletContext.currentEditor = 'acsmith';
        uretags.servletContext.currentEditPage = 23;

        assert applyTemplate('<ure:isSimulEdit>3</ure:isSimulEdit>') == "3";

    }

    void testSameUserOK2Edit() {
        def uretags = new UreTagLib();
        def u = [:]
        u.id = 23
        pageScope.uremetaInstance = u;
        pageScope.currentUser = 'acsmith';

        uretags.servletContext.currentEditor = 'acsmith';
        uretags.servletContext.currentEditPage = 22;

        assert applyTemplate('<ure:isSimulEdit>3</ure:isSimulEdit>') == "";

    }
    void testDiffUserOK2Edit() {
        def uretags = new UreTagLib();
        def u = [:]
        u.id = 23
        pageScope.uremetaInstance = u;
        pageScope.currentUser = 'acsmith';

        uretags.servletContext.currentEditor = 'joebloggs';
        uretags.servletContext.currentEditPage = 22;

        assert applyTemplate('<ure:isSimulEdit>3</ure:isSimulEdit>') == "";

    }
    //
    void testMissingPropDomainInstance() {
        def uretags = new UreTagLib();
        def u = [:]
        //     u.id = 23
        pageScope.uremetaInstance = u;
        pageScope.currentUser = 'acsmith';

        uretags.servletContext.currentEditor = 'joebloggs';
        //     uretags.servletContext.currentEditPage = 22;

        assert applyTemplate('<ure:isSimulEdit>3</ure:isSimulEdit>') == "";

    }
}
