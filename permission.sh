#!/usr/bin/env bash
# This will create a group 'pcap' and will let the $USER
# execute 'tcpdump' without sudo priviledges
# Source: https://gist.github.com/zapstar/3d2ff4f345b43ce7918889053503ef84 

sudo groupadd pcap
sudo usermod -a -G pcap $USER
sudo chgrp pcap /usr/sbin/tcpdump
sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
sudo ln -s /usr/sbin/tcpdump /usr/bin/tcpdump
