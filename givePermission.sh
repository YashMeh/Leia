#!/usr/bin/env bash

# NOTE: This will let anyone who belongs to the 'pcap' group
# execute 'tcpdump'

# NOTE2: User running the script MUST be a sudoer. It is
# convenient to be able to sudo without a password.

sudo groupadd pcap
sudo usermod -a -G pcap $USER
sudo chgrp pcap /usr/sbin/tcpdump
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
sudo ln -s /usr/sbin/tcpdump /usr/bin/tcpdump
