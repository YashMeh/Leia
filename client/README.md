#### Configuring
- Create a .env inside client directory and give the NATS_SERVER

Example if you want to run locally.
```
NATS_SERVER=nats://0.0.0.0:4222
```
---
#### Installation
```
npm install
```

#### Starting
```
pm2 start server.js
```

#### Stopping
```
pm2 stop <process ID>
```