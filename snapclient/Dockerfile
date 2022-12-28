FROM balenalib/raspberrypi4-64-debian:latest
ENV HOST 127.0.0.1
ENV PORT 1704
ENV HOSTID snapclient
ENV LATENCY 0
ENV SOUNDCARD default


#RUN install_packages snapserver
RUN install_packages wget
RUN install_packages pkg-config
#RUN install_packages default-jdk
RUN wget https://github.com/badaix/snapcast/releases/download/v0.26.0/snapclient_0.26.0-1_armhf.deb

#RUN install_packages ./snapserver_0.26.0-1_armhf.deb
RUN dpkg --add-architecture armhf

RUN  dpkg -i snapclient_0.26.0-1_armhf.deb \
  ;  apt-get update \
  && apt-get -f install -y \
  && rm -rf /var/lib/apt/lists/*


CMD snapclient -h ${HOST} -p ${PORT} -s ${SOUNDCARD} --hostID ${HOSTID} --latency ${LATENCY} 