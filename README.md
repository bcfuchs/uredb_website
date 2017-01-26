Ure Museum online DB
====================

grails app for web access to  the [Ure Museum Collections](http://beta.uremusem.org)

Running the demo

(Note: the demo only supports anonymous user access)
------

First, install Docker from https://www.docker.com/ if you don't have it. 


Then  build an image from the root directory of this project

```
docker build -t ure/uredb_base . 
```

Start the database 

```
docker run --name uredemo-mysql -v "$PWD"/data/uredemo.sql:/docker-entrypoint-initdb.d/setup.sql -e MYSQL_ROOT_\
PASSWORD=uredemo  -d mysql:latest
```
Make a local .grails / ivy directory for storing jars needed by the app (if it doesn't already exist)

```
mkdir ~/.grails
```

Finally, run the image

```
docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "$PWD":/app:rw \
-e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' -e WSKEY='api2demo' --name uredb_latest  ure/uredb_base \
"run-app -Dgrails.env=uredemo    --refresh-dependencies --stacktrace"
```

Add a port switch if you need one (-p $HOSTPORT:$CONTAINERPORT)

```
docker run --rm --link uredemo-mysql:mysql -v ~/.grails:/root/.grails  -v "$PWD":/app:rw \
-e UREDEMO_DB_USER='uredemo' -e UREDEMO_DB_PWD='uredemo' -e GA_SCRIPT='false' -e WSKEY='api2demo' -p 8080:8080 --name uredb_latest  ure/uredb_base \
"run-app -Dgrails.env=uredemo   --refresh-dependencies --stacktrace"
```

