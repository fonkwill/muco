FROM balenalib/armv7hf-debian:buster-run
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    wget \
    ca-certificates \
    gnupg && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/share/keyrings && \
	wget -q -O /usr/local/share/keyrings/mopidy-archive-keyring.gpg https://apt.mopidy.com/mopidy.gpg && \
    wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/buster.list

RUN apt update && \
    apt install -y --no-install-recommends \
    tzdata \
    sudo \
    build-essential \
    python3-dev \
    python3-pip \
    python3-gst-1.0 \
    python3-wheel \
    gir1.2-gstreamer-1.0 \
    gir1.2-gst-plugins-base-1.0 \
    gstreamer1.0-plugins-good \
    gstreamer1.0-plugins-ugly \
    gstreamer1.0-plugins-bad \
    gstreamer1.0-libav \
    gstreamer1.0-tools \
    gstreamer1.0-alsa \
    libspotify12 \
    libspotify-dev \
    libxml2-dev \
    libxslt1-dev \
    libffi-dev \
    libz-dev \
    python3-setuptools \
    python3-spotify && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install \
    Mopidy \
    Mopidy-MPD \
    Mopidy-Local \
    Mopidy-TuneIn \
    Mopidy-Iris

RUN mkdir -p /mopidy
RUN touch /IS_CONTAINER
RUN useradd -ms /bin/bash mopidy
RUN sh -c 'echo "mopidy ALL=NOPASSWD: /usr/local/lib/python3.7/dist-packages/mopidy_iris/system.sh, /usr/bin/apt*" >> /etc/sudoers'
RUN sed -i 's+--config .*mopidy.conf+--config /mopidy/mopidy.conf+g' /usr/local/lib/python3.7/dist-packages/mopidy_iris/system.sh
RUN chown -R mopidy:mopidy /mopidy

COPY mopidy.conf /mopidy_default.conf
COPY mopidy.conf /mopidy/mopidy.conf
COPY mopidy.sh /usr/local/bin/mopidy.sh

RUN chown mopidy:mopidy /usr/local/bin/mopidy.sh
RUN chmod +x /usr/local/bin/mopidy.sh
RUN echo "snd-aloop" >> /etc/modules-load.d/modules.conf


EXPOSE 6600 6680
USER mopidy
ENTRYPOINT ["/usr/local/bin/mopidy.sh"]
