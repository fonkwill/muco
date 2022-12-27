FROM balenalib/raspberrypi4-64-debian:latest

RUN mkdir -p /opt/librespot/config
RUN mkdir -p /opt/snapserver/config

VOLUME /opt/librespot/config
VOLUME /opt/snapserver/config

COPY snapserver.conf /opt/snapserver/config/snapserver.conf
COPY librespot-api.sh /opt/librespot/librespot-api.sh
COPY config.toml /opt/librespot/config/config.toml

RUN chmod +x /opt/librespot/librespot-api.sh

RUN install_packages snapserver

ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

CMD ["snapserver", "--config=/opt/snapserver/config/snapserver.conf"]