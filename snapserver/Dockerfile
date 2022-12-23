FROM arm32v7/rust:slim-buster
ENV DEBIAN_FRONTEND=noninteractive

ARG  snapcast_version=0.26.0
ARG TARGETARCH

WORKDIR /tmp

RUN  apt-get update \
  && apt-get install -y wget ca-certificates \
  && rm -rf /var/lib/apt/lists/*


 RUN apt-get update \
  && apt-get install -y build-essential libasound2-dev curl

RUN apt-get update \
  && apt-get install -y pkg-config

#RUN cargo install librespot --locked

RUN  wget https://github.com/badaix/snapcast/releases/download/v${snapcast_version}/snapserver_${snapcast_version}-1_armhf.deb
RUN  dpkg -i snapserver_${snapcast_version}-1_armhf.deb \
  ;  apt-get update \
  && apt-get -f install -y \
  && rm -rf /var/lib/apt/lists/*



ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"


#RUN /usr/bin/snapserver -v

EXPOSE 1704 1705 1780
#restart snapservice

RUN mkdir -p /opt/librespot/config
RUN mkdir -p /opt/snapserver/config

COPY snapserver.conf /opt/snapserver/config/snapserver.conf
COPY librespot-api.sh /opt/librespot/librespot-api.sh

ADD https://github.com/librespot-org/librespot-java/releases/download/v1.6.2/librespot-api-1.6.2.jar /opt/librespot/app.jar
VOLUME /opt/librespot/config
VOLUME /opt/snapserver/config
ADD ./config.toml /opt/librespot/config/config.toml

RUN chmod +x /opt/librespot/librespot-api.sh

CMD ["snapserver", "--config=/opt/snapserver/config/snapserver.conf"]