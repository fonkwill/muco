FROM balenalib/raspberrypi3-debian:latest


RUN mkdir -p /opt/librespot/config
RUN mkdir -p /opt/snapserver/config

VOLUME /opt/librespot/config
VOLUME /opt/snapserver/config

COPY snapserver.conf /opt/snapserver/config/snapserver.conf
COPY librespot-api.sh /opt/librespot/librespot-api.sh
COPY config.toml /opt/librespot/config/config.toml

RUN chmod +x /opt/librespot/librespot-api.sh

#RUN install_packages snapserver
RUN install_packages wget
RUN install_packages pkg-config
#RUN install_packages default-jdk
RUN wget https://github.com/badaix/snapcast/releases/download/v0.26.0/snapserver_0.26.0-1_armhf.deb

#RUN install_packages ./snapserver_0.26.0-1_armhf.deb

RUN  dpkg -i snapserver_0.26.0-1_armhf.deb \
  ;  apt-get update \
  && apt-get -f install -y \
  && rm -rf /var/lib/apt/lists/*

ADD https://github.com/librespot-org/librespot-java/releases/download/v1.6.2/librespot-api-1.6.2.jar /opt/librespot/app.jar

ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"



CMD ["snapserver", "--config=/opt/snapserver/config/snapserver.conf"]