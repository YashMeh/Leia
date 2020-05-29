### Installation

```js
npm install
```

### Configuration
In order to tell your admin app that which device needs to be monitored and what is its key,we need to make changes to the 
[Receivers.js](https://github.com/YashMeh/Leia/blob/master/leia-admin/src/_actions/Receivers.js) file. You need to add the name of the device(which we set in the `.env` file) as `name` and the key as `key;

### Sample

```js
var users = [
  { name: "home-system", key: "dum-key" },
  { name: "aws253", key: "dum-key" }...
]
```
### Starting

```js
npm start
```
