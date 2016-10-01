/*
 * @owner yianni.ververis@qlik.com
 *
 */
var me = {
	v: '1.0.7',
	obj: {
		qlik: null,
		app: null,
		angularApp: null,
		model: [],
		getObjectModel: []
	}
};

me.init = function () {
	me.config = {
		//host: '10.65.6.19',
		host:'192.168.0.106',
		prefix: "/",
		port: 80, // 443 for Sense Server
		id: 'b74e2ae5-4cda-402d-bccc-55b2e162cb6c'
	};
	me.vars = {};
}

me.boot = function () {
	me.init();
	me.obj.app = me.obj.qlik.openApp(me.config.id, me.config);
	console.log('%c App ' + me.v + ': ', 'color: red', 'Loaded!');
};

app = me;
