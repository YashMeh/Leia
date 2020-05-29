# Leia
Leia is a tiny-configurable network monitoring service accross multiple Linux distros.
<p align="center"><img src="https://raw.githubusercontent.com/YashMeh/Leia/master/assets/leia_admin.png" alt="Leia Admin" height="350" width="700" /></p>

### Aim

The aim of the project is to easily monitor packets for different protocols(HTTP,SMTP etc.) across different Linux based servers with minimum packet-loss.

### Architecture

![Leia Architecture](https://github.com/YashMeh/Leia/raw/master/assets/leia-arch.png)

### Requirements

- [nats-server](https://github.com/nats-io/nats-server)
- [node](https://nodejs.org/en/download/)
- [tcpdump](https://www.tcpdump.org/manpages/tcpdump.1.html)
- [pm2](https://pm2.keymetrics.io/)
- [curl](https://curl.haxx.se/)
- [ws-tcp-relay](https://github.com/isobit/ws-tcp-relay)

### Permissions

Leia uses `tcpdump` to capture the packets,which in turn require `sudo` priviledges.The 2 possible solutions I could think of,were-

- Run the server with sudo priviledges (**_not at all recommended_**,[why](https://askubuntu.com/questions/20984/always-sudo-privileges))
  `sudo node server.js`
- Create a group named `pcap` which has the permission to execute `tcpdump` and add the user executing the `client/server.js` (**check [permission.sh](https://github.com/YashMeh/Leia/raw/master/permission.sh)**)

### Why do we need a relay server ?

Leia clients publish the packets on a nats-queue, the nats uses its own tcp protocol under the hood.On the other hand, the `leia-admin` app works inside browser and can thus only talk through `http or websocket` like protocol.
Thus, we need a relay to forward all the websocket or http request(websocket in our case) to the tcp based nats-queue.

### How it works
- Start the nats-server using 
`nats-server`
- [Configure](https://github.com/YashMeh/Leia/raw/master/client/README.md) your server and start the server in the background using PM2.
  `pm2 start server.js`
- Command your server to start publishing the specific packets using curl

```
//To start capturing HTTPS packets
curl http://localhost:8080/api/start/https
//To stop capturing HTTPS packets
curl http://localhost:8080/api/stop/https
//To start capturing DNS packets
curl http://localhost:8080/api/start/dns
//To stop capturing DNS packets
curl http://localhost:8080/api/stop/dns

```
- Currently the following protocols are supported-HTTP,HTTPS,FTP,DNS,SSH and SMTP
- Start the relay server using `ws-tcp-relay <tcpTargetAddress>`
- [Configure](https://github.com/YashMeh/Leia/blob/master/leia-admin/README.md) your leia-admin app 

### Configure Leia to capture packets for a protocol of your choice

- Goto `client/utils/net-utils.js`
- Add the port for your protocol inside the PROT_TO_PORT object

```js
const PROT_TO_PORT = {
  http: 80,
  https: 443,
  ....
  YOUR_PROTOCOL:PORT_NUMBER
}
```

- Mark the process ID as -1 for the same protocol

```js
const PROT_TO_PID = {
  http: -1,
  https: -1,
  ....
  YOUR_PROTOCOL:-1
}
```

### Work left

- [X] Capture packets in real time and pipeline to a messaging queue.

- [X] Visualise the traffic using a react-redux administration app.

- [ ] Encrypt the data that is beign exchanged between the queues.

- [ ] Automatically detect and prevent malicious attacks(probably using SNORT)

### Testing Locally
For testing whether or not the traffic is being generated locally checkout `test-client.js`
