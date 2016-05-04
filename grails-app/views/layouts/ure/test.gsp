<html>
    <head>
        <title><g:layoutTitle default="An example" />Ure Museum</title>
        <g:layoutHead/>
        <link rel="stylesheet" href="${resource(dir:'css/ure',file:'earth.css')}" />
        
    </head>
    <body onload="${pageProperty(name:'body.onload')}">


    <h3>This comes from the layout at ure/test.gsp</h3>
        <div class="menu"><!--my common menu goes here--></menu>
            <div class="body">
                <g:layoutBody />
            </div>
        </div>
    </body>
</html>