# Problem
Hot reloading does not work with a connected component.


# Start

```
npm install
npm start
```
Open Google Chrome and go to http://localhost:3000


# How to reproduce
- Open app/App.js
- Change content of `<div>` in `render()`
- Save
- Hot reloading **does NOT** work
- Remove `connect()`
- Change content of `<div>` in `render()`
- Save
- Hot reloading **does** work
