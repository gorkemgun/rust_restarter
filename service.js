var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RustRestarter',
  description: 'RustRestarter as Windows Service',
  script: 'C:\\Users\\Administrator\\Desktop\\rust_restarter\\rust.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();