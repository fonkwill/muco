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
#RUN /usr/bin/snapserver -v
COPY snapserver.conf /etc/snapserver.conf


EXPOSE 1704 1705 1780
ENTRYPOINT ["/usr/bin/snapserver", "-c", "/etc/snapserver/snapserver.conf"]
