const { Client } = require('rustrcon');
var CronJob = require('cron').CronJob;

var job = new CronJob('30 7 * * *', function() {
  restart()
}, null, true, 'Europe/Istanbul');

var job2 = new CronJob('30 19 * * *', function() {
  restart()
}, null, true, 'Europe/Istanbul');

job.start();
job2.start();

function restart(){
		const rcon = new Client({
			ip: '127.0.0.1',
			port: '28016',
			password: 'rconpassword'
		});
		 
		rcon.login();
		 
		rcon.on('connected', () => {
			console.log(`Connected to ${rcon.ws.ip}:${rcon.ws.port}`);
		 
			rcon.send('sr.restart 30', 'Artful', 10);
		 
			setTimeout(() => {
				rcon.destroy();
			}, 5000);
		});
		
		rcon.on('error', err => {
			console.error(err);
		});
		 
		rcon.on('disconnect', () => {
			console.log('Disconnected from RCON websocket');
		});
		 
		rcon.on('message', message => {
			console.log(message);
		});
}