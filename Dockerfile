FROM openjdk:7-jdk-alpine
# modified from https://github.com/mozart-analytics/grails-docker

ENV GRAILS_VERSION 2.3.6
WORKDIR /usr/lib/jvm
RUN apk update
RUN apk add wget
RUN wget --no-check-certificate https://github.com/grails/grails-core/releases/download/v$GRAILS_VERSION/grails-$GRAILS_VERSION.zip && \
    unzip grails-$GRAILS_VERSION.zip && \
    rm -rf grails-$GRAILS_VERSION.zip && \
    ln -s grails-$GRAILS_VERSION grails

ENV GRAILS_HOME /usr/lib/jvm/grails
ENV PATH $GRAILS_HOME/bin:$PATH
RUN mkdir /app
WORKDIR /app
ENTRYPOINT ["grails"]