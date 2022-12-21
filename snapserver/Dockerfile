FROM arm32v7/debian:stretch
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
#RUN /usr/bin/snapserver -v


ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"


COPY snapserver.conf /etc/snapserver.conf

RUN service snapserver restart

EXPOSE 1704 1705 1780
#restart snapservice

RUN mkdir -p /opt/librespot/config

ADD https://github.com/librespot-org/librespot-java/releases/download/v1.6.2/librespot-api-1.6.2.jar /opt/librespot/app.jar
VOLUME /opt/librespot/config
ADD ./config.toml /opt/librespot/config/config.toml

CMD ["java", "-jar", "/opt/librespot/app.jar", "--conf-file=/opt/librespot/config/config.toml"]