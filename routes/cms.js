var express = require('express');
var router = express.Router();
var config = require('config');

const {
	MessengerClient
} = require('messaging-api-messenger');
const {
	MessengerBatch
} = require('messaging-api-messenger');
var Cryptojs = require("crypto-js"); //Toanva add

const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
	(process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
	config.get('pageAccessToken');
const client = MessengerClient.connect({
	accessToken: PAGE_ACCESS_TOKEN,
	version: '3.1',
});

var objDb = require('../object/database.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const SALT = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
	(process.env.SALT):
	config.get('salt');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.sendFile('login.html', {
		root: "views/cms"
	});
});
router.get('/login', function (req, res, next) {
	res.sendFile('login.html', {
		root: "views/cms"
	});
});
router.get('/changePassWord', function (req, res, next) {
	res.sendFile('changePassword.html', {
		root: "views/cms"
	});
});
router.get('/mess', function (req, res, next) {
	res.sendFile('mess.html', {
		root: "views/cms"
	});
});
router.get('/unitlogin', function (req, res, next) {
	res.sendFile('unitlogin.html', {
		root: "views/cms"
	});
});
router.get('/unitupload', function (req, res, next) {	
	res.sendFile('unitupload.html', {
		root: "views/cms"
	});
});
router.get('/unitlog', function (req, res, next) {
	res.sendFile('unitlog.html', {
		root: "views/cms"
	});
});
router.get('/member', function (req, res, next) {
	res.sendFile('member.html', {
		root: "views/cms"
	});
});

router.get('/profile', function (req, res, next) {
	res.sendFile('profile.html', {
		root: "views/cms"
	});
});

router.get('/profile2', function (req, res, next) {
	res.sendFile('profile2.html', {
		root: "views/cms"
	});
});

router.get('/unit', function (req, res, next) {
	res.sendFile('unit.html', {
		root: "views/cms"
	});
});

router.get('/authorize', function (req, res, next) {
	res.sendFile('authorize.html', {
		root: "views/cms"
	});
});

router.get('/team', function (req, res, next) {
	if (req.session.IsAdmin == true) {
		res.sendFile('reportgr.html', {
			root: "views/cms"
		});
	} else {
		res.sendFile('team.html', {
			root: "views/cms"
		});
	}
});

/*router.get('/teamleader', function (req, res, next) {
	res.sendFile('teamleader.html', {
		root: "views/cms"
	});
});*/

router.get('/report', function (req, res, next) {
	res.sendFile('report.html', {
		root: "views/cms"
	});
});

router.get('/reportunit', function (req, res, next) {
	res.sendFile('reportunit.html', {
		root: "views/cms"
	});
});

router.get('/content', function (req, res, next) {
	res.sendFile('content.html', {
		root: "views/cms"
	});
});

router.get('/dashboard', function (req, res, next) {
	if (req.session.IsAdmin == "true" || req.session.TeamId == "10" || req.session.TeamId == "13") {
		res.sendFile('dashboard.html', {
			root: "views/cms"
		});
	}
});

router.get('/dashboard1', function (req, res, next) {
	if (req.session.IsAdmin == "true" || req.session.TeamId == "10" || req.session.TeamId == "13") 
	{
		res.sendFile('dashboard1.html', {
			root: "views/cms"
		});
	}
});

router.get('/dashboard2', function (req, res, next) {
	if (req.session.IsAdmin == "true" || req.session.TeamId == "10" || req.session.TeamId == "13") 
	{
		res.sendFile('dashboard2.html', {
			root: "views/cms"
		});
	}
});

router.get('/dashboard3', function (req, res, next) {
	if (req.session.IsAdmin == "true" || req.session.TeamId == "10" || req.session.TeamId == "13") {
		res.sendFile('dashboard3.html', {
			root: "views/cms"
		});
	}
});

router.get('/dashboard4', function (req, res, next) {
	if (req.session.IsAdmin == "true" || req.session.TeamId == "10" || req.session.TeamId == "13") {
		res.sendFile('dashboard4.html', {
			root: "views/cms"
		});
	}
});

router.get('/unitboard', function (req, res, next) {
	res.sendFile('unitboard.html', {
		root: "views/cms"
	});
});

router.get('/reportsmart', function (req, res, next) {
	res.sendFile('reportsmart.html', {
		root: "views/cms"
	});
});

router.get('/reportsmartteam', function (req, res, next) {
	res.sendFile('reportsmartteam.html', {
		root: "views/cms"
	});
});

router.get('/reportsmartunit', function (req, res, next) {
	res.sendFile('reportsmartunit.html', {
		root: "views/cms"
	});
});

router.get('/summary', function (req, res, next) {
	res.sendFile('summary.html', {
		root: "views/cms"
	});
});

router.get('/mess', function (req, res, next) {
	res.sendFile('mess.html', {
		root: "views/cms"
	});
});

router.get('/sumaryreport', function (req, res, next) {
	res.sendFile('sumaryreport.html', {
		root: "views/cms"
	});
});

router.get('/sumaryfile', function (req, res, next) {
	res.sendFile('sumaryfile.html', {
		root: "views/cms"
	});
});

router.get('/smart', function (req, res, next) {
	res.sendFile('smart.html', {
		root: "views/cms"
	});
});

router.get('/teamsmart', function (req, res, next) {
	res.sendFile('teamsmart.html', {
		root: "views/cms"
	});
});

router.get('/filesmart', function (req, res, next) {
	res.sendFile('filesmart.html', {
		root: "views/cms"
	});
});


router.get('/reportgr', function (req, res, next) {
	res.sendFile('reportgr.html', {
		root: "views/cms"
	});
});

router.get('/geoupload', function (req, res, next) {
	res.sendFile('geoupload.html', {
		root: "views/cms"
	});
});

router.get('/geopoint', function (req, res, next) {
	res.sendFile('geopoint.html', {
		root: "views/cms"
	});
});

router.get('/sendmessage', function (req, res, next) {
	res.sendFile('sendmessage.html', {
		root: "views/cms"
	});
});

router.get('/chart', function (req, res, next) {
	res.sendFile('chart.html', {
		root: "views/cms"
	});
});

router.get('/gift', function (req, res, next) {
	res.sendFile('redeemgift.html', {
		root: "views/cms"
	});
});

router.get('/title', function (req, res, next) {
	res.sendFile('title.html', {
		root: "views/cms"
	});
});

router.get('/getReport', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var teamid = req.session.TeamId;
	console.log("GetReport: ", teamid);
	if (teamid == 10 || teamid == 13) {
		var provincial = req.query.provincial;
		var query = {};
		objDb.getConnection(function (client) {
		objDb.findReport(query, client, function (results) {
			client.close();
			res.send(results);
		});
		});
		
		
	} else {
		res.send(null);
	}
});

router.get('/getUpload', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	var provincial = req.query.provincial;
	var query = {};
	console.log("GetUpload");
	objDb.getConnection(function (client) {
		objDb.findUpload(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getCheckList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	//var provincial = req.query.provincial;
	var query = {};
	console.log("getCheckList");
	objDb.getConnection(function (client) {
		objDb.findCheckList(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getCheckList2', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	//var provincial = req.query.provincial;
	var query = {};
	console.log("getCheckList2");
	objDb.getConnection(function (client) {
		objDb.findCheckList2(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCPointLog', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	var provincial = req.query.provincial;
	var teamid = req.query.teamid;
	var contentid = req.query.contentid;
	var type = req.query.type;	
	var psid = req.query.psid;	
	var tid = req.query.tid;	
	var titleidx = req.query.titleidx	
	var query = {};
	if (provincial != "" && provincial != null) {
			Object.assign(query, {
				Provincial: provincial
			});
		}
	if (contentid != "" && contentid != null && contentid != "0") {
			Object.assign(query, {
				ContentId: Number(contentid)
			});
		}
	if (teamid != "" && teamid != null) {
			Object.assign(query, {
				TeamId: Number(teamid)
			});
		}
	if (titleidx != "" && titleidx != null) {
			Object.assign(query, {
				TitleIdx: Number(titleidx)
			});
		}
	if (type != "" && type != null) {
			Object.assign(query, {
				Type: type
			});
		}
	if (psid != "" && psid != null) {
			Object.assign(query, {
				psid: psid
			});
		}
	if (tid != "" && tid != null) {
			Object.assign(query, {
				TeamPsid: tid
			});
		}
	console.log("getBTCPointLog query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCPointLog(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCPointTeam', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	
	var teamid = req.session.TeamId;
	var contentid = req.query.contentid;	
	var query = {};
	if (contentid != "" && contentid != null && contentid != "0") {
			Object.assign(query, {
				ContentId: Number(contentid)
			});
		}
	
	if (teamid != "" && teamid != null && teamid != 13 && teamid != "13") {
			Object.assign(query, {
				TeamId: Number(teamid)
			});
		}
	console.log("getBTCPointTeam query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCPointTeam(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getMemList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	//var provincial = req.query.provincial;
	var query = {};
	console.log("getMemList");
	objDb.getConnection(function (client) {
		objDb.findMemList(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getMemFile', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	//var provincial = req.query.provincial;
	var query = {};
	console.log("getMemFile");
	objDb.getConnection(function (client) {
		objDb.findMemFile(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getUpList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	var provincial = req.session.Provincial;
	var type = req.session.Type;
	var query = {};
	Object.assign(query, {
			Provincial: provincial
		});
	Object.assign(query, {
			Type: type
		});
	console.log("getUpList");
	objDb.getConnection(function (client) {
		objDb.findUpList(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getUpListAll', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	
	var query = {};
	
	console.log("getUpListAll");
	objDb.getConnection(function (client) {
		objDb.findUpListAll(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getMarkList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	var provincial = req.session.Provincial;
	var type = req.session.Type;
	var query = {};
	Object.assign(query, {
			Provincial: provincial
		});
	Object.assign(query, {
			Type: type
		});
	console.log("getMarkList");
	objDb.getConnection(function (client) {
		objDb.findMarkList(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getMarkListAll', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}

	
	var query = {};
	
	console.log("getMarkListAll");
	objDb.getConnection(function (client) {
		objDb.findMarkListAll(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

/*router.get('/calContent', (req, res) => {
	var query = {};

	objDb.getConnection(function (client) {
		objDb.updateContent(query, client);
		res.send('Ok');
	});
});*/

router.get('/getGeoReport', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var teamid = req.session.TeamId;
	var query = {};
	console.log("getGeoReport: ", teamid);
	/*if (teamid == 13) {
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	var query = {
		Type: type
	};*/
	
	objDb.getConnection(function (client) {
		objDb.findGeoReport(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
	
});

router.get('/getBTCPic', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	if (req.session.Type == 'Cấp tỉnh') {
	var query = {
		GeoCodeProvincial: req.session.GeoCodeProvincial,
		//Type: req.session.Type
			/*Provincial: req.session.Provincial,
			UserName: req.session.Name,
			psid: req.session.psid*/
	};
	console.log("getBTCPic");
	objDb.getConnection(function (client) {
		objDb.findBTCPic(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
	} else {res.send(null);}
});

router.post('/authPic', (req, res) => {

	try {
		let body = req.body;
		var id = body.id;
		var title = body.title;

		var returnMessage = "OK";
		
		var name = req.session.Name;
		var psid = req.session.psid;
		console.log(name + " authPic " + id);
		objDb.getConnection(function (clientDb) {
			objDb.authPic(id, psid, name, clientDb, function (err, rs) {

				if (err) {					
					console.log("authPic ERR:", err);
					//client.close();
					res.send(err);
				} else {
					clientDb.close();
					client.sendText(id, 'Minh chứng cho nội dung ' + title + ' của bạn đã được duyệt bởi ' + name);
					res.send(returnMessage);
				}
			});
		});
		/// end con
	} catch (err) {
		console.error("authPic:", err);
		res.send(null);
	}
});

router.post('/refusePic', (req, res) => {

	try {
		let body = req.body;
		var id = body.id;
		var title = body.title;
		var returnMessage = "OK";
		var name = req.session.Name;
		var psid = req.session.psid;
		console.log(name + " authPic " + id);
		objDb.getConnection(function (clientDb) {
			objDb.refusePic(id, psid, name, clientDb, function (err, rs) {

				if (err) {
					//sendTextMessage(body.psid, 'Echo:' + err);
					console.log("refusePic ERR:", err);
					//client.close();
					res.send(err);
				} else {
					clientDb.close();
					client.sendText(id, 'Minh chứng cho nội dung ' + title + ' của bạn đã bị từ chối bởi ' + name);
					res.send(returnMessage);
				}
			});
		});
		/// end con
	} catch (err) {
		console.error("refusePic:", err);
		res.send(null);
	}
});

router.get('/getBTCTitle', (req, res) => {
	console.log("GetBTCTitle query", req.query);
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var id = req.query.id;
	var contentid = req.query.contentid;
	var name = req.query.name;
	var maxpoint = req.query.maxpoint;
	var teamid = req.query.teamid;
	var teamid2 = req.query.teamid2;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	console.log("GetBTCTitle query", req.query);
	if (id == null || id == 'all')
		id = "";
	if (type == null || type == 'all')
		type = "";
	if (name == null || name == 'all')
		name = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (maxpoint == null || maxpoint == 'all')
		maxpoint = "";
	if (teamid == null || teamid == 'all')
		teamid = "";
	if (teamid2 == null || teamid2 == 'all')
		teamid2 = "";
	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (id != "") {
		Object.assign(query, {
			_id: Number(id)
		});
	}
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}
	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (maxpoint != "") {
		Object.assign(query, {
			MaxPoint: Number(maxpoint)
		});
	}
	if (teamid != "") {
		Object.assign(query, {
			TeamId: Number(teamid)
		});
	}
	if (teamid2 != "") {
		Object.assign(query, {
			TeamId2: Number(teamid2)
		});
	}
	console.log("GetBTCTitle query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCTitle(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getContentPoint', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var teamid = req.session.TeamId;
	console.log("GetReport: ", teamid);
	if (teamid == 13) {
	var ContentId = req.query.ContentId;
	console.log('getContentPoint', ContentId);
	var query = {};

	if (ContentId != "") {
		Object.assign(query, {
			ContentId: Number(ContentId)
		});
		console.log("getContentPoint query", query);
		objDb.getConnection(function (client) {
			//objDb.updateContentId(Number(ContentId), client, function (rs) {
			objDb.findContentPoint(query, client, function (results) {
				client.close();
				res.send(results);
			});
			//	});
		});
	} else {
		res.send(null);
	}
	}
});

router.get('/getContentTeam', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var id = req.query.id;

	var query = {};

	if (id != "") {
		Object.assign(query, {
			_id: Number(id)
		});
	}
	console.log("getContentTeam query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCContent(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCContent', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var contentid = req.query.contentid;
	var name = req.query.name;
	var code = req.query.code;
	console.log('query.type', req.query.type);
	console.log('session.ViewType', req.session.ViewType);
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;

	var teamid = "";
	if (req.session.IsAdmin != true && req.session.TeamId != null && req.session.Type == "Cấp Trung Ương" && req.session.TeamId != '13') {
		teamid = req.session.TeamId;
		
	}

	if (contentid == null || contentid == 'all')
		contentid = "";
	if (name == null || name == 'all')
		name = "";
	if (code == null || code == 'all')
		code = "";
	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (code != "") {
		code = ".*" + code + ".*";
		Object.assign(query, {
			Code: {
				$regex: code
			}
		});
	}
	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (teamid != "") {
		Object.assign(query, {
			"BTCTitle.TeamId": Number(teamid)
		});
	}
	if (type != "") {
		Object.assign(query, {
			"Type": type
		});
	}
	console.log("getBTCContent query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCContent(query, client, function (results) {
			client.close();
			console.log("getBTCContent results", results);
			res.send(results);
		});
	});
});

router.get('/getBTCContentSmart', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var id = req.query.id;
	var name = req.query.name;
	var code = req.query.code;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;

	var teamid = "";
	if (req.session.IsAdmin != true && req.session.TeamId != null && req.session.Type == "Cấp Trung Ương" && req.session.TeamId != "13") {
		teamid = req.session.TeamId;
	}

	if (id == null || id == 'all')
		id = "";
	if (name == null || name == 'all')
		name = "";
	if (code == null || code == 'all')
		code = "";
	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (code != "") {
		code = ".*" + code + ".*";
		Object.assign(query, {
			Code: {
				$regex: code
			}
		});
	}
	if (id != "") {
		Object.assign(query, {
			_id: Number(id)
		});
	}
	if (teamid != "") {
		Object.assign(query, {
			"BTCTitle.TeamId": Number(teamid)
		});
	}
	console.log("getBTCContentSmart query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCContentSmart(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getTeam', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var id = req.query.id;
	var name = req.query.name;

	if (id == null || id == 'all')
		id = "";
	if (name == null || name == 'all')
		name = "";
	var query = {};

	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (id != "") {
		Object.assign(query, {
			_id: Number(id)
		});
	}
	console.log("getTeam query", query);
	objDb.getConnection(function (client) {
		objDb.findTeam(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCContentAll', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var id = req.query.id;
	var name = req.query.name;
	var code = req.query.code;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	if (id == null || id == 'all')
		id = "";
	if (name == null || name == 'all')
		name = "";
	if (code == null || code == 'all')
		code = "";
	var query = {};

	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (code != "") {
		code = ".*" + code + ".*";
		Object.assign(query, {
			Code: {
				$regex: code
			}
		});
	}
	if (id != "") {
		Object.assign(query, {
			ContentId: Number(id)
		});
	}
	if (type != "") {
		Object.assign(query, {
			"Type": type
		});
	}
	console.log("getBTCContentAll query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCContent(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCContentList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	objDb.getConnection(function (client) {
		objDb.findBTCContent(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	console.log("getBTCList query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCList(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getProvincialById', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var teamid = "";
	if (req.session.IsAdmin != true && req.session.TeamId != null && req.session.Type == "Cấp Trung Ương") {
		teamid = req.session.TeamId;
	}
	var query = {};
	if (teamid != "" && teamid < 13 && teamid != 10) {
		Object.assign(query, {
			"TeamId": Number(teamid)
		});
	}
	console.log("getProvincial query", query);
	objDb.getConnection(function (client) {
		objDb.findProvincial(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getProvincial', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	console.log("getProvincial query", query);
	objDb.getConnection(function (client) {
		objDb.findProvincial(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

//Toanva add getkeyCMS
router.post('/getkeyCMS', function (req, res) {
	//let body = req.body;
	//if (req.session.cms_key == null) {
	//    req.session.cms_key = req.sessionID;
	res.send(req.sessionID);
	//}
	//else {
	//    res.send(req.session.cms_key);
	//}
});
//Toanva add getMemberCMS
router.get('/getMemberCMS', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var name = req.query.name;
	var psid = req.query.psid;
	var provincial = req.query.provincial;
	var districts = req.query.districts;
	var wards = req.query.wards;
	var position = req.query.position;
	var level = req.query.level;
	var layer = req.query.layer;
	var blockstatus = req.query.blockstatus;
	var phone = req.query.phone;
	if (psid == null || psid == 'all')
		psid = "";
	if (name == null || name == 'all')
		name = "";
	if (provincial == null || provincial == 'all' || provincial == 'NA')
		provincial = "";
	if (districts == null || districts == 'all' || districts == 'NA')
		districts = "";
	if (wards == null || wards == 'all' || wards == 'NA')
		wards = "";
	if (position == null || position == 'all' || position == 'NA')
		position = "";
	if (level == null || level == 'all' || level == 'NA')
		level = "";
	if (layer == null || layer == 'all' || layer == 'NA')
		layer = "";
	if (blockstatus == null || blockstatus == 'all')
		blockstatus = "";
	if (phone == null || phone == 'all')
		phone = "";
	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}
	if (blockstatus != "") {
		Object.assign(query, {
			BlockStatus: blockstatus
		});
	}
	if (phone != "") {
		phone = ".*" + phone + ".*";
		Object.assign(query, {
			Phone: {
				$regex: phone
			}
		});
	}

	if (provincial != "") {
		Object.assign(query, {
			Provincial: provincial
		});
	}
	if (districts != "") {
		Object.assign(query, {
			District: districts
		});
	}
	if (wards != "") {
		Object.assign(query, {
			Ward: wards
		});
	}
	if (position != "") {
		Object.assign(query, {
			Position: position
		});
	}
	Object.assign(query, {
		Type: "Candidates"
	});
	console.log("GetMemberCMS query", query);
	objDb.getConnection(function (client) {
		objDb.findMembers(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
//Toanva add getMemberBTC
router.get('/getMemberBTC', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	var psid = req.query.psid == null ? req.session.psid : req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}
	console.log("GetMemberBTC query", query);
	objDb.getConnection(function (client) {
		objDb.findMembersBTC(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
router.get('/getMemberBTCList', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};	
	
	objDb.getConnection(function (client) {
		objDb.findMembersBTC(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
router.get('/getMemberNMC', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	var psid = req.query.psid == null ? req.session.psid : req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}
	console.log("GetMemberBTC query", query);
	objDb.getConnection(function (client) {
		objDb.findMembersNMC(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
router.post('/getMemberBTCId', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var query = {};
	let body = req.body;
	var psid = body.psid;	
	
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}
	console.log("GetMemberBTCId query", query);
	objDb.getConnection(function (client) {
		objDb.findMembersNMC(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
//Toanva getMemberBTC end

//Toanva add getMemberSendMessage
router.get('/getMemberSendMessage', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var name = req.query.name;
	var psid = req.query.psid;
	var type = req.query.type;
	var phone = req.query.phone;
	var schools = req.query.schools;
	var placeofcontest = req.query.placeofcontest;
	if (psid == null || psid == 'all')
		psid = "";
	if (name == null || name == 'all')
		name = "";
	if (phone == null || phone == 'all')
		phone = "";
	if (type == null || type == 'all')
		type = "";
	if (schools == null || schools == 'all')
		schools = "";
	if (placeofcontest == null || placeofcontest == 'all')
		placeofcontest = "";

	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}

	if (phone != "") {
		phone = ".*" + phone + ".*";
		Object.assign(query, {
			Phone: {
				$regex: phone
			}
		});
	}

	if (placeofcontest != "") {
		placeofcontest = ".*" + placeofcontest + ".*";
		Object.assign(query, {
			PlaceOfContest: {
				$regex: placeofcontest
			}
		});
	}

	if (schools != "") {
		schools = ".*" + schools + ".*";
		Object.assign(query, {
			Schools: {
				$regex: schools
			}
		});
	}

	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}

	console.log("GetMemberCMS query", query);
	objDb.getConnection(function (client) {
		objDb.findMembersBTC(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});
//Toanva getMemberSendMessage end
router.get('/getListMemberKsv', (req, res) => {

	var psid = req.query.psid;
	console.log("getListMemberKsv psid: ", psid);

	var query = {
		_id: psid
	};
	console.log("getListMemberKsv query: ", query);
	objDb.getConnection(function (client) {
		objDb.findMembers(query, client, function (results) {
			if (results.length > 0) {
				results = results[0];

				var queryDetail = {
					_id: {
						$ne: psid
					}
				}; /////Loại bỏ chính mình ra khỏi danh sách
				////layerDelegatelayer- Delegate , được ủy quyền để tăng 1 cấp layer
				if (results.Delegate == null) {
					results.Delegate = 0;
				}
				var layerDelegate = Number(results.Layer) - Number(results.Delegate);
				if (layerDelegate < 0) {
					layerDelegate = 0; // chỉ cho Ủy quyền đến cấp admin
				}
				console.log("getListMemberKsv layerDelegate: ", layerDelegate);
				if (results.BlockStatus == "ACTIVE" && results.Layer == results.Level) {
					console.log("getListMemberDelegate Level : ", results.Level);
					///// layer+1 + va + ủy quyền để thấy dưới 1 lớp
					var layer = layerDelegate + 1;
					//var layer = Number(results.Layer) + 1;

					if (results.Level == 1 || results.Level == 0) {
						results.Provincial = "";
						results.District = "";
						results.Ward = "";

					}
					///// Lấy ra thành viên cùng lớp

					if (results.Level == 1) {
						////// Lấy cả layer = 1 và layer =2
						Object.assign(queryDetail, {
							$or: [{
								Layer: 2
							}, {
								Layer: 1
							}]
						});
					} else {
						/// Lấy leyer dưới 1 cấp
						if (results.Layer != undefined && results.Layer != "" && layer != 1 && layer != 0) {
							Object.assign(queryDetail, {
								Layer: Number(layer)
							});
						}
					}
					if (layer != 1 && layer != 0) {
						if (results.Provincial != "") {
							Object.assign(queryDetail, {
								Provincial: results.Provincial
							});
						}
						if (results.District != "") {
							Object.assign(queryDetail, {
								District: results.District
							});
						}
						if (results.Ward != "") {
							Object.assign(queryDetail, {
								Ward: results.Ward
							});
						}
					}
					//					Object.assign(queryDetail, {
					//						BlockStatus: 'ACTIVE'
					//					});
					console.log("getListMemberDelegate query detail", queryDetail);
					objDb.findMembers(queryDetail, client, function (resultsList) {
						client.close();
						res.send(resultsList);
					});
				} else {
					client.close();
					res.send(null);
				}


			} else {
				client.close();
				res.send(results);
			}
		});
	});
});

router.get('/logoutCMS', function (req, res) {
	req.session.destroy();
	res.send("logout success!");
});

//Toanva add loginCMS
router.post('/loginCMS', function (req, res) {
	let body = req.body;
	var bytes = Cryptojs.AES.decrypt(body.data, req.sessionID);
	var decryptedData = JSON.parse(bytes.toString(Cryptojs.enc.Utf8));
	if (!decryptedData.UserName || !decryptedData.Password) {
		console.log("loginCMS failed");
		res.send('Mật khẩu hoạc tài khoản không đúng');
	} else {
		console.log("loginCMS:", decryptedData.UserName);
		var pipeline =[{
			$match: {
				Password: Cryptojs.MD5(decryptedData.Password + SALT).toString()
			}
		},{
			$lookup:{
				from: "MemberBTC",
				localField: "_id",
				foreignField: "_id",
				as: "mem"
			}
		}]
		objDb.getConnection(function (client) {
			objDb.AGGBTCOTP(pipeline, client, function (results) {
				client.close();
				var username = decryptedData.UserName;
				result = (results&& results.length==1)? results[0]:false;
				var usernameCond = (result) && (result.mem.length == 1) && (result.mem[0].Email == username || result.mem[0].Phone == username || result.mem[0]._id == username)
				if (usernameCond) {
					console.log("loginCMS success");
					req.session.cookie.maxAge = 12 * 60 * 60 * 1000;
					req.session.Name = results[0].Name;
					req.session.psid = results[0]._id;
					req.session.Provincial = results[0].Provincial;
					req.session.GeoCodeProvincial = results[0].GeoCodeProvincial;
					req.session.Type = results[0].Type;
					req.session.ViewType = results[0].Type;
					req.session.Team = results[0].Team;
					req.session.TeamId = results[0].TeamId;
					req.session.IsAdmin = results[0].IsAdmin;
					req.session.admin = true;
					console.log("session.admin", req.session.admin);
					req.session.faceUser = true;
					res.json({
						success: "true",
						message: 'Đăng nhập thành công',
						result: results[0]
					});
				} else {
					console.log("loginCMS failed");
					res.json({
						success: "false",
						message: 'Mật khẩu hoạc tài khoản không đúng'
					});
				}
			});
		});
	}
});

router.post('/unitloginCMS', function (req, res) {
	let body = req.body;
	var bytes = Cryptojs.AES.decrypt(body.data, req.sessionID);
	var decryptedData = JSON.parse(bytes.toString(Cryptojs.enc.Utf8));
	if (!decryptedData.OTP || !decryptedData.psid) {
		console.log("loginCMS failed");
		res.send('Mật khẩu hoặc tài khoản không đúng');
	} else {
		console.log("loginCMS OTP:", decryptedData.OTP);
		console.log("loginCMS psid:", decryptedData.psid);
		var query = {
			_id: decryptedData.psid,
			// OTP: Number(decryptedData.OTP),
			// BlockStatus: 'PENDING'
		}
		objDb.getConnection(function (client) {
			objDb.findBTCOTP(query, client, function (results) {
				if (results !== null && results.length > 0) {
					console.log("loginCMS success");
					var objBtcOtp = {};
					objBtcOtp.psid = decryptedData.psid;
					objBtcOtp.OTP = decryptedData.OTP;
					objDb.updateBtcOtp(objBtcOtp, client, function (results) {
						client.close();
					});
					req.session.cookie.maxAge = 12 * 60 * 60 * 1000;					
					req.session.Name = results[0].Name;
					req.session.psid = results[0]._id;
					req.session.Provincial = results[0].Provincial;
					req.session.GeoCodeProvincial = results[0].GeoCodeProvincial;
					req.session.Type = results[0].Type;
					req.session.ViewType = results[0].Type;
					req.session.Team = results[0].Team;
					req.session.TeamId = results[0].TeamId;
					req.session.IsAdmin = results[0].IsAdmin;
					req.session.admin = true;
					console.log("session.admin", req.session.admin);
					req.session.faceUser = true;
					res.json({
						result: results[0],
						success: "true",
						message: 'Đăng nhập thành công'
					});
				} else {
					client.close();
					console.log("unitloginCMS failed");
					res.json({
						success: "false",
						message: 'Phiên đăng nhập đã hết hạn. Mời bạn gõ btc để mở phiên đăng nhập mới nhé'
					});
				}
			});
		});
	}
});

router.post('/loginPhone', function (req, res) {
	let body = req.body;
	var bytes = Cryptojs.AES.decrypt(body.data, req.sessionID);
	var decryptedData = JSON.parse(bytes.toString(Cryptojs.enc.Utf8));
	if (!decryptedData.UserName || !decryptedData.Password) {
		console.log("loginCMS failed");
		res.send('Mật khẩu hoặc số điện thoại không đúng');
	} else {
		console.log("loginCMS OTP:", decryptedData.UserName);
		console.log("loginCMS psid:", decryptedData.Password);
		var query = {
			Phone: decryptedData.UserName,
			Password: decryptedData.Password
			// BlockStatus: 'PENDING'
		}
		objDb.getConnection(function (client) {
			objDb.findMemberBTC(query, client, function (results) {
				if (results !== null && results.length > 0) {
					console.log("loginCMS success");					
					req.session.cookie.maxAge = 12 * 60 * 60 * 1000;
					req.session.Name = results[0].Name;
					req.session.psid = results[0]._id;
					req.session.Provincial = results[0].Provincial;
					req.session.GeoCodeProvincial = results[0].GeoCodeProvincial;
					req.session.Type = results[0].Type;
					req.session.ViewType = results[0].Type;
					req.session.Team = results[0].Team;
					req.session.TeamId = results[0].TeamId;
					req.session.IsAdmin = results[0].IsAdmin;
					req.session.admin = true;
					console.log("session.admin", req.session.admin);
					req.session.faceUser = true;
					res.json({
						result: results[0],
						success: "true",
						message: 'Đăng nhập thành công'
					});
				} else {
					client.close();
					console.log("unitloginCMS failed");
					res.json({
						success: "false",
						message: 'Phiên đăng nhập đã hết hạn. Mời bạn gõ btc để mở phiên đăng nhập mới nhé'
					});
				}
			});
		});
	}
});

router.get('/getMemberByGroup', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var code = req.query.code;
	var options = {};
	var pipeline = [];
	if (code == "day") {
		pipeline = [{
			$match: {
				Type: "Candidates"
			}
		}, {
			"$group": {
				_id: {
					date: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$InsertDate"
						}
					}
				},
				count: {
					$sum: 1
				}
			}
		}, {
			"$sort": {
				"_id.date": 1
			}
		}, {
			"$project": {
				"_id": 0,
				"Date": "$_id.date",
				"Total": "$count"
			}
		}];
	}
	console.log("getMemberByGroup", code);
	objDb.getConnection(function (client) {
		objDb.findMembersByGroup(pipeline, options, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getSumpointByProvincalTeam', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var options = {};
	var pipeline = [];
	pipeline = [{
		"$group": {
			_id: {
				GeoCode: "$GeoCodeProvincial",
				TeamId: "$TeamId",
			},
			SumPoint: {
				$sum: "$Point"
			},
			SumTeamPoint: {
				$sum: "$TeamPoint"
			}
		}
	}];

	objDb.getConnection(function (client) {
		objDb.findSumpointByProvincalTeam(pipeline, options, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getUserByGroup', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var code = req.query.code;
	var options = {};
	var pipeline = [];
	if (code == "day") {
		pipeline = [{
			"$group": {
				_id: {
					date: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$InsertDate"
						}
					}
				},
				count: {
					$sum: 1
				}
			}
		}, {
			"$sort": {
				"_id.date": 1
			}
		}, {
			"$project": {
				"_id": 0,
				"Date": "$_id.date",
				"Total": "$count"
			}
		}];
	}
	console.log("getUserByGroup", code);
	objDb.getConnection(function (client) {
		objDb.findMembersByGroup(pipeline, options, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.post('/sendMessageToMember', function (req, res) {
	let body = req.body;

	var msg = body.Msg;
	//console.log("PAGE_ACCESS_TOKEN: ", PAGE_ACCESS_TOKEN);
	console.log("Send message text: ", msg);
	var qk = {
		quick_replies: [{
			content_type: 'text',
			title: 'Quay về menu',
			payload: 'menu',
		}, ]
	};
	var arr = [];
	var name = body.name;
	console.log("query name: ", name);
	//var psid = body.psid;
	var provincial = body.provincial;
	var phone = body.phone;
	// var schools = body.schools;
	/// var placeofcontest = body.placeofcontest;
	if (name == null || name == 'all')
		name = "";
	if (phone == null || phone == 'all')
		phone = "";
	if (provincial == null || provincial == 'all')
		provincial = "";

	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (phone != "") {
		phone = ".*" + phone + ".*";
		Object.assign(query, {
			Phone: {
				$regex: phone
			}
		});
	}
	if (provincial != "") {
		//  provincial = ".*" + provincial + ".*";
		Object.assign(query, {
			Provincial: provincial
		});
	}
	Object.assign(query, {
		Type: 'Cấp tỉnh'
	});
	//console.log("accc:",PAGE_ACCESS_TOKEN);
	objDb.getConnection(function (clientDB) {
		objDb.findMemberBTC(query, clientDB, function (results) {
			clientDB.close();
			console.log("Total member: ", results.length);
			//2066859706671769 psid toanva
			//Test messae
			// client.sendText("1773134266068760", 'Test');
			//Test messae
			//arr.push(MessengerBatch.sendText("2066859706671769", msg, qk));
			///client.sendBatch(arr);
			//console.log("Send member: ", arr);
			//console.log("Send member: ", arr.length);

			var j = 0;
			for (var i = 0; i < results.length; i++) {

				console.log("add member: ", results[i]._id);
				var id = results[i]._id.toString();

				//arr.push(MessengerBatch.sendText("1977422088947151", msg,qk));
				//			startMiniGame02(id,'8888');
				arr.push(MessengerBatch.sendText(id, msg));
				if (j == 5) {
					j = 0;
					client.sendBatch(arr);
					console.log("Send member: ", arr.length);
					arr = [];
				} else if ((results.length - i) < 5) {
					j = 0;
					client.sendBatch(arr);
					arr = [];
					console.log("Total Send member: ", i);
				}
				j++;
			}
			res.json({
				success: "true",
				message: 'Đã gửi ' + results.length + ' tin nhắn thành công'
			});
		});
	});
});
router.get('/getMemberSendMessage', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var name = req.query.name;
	var psid = req.query.psid;
	var type = req.query.type;
	var phone = req.query.phone;
	var schools = req.query.schools;
	var placeofcontest = req.query.placeofcontest;
	if (psid == null || psid == 'all')
		psid = "";
	if (name == null || name == 'all')
		name = "";
	if (phone == null || phone == 'all')
		phone = "";
	if (type == null || type == 'all')
		type = "";
	if (schools == null || schools == 'all')
		schools = "";
	if (placeofcontest == null || placeofcontest == 'all')
		placeofcontest = "";

	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}
	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}

	if (phone != "") {
		phone = ".*" + phone + ".*";
		Object.assign(query, {
			Phone: {
				$regex: phone
			}
		});
	}

	if (placeofcontest != "") {
		placeofcontest = ".*" + placeofcontest + ".*";
		Object.assign(query, {
			PlaceOfContest: {
				$regex: placeofcontest
			}
		});
	}

	if (schools != "") {
		schools = ".*" + schools + ".*";
		Object.assign(query, {
			Schools: {
				$regex: schools
			}
		});
	}

	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}

	console.log("GetMemberCMS query", query);
	objDb.getConnection(function (client) {
		objDb.findMembers(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getRedeemGifts', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var name = req.query.name;
	var psid = req.query.psid;
	var status = req.query.status;
	var value = req.query.value;

	if (psid == null || psid == 'all')
		psid = "";
	if (name == null || name == 'all')
		name = "";
	if (status == null || status == 'all')
		status = "";
	if (value == null || value == 'all')
		value = "";

	var query = {};
	if (name != "") {
		name = ".*" + name + ".*";
		Object.assign(query, {
			Name: {
				$regex: name
			}
		});
	}

	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}

	if (value != "") {
		Object.assign(query, {
			PointValue: Number(value)
		});
	}

	if (status != "") {
		Object.assign(query, {
			Status: status
		});
	}

	console.log("getRedeemGifts query", query);
	objDb.getConnection(function (client) {
		objDb.findRedeemGifts(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCRequire', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var titleid = req.query.titleid;
	var uploadfile = req.query.uploadfile;
	var typename = req.query.typename;
	var note = req.query.note;
	var psid = req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (typename == null || typename == 'all')
		typename = "";
	if (uploadfile == null || uploadfile == 'all')
		uploadfile = "";
	if (note == null || note == 'all')
		note = "";
	if (titleid == null || titleid == 'all')
		titleid = "";
	var query = {};

	if (titleid != "") {
		Object.assign(query, {
			TitleId: Number(titleid)
		});
	}

	if (typename != "") {
		typename = ".*" + typename + ".*";
		Object.assign(query, {
			TypeName: {
				$regex: typename
			}
		});
	}

	if (uploadfile != "") {
		Object.assign(query, {
			UploadFile: uploadfile
		});
	}

	if (psid != "") {
		Object.assign(query, {
			_id: psid
		});
	}

	if (note != "") {
		note = ".*" + note + ".*";
		Object.assign(query, {
			Note: {
				$regex: note
			}
		});
	}

	console.log("getBTCRequire query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCRequire(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.post('/updateStatusGift', function (req, res) {
	let body = req.body;
	var giftcode = body.GiftCode;

	objDb.getConnection(function (client) {
		console.log("GiftCode: ", giftcode);
		//Update
		objDb.updateStatusGift(giftcode, client, function (err, results) {
			if (err) {
				console.log("Update Status Gift Error ", err);
				res.json({
					success: "false",
					message: err
				});
			} else {
				res.json({
					success: "true",
					message: "Duyệt thành công"
				});
				console.log("Update Status Gift Success");
			}
			console.log("editUser: Close Connction")
			client.close();
		});

	});
});

router.get('/getBTCFile', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	if (type!="Cấp tỉnh") geocodeprovincial = "VN-HN";
	var contentid = req.query.contentid;
	var titleid = req.query.titleid;
	var requireid = req.query.requireid;
	var psid = req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (type == null || type == 'all')
		type = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (titleid == null || titleid == 'all')
		titleid = "";
	if (requireid == null || requireid == 'all')
		requireid = "";
	var query = {};

	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}
	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (titleid != "") {
		Object.assign(query, {
			TitleId: Number(titleid)
		});
	}
	if (requireid != "") {
		Object.assign(query, {
			RequireId: Number(requireid)
		});
	}
	if (geocodeprovincial != "") {
		geocodeprovincial = ".*" + geocodeprovincial + ".*";
		Object.assign(query, {
			GeoCodeProvincial: {
				$regex: geocodeprovincial
			}
		});
	}

	if (psid != "") {
		Object.assign(query, {
			psid: psid
		});
	}

	console.log("getBTCFile query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCFile(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCFileLog', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	var contentid = req.query.contentid;
	var titleid = req.query.titleid;
	var requireid = req.query.requireid;
	var psid = req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (type == null || type == 'all')
		type = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (titleid == null || titleid == 'all')
		titleid = "";
	if (requireid == null || requireid == 'all')
		requireid = "";
	var query = {};
	Object.assign(query, {
			DeletedDate: {$exists:true}
		});
	Object.assign(query, {
			DeletedUserName: {$exists:true}
		});
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}
	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (titleid != "") {
		Object.assign(query, {
			TitleId: Number(titleid)
		});
	}
	if (requireid != "") {
		Object.assign(query, {
			RequireId: Number(requireid)
		});
	}
	if (geocodeprovincial != "") {
		geocodeprovincial = ".*" + geocodeprovincial + ".*";
		Object.assign(query, {
			GeoCodeProvincial: {
				$regex: geocodeprovincial
			}
		});
	}

	if (psid != "") {
		Object.assign(query, {
			psid: psid
		});
	}

	console.log("getBTCFile query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCFileLog(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.post('/getBTCFileSmart', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	var contentid = req.query.contentid;
	var pointid = req.query.pointid;
	var psid = ""; //req.query.psid;
	
	if (psid == null || psid == 'all')
		psid = "";
	if (type == null || type == 'all')
		type = "";
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (pointid == null || pointid == 'all')
		pointid = "";
	var query = {};

	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (pointid != "") {
		Object.assign(query, {
			PointId: Number(pointid)
		});
	}
	if (geocodeprovincial != "") {
		geocodeprovincial = ".*" + geocodeprovincial + ".*";
		Object.assign(query, {
			GeoCodeProvincial: {
				$regex: geocodeprovincial
			}
		});
	}

	if (psid != "") {
		Object.assign(query, {
			psid: psid
		});
	}
	
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}

	console.log("getBTCFileSmart query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCFileSmart(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.get('/getBTCSumaryFile', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;

	if (type == null || type == 'all')
		type = "";

	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	var query = {};
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}
	if (geocodeprovincial != "") {
		geocodeprovincial = ".*" + geocodeprovincial + ".*";
		Object.assign(query, {
			GeoCodeProvincial: {
				$regex: geocodeprovincial
			}
		});
	}

	console.log("getBTCSumaryFile query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCSumaryFile(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.post('/getBTCPoint', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	if (type!="Cấp tỉnh") geocodeprovincial = "VN-HN";
	var contentid = req.query.contentid;
	var titleid = req.query.titleid;
	var psid = req.query.psid;

	if (psid == null || psid == 'all')
		psid = "";
	if (type == null || type == 'all')
		type = "";
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (titleid == null || titleid == 'all')
		titleid = "";

	var query = {};

	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (titleid != "") {
		Object.assign(query, {
			TitleId: Number(titleid)
		});
	}
	if (geocodeprovincial != "") {
		Object.assign(query, {
			GeoCodeProvincial: geocodeprovincial
		});
	}
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}

	if (psid != "") {
		Object.assign(query, {
			psid: psid
		});
	}

	console.log("getBTCPoint query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCPoint(query, client, function (results) {
			client.close();
			res.send(results);
		});
	});
});

router.post('/getBTCPointSmart', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	var contentid = req.query.contentid;
	//var id = Number(req.query.id);
	var psid = req.query.psid;
	var teamid = "";
	console.log("IsAdmin query", req.session.IsAdmin);
	if ((req.session.TeamId != '' && req.session.TeamId != '0' && req.session.TeamId != 13) && req.session.IsAdmin != true) {
		teamid = Number(req.session.TeamId);
	}
	if (type == null || type == 'all')
		type = "";
	if (psid == null || psid == 'all')
		psid = "";
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	/*if (id == null || id == 'all')
		id = "";*/

	var query = {};

	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (teamid != "") {
		Object.assign(query, {
			TeamId: Number(teamid)
		});
	}
	/*if (id != "") {
		Object.assign(query, {
			_id: Number(id)
		});
	}*/
	if (geocodeprovincial != "") {
		Object.assign(query, {
			GeoCodeProvincial: geocodeprovincial
		});
	}
	
	if (type != "") {
		Object.assign(query, {
			Type: type
		});
	}

	if (psid != "") {
		Object.assign(query, {
			psid: psid
		});
	}

	console.log("getBTCPointSmart query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCPointSmart(query, client, function (results) {
			client.close();
			console.log("getBTCPointSmart results", results.length);
			res.send(results);
		});
	});
});

router.post('/getBTCPointSmartTeam', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	
	
	var contentid = req.query.contentid;
	//var id = Number(req.query.id);
	var psid = req.query.psid;
	var teamid = req.query.teamid;
	
	if (teamid == null || teamid == 'all')
		teamid = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	/*if (id == null || id == 'all')
		id = "";*/

	var query = {};

	if (contentid != "") {
		Object.assign(query, {
			ContentId: Number(contentid)
		});
	}
	if (teamid != "") {
		Object.assign(query, {
			TeamId: Number(teamid)
		});
	}
	

	console.log("getBTCPointSmart query", query);
	objDb.getConnection(function (client) {
		objDb.findBTCPointSmart(query, client, function (results) {
			client.close();
			console.log("getBTCPointSmart results", results.length);
			res.send(results);
		});
	});
});

router.post('/insertBTCPointSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		//objFileUpload._id = 1;
		objPoint.Note = body.Note;
		objPoint.Des = body.Des;
		objPoint.ContentId = Number(body.ContentId);
		objPoint.Point = Number(body.Point);
		objPoint.TeamPoint = 0;
		objPoint.DiffPoint = 0 - objPoint.Point;
		objPoint.MaxPoint = Number(body.MaxPoint);
		objPoint.TeamId = Number(body.TeamId);
		objPoint.TeamName = body.TeamName;
		objPoint.psid = body.psid == null ? req.session.psid : body.psid;
		objPoint.UserName = req.session.Name;
		objPoint.GeoCodeProvincial = req.session.GeoCodeProvincial;
		objPoint.Type = req.session.ViewType;
		objPoint.Provincial = req.session.Provincial;
		objPoint.InputDate = inputDate;
		
		objDb.getConnection(function (client) {
			objDb.getNextSequenceValue('Point', client, function (er, rs) {
				//Insert BTCFile
				objPoint._id = rs.value.sequence_value;
				//console.log("BTCFile: ", objFileUpload);
				objDb.insertBTCPointSmart(objPoint, client, function (err, results) {
					if (err) {
						console.log("Insert BTCPointSmart Error ", err);
						res.json({
							success: "false",
							message: err
						});
						client.close();
					} else {
						res.json({
							success: "true",
							message: "Gửi thành công"
						});
						console.log("Insert BTCPointSmart Success");
						/*objDb.updateReportSmart(pipeline, options, client, function (err, results) {
							console.log("Update Report");
							client.close();
						});*/
						client.close();
					}
				});
			});
		});
	} catch (caerr) {
		console.error("insertBTCPointSmart:", caerr);
	}
});

router.post('/updateBTCPointSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		objPoint._id = Number(body._id);
		objPoint.Note = body.Note;
		objPoint.Des = body.Des;
		objPoint.ContentId = Number(body.ContentId);
		objPoint.Point = Number(body.Point);
		objPoint.MaxPoint = Number(body.MaxPoint);
		objPoint.TeamId = Number(body.TeamId);
		objPoint.TeamName = body.TeamName;
		objPoint.psid = body.psid == null ? req.session.psid : body.psid;
		objPoint.UserName = req.session.Name;
		objPoint.GeoCodeProvincial = req.session.GeoCodeProvincial;
		objPoint.Type = req.session.ViewType;
		objPoint.Provincial = req.session.Provincial;
		objPoint.InputDate = inputDate;
		
		objDb.getConnection(function (client) {
			//Update BTCFile
			objDb.updateBTCPointSmart(objPoint, client, function (err, results) {
				if (err) {
					console.log("Update BTCPointSmart Error ", err);
					res.json({
						success: "false",
						message: err
					});
					client.close();
				} else {
					res.json({
						success: "true",
						message: "Cập nhật thành công"
					});
					console.log("Update BTCPointSmart success");
					/*objDb.updateReportSmart(pipeline, options, client, function (err, results) {
						console.log("Update Report");
						client.close();
					});*/
					client.close();
				}
			});

		});
	} catch (caerr) {
		console.error("updateBTCPointSmart:", caerr);
	}
});

router.post('/teamupdateBTCPointSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		objPoint._id = Number(body._id);
		objPoint.TeamId = Number(body.TeamId == null ? req.session.TeamId : body.TeamId);
		objPoint.TeamName = req.session.Team;
		objPoint.TeamPsid = body.psid == null ? req.session.psid : body.psid;
		objPoint.TeamUserName = req.session.Name;
		objPoint.Type = req.session.ViewType;
		objPoint.Point = Number(body.Point);
		objPoint.TeamPoint = Number(body.TeamPoint);
		objPoint.DiffPoint = Number(body.DiffPoint);
		objPoint.TeamNote = body.TeamNote;
		objPoint.UpdateDate = inputDate;
		if (objPoint.Type=="Cấp tỉnh")
			objPoint.GeoCodeProvincial = body.GeoCodeProvincial;
		
		//objPoint.ApprovePsid = objPoint.TeamPsid
		//objPoint.ApproveUserName = objPoint.TeamUserName;
		//objPoint.ApproveStatus = body.ApproveStatus;
		//objPoint.ApproveDate = inputDate;
		var pipeline = [];
		/*pipeline = [{
			$match: {
				GeoCodeProvincial: objPoint.GeoCodeProvincial
			}
		}, {
			"$group": {
				_id: {
					GeoCodeProvincial: "$GeoCodeProvincial"
				},
				TotalPoint: {
					$sum: "$Point"
				},
				TotalTeamPoint: {
					$sum: "$TeamPoint"
				}
			}
		}];
		var options = {};*/
		objDb.getConnection(function (client) {
			//Update BTCFile
			objDb.teamupdateBTCPointSmart(objPoint, client, function (err, results) {
				if (err) {
					console.log("Team Update BTCPointSmart Error ", err);
					res.json({
						success: "false",
						message: err
					});
					client.close();
				} else {
					res.json({
						success: "true",
						message: "Cập nhật thành công"
					});
					console.log("Team Update BTCPointSmart success");
					/*objDb.updateReportSmart(pipeline, options, client, function (err, results) {
						console.log("Update Report");
						client.close();
					});*/
					client.close();
				}
			});

		});
	} catch (caerr) {
		console.error("teamupdateBTCPointSmart:", caerr);
	}
});

router.post('/teamupdateStatusBTCPointSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		objPoint._id = Number(body._id);
		objPoint.GeoCodeProvincial = body.GeoCodeProvincial;		
		objPoint.ContentId = Number(body.ContentId);
		objPoint.TeamId = Number(body.TeamId == null ? req.session.TeamId : body.TeamId);
		objPoint.TeamName = req.session.Team;
		objPoint.Type = req.session.ViewType;
		objPoint.TeamPsid = body.psid == null ? req.session.psid : body.psid;
		objPoint.TeamUserName = req.session.Name;
		//objPoint.Point = Number(body.Point);
		//objPoint.TeamPoint = Number(body.TeamPoint);
		//objPoint.DiffPoint = Number(body.DiffPoint);
		objPoint.TeamNote = body.TeamNote;
		objPoint.UpdateDate = inputDate;
		objPoint.ApprovePsid = objPoint.TeamPsid
		objPoint.ApproveUserName = objPoint.TeamUserName;
		objPoint.ApproveStatus = body.ApproveStatus;
		objPoint.ApproveDate = inputDate;
		/*var pipeline = [];
		pipeline = [
		    { $match: { GeoCodeProvincial: objPoint.GeoCodeProvincial}},
		    {
		        "$group": {
		            _id: {
		                GeoCodeProvincial: "$GeoCodeProvincial"
		            },
		            TotalPoint: { $sum: "$Point" },
		            TotalTeamPoint: { $sum: "$TeamPoint" }
		        }
		    }];
		var options = {};*/
		objDb.getConnection(function (client) {
			console.log("Update status BTCPointSmart: ", objPoint);
			//Update
			objDb.updateStatusBTCPointSmart(objPoint, client, function (err, results) {
				if (err) {
					console.log("Update status BTCPointSmart Error ", err);
					res.json({
						success: "false",
						message: err
					});

				} else {
					res.json({
						success: "true",
						message: "Cập nhật thành công"
					});
					console.log("Update BTCPointSmart success");
					/*objDb.updateReportSmart(pipeline, options, client, function (err, results) {
					                           console.log("Update Report");
					    client.close();
					});*/
				}
				client.close();
			});
		});
	} catch (caerr) {
		console.error("teamupdateStatusBTCPointSmart:", caerr);
	}
});

router.post('/insertBTCFile', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objFileUpload = {};
		//objFileUpload._id = 1;
		objFileUpload.ContentId = Number(body.ContentId);
		objFileUpload.TitleId = Number(body.TitleId);
		objFileUpload.TitleIdx = Number(body.TitleIdx);
		objFileUpload.RequireId = Number(body.RequireId);
		objFileUpload.FileName = body.FileName;
		objFileUpload.FileLink = body.FileLink;
		objFileUpload.LinkNote = body.LinkNote;
		objFileUpload.psid = body.psid;
		objFileUpload.UserName = body.UserName == null ? req.session.Name : body.UserName;
		objFileUpload.GeoCodeProvincial = body.GeoCodeProvincial == null ? req.session.GeoCodeProvincial : body.GeoCodeProvincial;
		objFileUpload.Type = req.query.type == null ? req.session.ViewType  : req.query.type;
		objFileUpload.Provincial = body.Provincial == null ? req.session.Provincial : body.Provincial;
		objFileUpload.InputDate = inputDate;

		objDb.getConnection(function (client) {
			objDb.getNextSequenceValue('FileUpload', client, function (er, rs) {
				//Insert BTCFile
				objFileUpload._id = rs.value.sequence_value;
				objDb.insertBTCFile(objFileUpload, client, function (err, results) {
					if (err) {
						console.log("Insert BTCFile Error ", err);
						res.json({
							success: "false",
							message: err
						});
						client.close();
					} else {
						var objPoint = {};
						objPoint.ContentId = Number(objFileUpload.ContentId);
						objPoint.TitleId = Number(objFileUpload.TitleId);
						objPoint.GeoCodeProvincial = objFileUpload.GeoCodeProvincial;
						objPoint.Type = objFileUpload.Type;
						objDb.reUpdateStatusBTCPoint(objPoint, client, function (rerr, rsl) {
							res.json({
								success: "true",
								message: "Gửi thành công"
							});
							console.log("Insert BTCFile Success");
							client.close();
						});
					}

				});
			});
		});
	} catch (caerr) {
		console.error("insertBTCFile:", caerr);
	}
});

router.post('/insertBTCFileSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objFileUpload = {};
		objFileUpload.PointId = Number(body.PointId);
		objFileUpload.ContentId = Number(body.ContentId);
		objFileUpload.FileName = body.FileName;
		objFileUpload.psid = body.psid == null ? req.session.psid : body.psid;
		objFileUpload.UserName = body.UserName == null ? req.session.Name : body.UserName;
		objFileUpload.GeoCodeProvincial = body.GeoCodeProvincial == null ? req.session.GeoCodeProvincial : body.GeoCodeProvincial;
		objFileUpload.Type = req.session.ViewType;
		objFileUpload.Provincial = body.Provincial == null ? req.session.Provincial : body.Provincial;
		objFileUpload.InputDate = inputDate;

		objDb.getConnection(function (client) {
			objDb.getNextSequenceValue('FileUpload', client, function (er, rs) {
				//Insert BTCFileSmart
				objFileUpload._id = rs.value.sequence_value;
				objDb.insertBTCFileSmart(objFileUpload, client, function (err, results) {
					if (err) {
						console.log("Insert BTCFileSmart Error ", err);
						res.json({
							success: "false",
							message: err
						});
					} else {
						res.json({
							success: "true",
							message: "Gửi thành công"
						});
						console.log("Insert BTCFileSmart Success");
					}
					client.close();
				});
			});
		});
	} catch (caerr) {
		console.error("insertBTCFileSmart:", caerr);
	}
});

router.post('/insertBTCSumaryFile', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objFileUpload = {};
		objFileUpload.FileName = body.FileName;
		//objFileUpload.FileLink = body.FileLink;
		objFileUpload.psid = body.psid == null ? req.session.psid : body.psid;
		objFileUpload.UserName = body.UserName == null ? req.session.Name : body.UserName;
		objFileUpload.GeoCodeProvincial = body.GeoCodeProvincial == null ? req.session.GeoCodeProvincial : body.GeoCodeProvincial;
		objFileUpload.Provincial = body.Provincial == null ? req.session.Provincial : body.Provincial;
		objFileUpload.Type = req.session.ViewType;
		objFileUpload.InputDate = inputDate;

		objDb.getConnection(function (client) {
			objDb.getNextSequenceValue('FileUpload', client, function (er, rs) {
				//Insert BTCFile
				objFileUpload._id = rs.value.sequence_value;
				//console.log("BTCFile: ", objFileUpload);
				objDb.insertBTCSumaryFile(objFileUpload, client, function (err, results) {
					if (err) {
						console.log("Insert BTCSumaryFile Error ", err);
						res.json({
							success: "false",
							message: err
						});
					} else {
						res.json({
							success: "true",
							message: "Gửi thành công"
						});
						console.log("Insert BTCSumaryFile Success");
					}
					client.close();
				});
			});
		});
	} catch (caerr) {
		console.error("insertBTCSumaryFile:", caerr);
	}
});

router.post('/insertBTCPoint', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		//try {
		//objFileUpload._id = 1;
		objPoint.ContentId = Number(body.ContentId);
		objPoint.TitleId = Number(body.TitleId);
		objPoint.TitleIdx = Number(body.TitleIdx);
		objPoint.Point = Number(body.Point);
		objPoint.TeamPoint = 0;
		objPoint.DiffPoint = 0 - objPoint.Point;
		objPoint.TeamId = Number(body.TeamId);
		objPoint.psid = body.psid == null ? req.session.psid : body.psid;
		objPoint.UserName = req.session.Name;
		objPoint.GeoCodeProvincial = req.session.GeoCodeProvincial;
		objPoint.Type = req.session.ViewType;
		objPoint.Provincial = req.session.Provincial;
		objPoint.InputDate = inputDate;
		/*var options = {};
		var pipeline = [];
		pipeline = [{
			$match: {
				GeoCodeProvincial: objPoint.GeoCodeProvincial,
				TeamId: objPoint.TeamId
			}
		}, {
			"$group": {
				_id: {
					GeoCodeProvincial: "$GeoCodeProvincial",
					TeamId: "$TeamId",
				},
				SumPoint: {
					$sum: "$Point"
				},
				SumTeamPoint: {
					$sum: "$TeamPoint"
				}
			}
		}];
		var pipelineTotal = [];
		pipelineTotal = [{
			$match: {
				GeoCodeProvincial: objPoint.GeoCodeProvincial
			}
		}, {
			"$group": {
				_id: {
					GeoCodeProvincial: "$GeoCodeProvincial"
				},
				TotalPoint: {
					$sum: "$Point"
				},
				TotalTeamPoint: {
					$sum: "$TeamPoint"
				}
			}
		}];*/
		objDb.getConnection(function (client) {
			objDb.getNextSequenceValue('Point', client, function (er, rs) {
				//Insert BTCFile
				objPoint._id = rs.value.sequence_value;
				//console.log("BTCFile: ", objFileUpload);
				objDb.insertBTCPoint(objPoint, client, function (err, results) {
					if (err) {
						console.log("Insert BTCPoint Error ", err);
						res.json({
							success: "false",
							message: err
						});
						client.close();
					} else {
						res.json({
							success: "true",
							message: "Gửi thành công"
						});
						console.log("Insert BTCPoint Success");
						/*objDb.updateReport(pipeline, pipelineTotal, options, client, function (err, results) {
							console.log("Update Report");
							client.close();
						});*/
						client.close();
					}
				});
			});
		});

	} catch (caerr) {
		console.error("insertBTCPoint:", caerr);
	}
});

router.post('/updateBTCPoint', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		/*var objPoint = {};
		objPoint.GeoCodeProvincial = body.GeoCodeProvincial;
		objPoint.ContentId = Number(body.ContentId);
		objPoint.TitleId = Number(body.TitleId);
		objPoint.TitleIdx = Number(body.TitleIdx);
		objPoint.TeamId = Number(body.TeamId == null ? req.session.TeamId : body.TeamId);
		objPoint.TeamName = req.session.Team;
		objPoint.TeamPsid = body.psid == null ? req.session.psid : body.psid;
		objPoint.TeamUserName = req.session.Name;
		objPoint.Type = req.session.ViewType;
		objPoint.Point = Number(body.Point);
		objPoint.TeamPoint = Number(body.TeamPoint);
		objPoint.DiffPoint = Number(body.TeamPoint) - Number(body.Point);
		objPoint.TeamNote = body.TeamNote;
		objPoint.UpdateDate = inputDate;*/
		var objPoint = {};
		
		objPoint.ContentId = Number(body.ContentId);
		objPoint.TitleId = Number(body.TitleId);
		objPoint.TitleIdx = Number(body.TitleIdx);
		if (body.Unit) {
			objPoint.GeoCodeProvincial = req.session.GeoCodeProvincial;
			objPoint.Provincial = req.session.Provincial;
			objPoint.psid = body.psid == null ? req.session.psid : body.psid;
			objPoint.UserName = req.session.Name; 
			objPoint.TeamId = Number(body.TeamId);
			objPoint.Note = body.Note;
			objPoint.Point = Number(body.Point);
			objPoint.Unit = 1;
		} else {
			objPoint.TeamId = Number(body.TeamId == null ? req.session.TeamId : body.TeamId);
			if (req.session.ViewType=="Cấp tỉnh") {
				objPoint.GeoCodeProvincial = body.GeoCodeProvincial;
				objPoint.Provincial = body.Provincial;
			} else {
				objPoint.GeoCodeProvincial = "VN-HN";
				objPoint.Provincial = "Hà Nội";
			}
			objPoint.TeamName = req.session.Team;
			objPoint.TeamPsid = body.psid == null ? req.session.psid : body.psid;
			objPoint.TeamUserName = req.session.Name;
			if (body.TeamPoint) objPoint.TeamPoint = Number(body.TeamPoint);
			if (body.TeamNote) objPoint.TeamNote = body.TeamNote;
			if (body.DiffPoint) objPoint.DiffPoint = Number(body.DiffPoint);
		}
		objPoint.Type = req.session.ViewType;
		objPoint.UpdateDate = inputDate;
		var query = {};

		if (objPoint.ContentId != "" && objPoint.ContentId != null) {
			Object.assign(query, {
				ContentId: objPoint.ContentId
			});
		}
		if (objPoint.TitleId != "" && objPoint.TitleId != null) {
			Object.assign(query, {
				TitleId: objPoint.TitleId
			});
		}
		if (objPoint.GeoCodeProvincial != "" && objPoint.GeoCodeProvincial != null) {
			Object.assign(query, {
				GeoCodeProvincial: objPoint.GeoCodeProvincial
			});
		}
		if (objPoint.Type != "" && objPoint.Type != null) {
			Object.assign(query, {
				Type: objPoint.Type
			});
		}
		/*var options = {};
		var pipeline = [];
		pipeline = [{
			$match: {
				GeoCodeProvincial: objPoint.GeoCodeProvincial,
				TeamId: objPoint.TeamId
			}
		}, {
			"$group": {
				_id: {
					GeoCodeProvincial: "$GeoCodeProvincial",
					TeamId: "$TeamId"
				},
				SumPoint: {
					$sum: "$Point"
				},
				SumTeamPoint: {
					$sum: "$TeamPoint"
				}
			}
		}];
		var pipelineTotal = [];
		pipelineTotal = [{
			$match: {
				GeoCodeProvincial: objPoint.GeoCodeProvincial
			}
		}, {
			"$group": {
				_id: {
					GeoCodeProvincial: "$GeoCodeProvincial"
				},
				TotalPoint: {
					$sum: "$Point"
				},
				TotalTeamPoint: {
					$sum: "$TeamPoint"
				}
			}
		}];*/
		objDb.getConnection(function (client) {
			console.log("Update BTCPoint: ", objPoint);
			objDb.findBTCPoint(query, client, function (results) {
				if (results[0] != null) {
					//Update
					if (objPoint.Unit && results[0].TeamPoint) 
						objPoint.DiffPoint = results[0].TeamPoint - objPoint.Point;
					objDb.updateBTCPoint(objPoint, client, function (err, results) {
						if (err) {
							console.log("Update BTCPoint Error ", err);
							res.json({
								success: "false",
								message: err
							});
							client.close();
						} else {
							res.json({
								success: "true",
								message: "Cập nhật thành công"
							});
							console.log("Update BTCPoint success");
							/*objDb.updateReport(pipeline, pipelineTotal, options, client, function (err, results) {
								console.log("Update Report");
								client.close();
							});*/
							client.close();
						}


					});
				} else {
					objDb.getNextSequenceValue('Point', client, function (er, rs) {
						//Insert BTCFile
						objPoint._id = rs.value.sequence_value;
						//console.log("BTCFile: ", objFileUpload);
						objPoint.InputDate = inputDate;
						objDb.insertBTCPoint(objPoint, client, function (err, results) {
							if (err) {
								console.log("Insert BTCPoint Error ", err);
								res.json({
									success: "false",
									message: err
								});
								client.close();
							} else {
								res.json({
									success: "true",
									message: "Gửi thành công"
								});
								console.log("Insert BTCPoint Success");
								/*objDb.updateReport(pipeline, pipelineTotal, options, client, function (err, results) {
									console.log("Update Report");
									client.close();
								});*/
								client.close();
							}

						});
					});
				}
				
			});

		});
	} catch (caerr) {
		console.error("updateBTCPoint:", caerr);
	}
});

router.post('/updateStatusBTCPoint', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());

		var objPoint = {};
		objPoint.GeoCodeProvincial = body.GeoCodeProvincial;
		objPoint.Provincial = body.Provincial;
		objPoint.ContentId = Number(body.ContentId);
		objPoint.TitleId = Number(body.TitleId);
		objPoint.TitleIdx = Number(body.TitleIdx);
		objPoint.TeamId = Number(body.TeamId == null ? req.session.TeamId : body.TeamId);
		objPoint.TeamName = req.session.Team;
		objPoint.TeamPsid = body.psid == null ? req.session.psid : body.psid;
		objPoint.TeamUserName = req.session.Name;
		objPoint.Type = req.session.ViewType;
		if (objPoint.Type != 'Cấp tỉnh'){
			objPoint.GeoCodeProvincial = 'VN-HN';
			objPoint.Provincial = 'Hà Nội';
		}
		//objPoint.Point = Number(body.Point);
		//objPoint.TeamPoint = Number(body.TeamPoint);
		//objPoint.DiffPoint = Number(body.DiffPoint);
		objPoint.TeamNote = body.TeamNote;
		objPoint.UpdateDate = inputDate;
		objPoint.ApprovePsid = objPoint.TeamPsid
		objPoint.ApproveUserName = objPoint.TeamUserName;
		objPoint.ApproveStatus = body.ApproveStatus;
		objPoint.ApproveDate = inputDate;

		var query = {};

		if (objPoint.ContentId != "" && objPoint.ContentId != null) {
			Object.assign(query, {
				ContentId: objPoint.ContentId
			});
		}
		if (objPoint.TitleIdx != "" && objPoint.TitleIdx != null) {
			Object.assign(query, {
				TitleIdx: objPoint.TitleIdx
			});
		}
		if (objPoint.GeoCodeProvincial != "" && objPoint.GeoCodeProvincial != null) {
			Object.assign(query, {
				GeoCodeProvincial: objPoint.GeoCodeProvincial
			});
		}
		if (objPoint.Type != "" && objPoint.Type != null) {
			Object.assign(query, {
				Type: objPoint.Type
			});
		}
		objDb.getConnection(function (clientDb) {
			console.log("Update BTCPoint: ", objPoint);
			objDb.findBTCPoint(query, clientDb, function (results) {
				if (results[0] != null) {
					//Update
					objDb.updateStatusBTCPoint(objPoint, clientDb, function (err, rss) {

						if (err) {

							console.log("Update BTCPoint Error ", err);
							res.json({
								success: "false",
								message: err
							});
						} else {
							console.log("Update BTCPoint success");
							/////Gửi tin nhắn cho cả tỉnh nến lệnh gửi lên là lệnh hủy
							if (objPoint.ApproveStatus == 'CANCEL') {
								/*var qrTile = {};
								Object.assign(qrTile, {
									_id: objPoint.TitleId
								});
								objDb.findBTCTitle(qrTile, clientDb, function (rsTitle) {*/
								///////
								var qk = {
									quick_replies: [{
										content_type: 'text',
										title: 'Quay về menu',
										payload: 'menu',
									}, ]
								};
								var qr = {};
								Object.assign(qr, {
									//Type: 'Cấp tỉnh'
									ContentId: objPoint.ContentId
								});
								Object.assign(qr, {
									TitleId: objPoint.TitleId
								});
								Object.assign(qr, {
									GeoCodeProvincial: objPoint.GeoCodeProvincial
								});
								Object.assign(qr, {
									Type: objPoint.Type
								});
								console.log("updateStatusBTCPoint findMemberBTC: ", qr);
								//objDb.findMemberBTC(qr, clientDb, function (rs) {
								objDb.psidBTCFile(qr, clientDb, function (rs) {
									console.log("updateStatusBTCPoint findBTCFile Length: ", rs.length);
									clientDb.close();
									var j = 0;
									var arr = [];
									/*var msg = objPoint.TeamName + ' không chấp nhận minh chứng (link/ảnh/văn bản/báo cáo…) của nội dung ' //+ rsTitle[0].ContentId + ' điều kiện : "' + rsTitle[0].Name 
										+
										rsTitle[0].Title.replace("N", "").replace("_", "."); +
									' với lý do: ' + body.Des;*/
									var msg = 'Minh chứng của nội dung ' +
										objPoint.ContentId + '.' + objPoint.TitleIdx +
										' bị lỗi, đề nghị cập nhật lại.';
									console.log('Message: ', msg);
									for (var i = 0; i < rs.length; i++) {

										console.log("add member: ", rs[i]);
										var id = rs[i].toString();

										//arr.push(MessengerBatch.sendText("1977422088947151", msg,qk));
										//			startMiniGame02(id,'8888');
										arr.push(MessengerBatch.sendText(id, msg));
										if (j == 5) {
											j = 0;
											client.sendBatch(arr);
											console.log("Send member: ", arr.length);
											arr = [];
										} else if ((rs.length - i) < 5) {
											j = 0;
											client.sendBatch(arr);
											arr = [];
											console.log("Total Send member: ", i + 1);
										}
										j++;
									}
									res.json({
										success: "true",
										message: "Cập nhật thành công"
									});
									//});
								});

							} else {
								clientDb.close();
								res.json({
									success: "true",
									message: "Cập nhật thành công"
								});
							}
						}

					});
				} else {
					objDb.getNextSequenceValue('Point', clientDb, function (er, rs) {
						//Insert BTCFile
						objPoint._id = rs.value.sequence_value;
						//console.log("BTCFile: ", objFileUpload);
						objDb.insertBTCPoint(objPoint, clientDb, function (err, results) {
							if (err) {
								console.log("Insert BTCPoint Error ", err);
								res.json({
									success: "false",
									message: err
								});
							} else {
								if (objPoint.ApproveStatus == 'CANCEL') {
									/*var qrTile = {};
									Object.assign(qrTile, {
										_id: objPoint.TitleId
									});
									objDb.findBTCTitle(qrTile, clientDb, function (rsTitle) {*/
									///////
									var qk = {
										quick_replies: [{
											content_type: 'text',
											title: 'Quay về menu',
											payload: 'menu',
										}, ]
									};
									var qr = {};
									Object.assign(qr, {
										//Type: 'Cấp tỉnh'
										ContentId: objPoint.ContentId
									});
									Object.assign(qr, {
										TitleId: objPoint.TitleId
									});
									Object.assign(qr, {
										GeoCodeProvincial: objPoint.GeoCodeProvincial
									});
									console.log("updateStatusBTCPoint findMemberBTC: ", qr);
									//objDb.findMemberBTC(qr, clientDb, function (rs) {
									objDb.findBTCFile(qr, clientDb, function (rs) {
										console.log("updateStatusBTCPoint findBTCFile Length: ", rs.length);
										clientDb.close();
										var j = 0;
										var arr = [];
										/*var msg = objPoint.TeamName + ' không chấp nhận minh chứng (link/ảnh/văn bản/báo cáo…) của nội dung ' //+ rsTitle[0].ContentId + ' điều kiện : "' + rsTitle[0].Name 
											+
											rsTitle[0].Title.replace("N", "").replace("_", "."); +
										' với lý do: ' + body.Des;*/
										var msg = 'Minh chứng của nội dung ' +
											objPoint.ContentId + '.' + objPoint.TitleIdx +
											' bị lỗi, đề nghị cập nhật lại.';
										console.log('Message: ', msg);
										for (var i = 0; i < rs.length; i++) {

											console.log("add member: ", rs[i].psid);
											var id = rs[i].psid.toString();

											//arr.push(MessengerBatch.sendText("1977422088947151", msg,qk));
											//			startMiniGame02(id,'8888');
											arr.push(MessengerBatch.sendText(id, msg));
											if (j == 5) {
												j = 0;
												client.sendBatch(arr);
												console.log("Send member: ", arr.length);
												arr = [];
											} else if ((rs.length - i) < 5) {
												j = 0;
												client.sendBatch(arr);
												arr = [];
												console.log("Total Send member: ", i + 1);
											}
											j++;
										}
										res.json({
											success: "true",
											message: "Cập nhật thành công"
										});
										//});
									});

								} else {
									clientDb.close();
									res.json({
										success: "true",
										message: "Lưu lại thành công"
									});
								}
								console.log("Insert BTCPoint Success");
							}
							clientDb.close();
						});
					});
				}
			});

		});
	} catch (caerr) {
		console.error("updateStatusBTCPoint:", caerr);
	}
});

router.post('/deleteBTCFile', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;		
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());
		var objFile = {};
		objFile.Id = Number(body.Id);
		if (objFile.Id == "" && objFile.Id == null) {
			res.json({
						success: "false",
						message: "Chọn minh chứng muốn xóa"
					});
		}
		objFile.RequireId = Number(body.RequireId);
		objFile.TitleId = Number(body.TitleId);
		objFile.ContentId = Number(body.ContentId);
		objFile.GeoCodeProvincial = req.session.GeoCodeProvincial;
		objFile.Type = req.session.ViewType;
		objFile.DeletedDate = inputDate;
		objFile.DeletedUserId = req.session.psid;
		objFile.DeletedUserName = req.session.Name;
		console.log("Delete BTCFile: ", objFile);
		var query = {};


		if (objFile.Id != "" && objFile.Id != null) {
			Object.assign(query, {
				_id: objFile.Id
			});			
			objDb.getConnection(function (client) {
				console.log("Delete BTCFile query: ", query);
				objDb.deleteBTCFile(query, objFile, client, function (err, results) {
					if (err) {
						console.log("Delete BTCFile Error ", err);
						res.json({
							success: "false",
							message: err
						});
					} else {
						res.json({
							success: "true",
							message: "Xoá thành công"
						});
						console.log("Delete BTCFile Success");
					}
					client.close();
				});
			});
		} 
		
	} catch (caerr) {
		console.error("deleteBTCFile:", caerr);
	}
});

router.post('/deleteBTCFileSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var objFile = {};
		objFile.Id = body.Id;
		console.log("Delete BTCFileSmart: ", objFile);
		var query = {};
		if (objFile.Id != "" && objFile.Id != null) {
			Object.assign(query, {
				_id: Number(objFile.Id)
			});
		}
		objDb.getConnection(function (client) {
			console.log("Delete BTCFileSmart query: ", query);
			objDb.deleteBTCFileSmart(query, client, function (err, results) {
				if (err) {
					console.log("Delete BTCFileSmart Error ", err);
					res.json({
						success: "false",
						message: err
					});
				} else {
					res.json({
						success: "true",
						message: "Xoá thành công"
					});
					console.log("Delete BTCFileSmart Success");
				}
				client.close();
			});
		});
	} catch (caerr) {
		console.error("deleteBTCFileSmart:", caerr);
	}
});

router.post('/deleteBTCSumaryFile', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var objFile = {};
		objFile.Id = body.Id;
		console.log("Delete BTCSumaryFile: ", objFile);
		var query = {};
		if (objFile.Id != "" && objFile.Id != null) {
			Object.assign(query, {
				_id: Number(objFile.Id)
			});
		}
		objDb.getConnection(function (client) {
			console.log("Delete BTCSumaryFile query: ", query);
			objDb.deleteBTCSumaryFile(query, client, function (err, results) {
				if (err) {
					console.log("Delete BTCSumaryFile Error ", err);
					res.json({
						success: "false",
						message: err
					});
				} else {
					res.json({
						success: "true",
						message: "Xoá thành công"
					});
					console.log("Delete BTCSumaryFile Success");
				}
				client.close();
			});
		});
	} catch (caerr) {
		console.error("deleteBTCSumaryFile:", caerr);
	}
});

router.post('/deleteBTCPointSmart', function (req, res) {
	try {
		if (req.session == null || req.session.admin == null) {
			return res.sendStatus(401);
		}
		let body = req.body;
		var objPoint = {};
		objPoint.Id = body.Id;
		console.log("Delete BTCPointSmart: ", objPoint);
		var query = {};
		if (objPoint.Id != "" && objPoint.Id != null) {
			Object.assign(query, {
				_id: Number(objPoint.Id)
			});
		}
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());
		objPoint.DeletedDate = inputDate;
		objPoint.DeletedUserId = req.session.psid;
		objPoint.DeletedUserName = req.session.Name;
		objDb.getConnection(function (client) {
			console.log("Delete BTCPointSmart query: ", query);
			objDb.deleteBTCPointSmart(query, objPoint, client, function (err, results) {
				if (err) {
					console.log("Delete BTCPointSmart Error ", err);
					res.json({
						success: "false",
						message: err
					});
				} else {
					res.json({
						success: "true",
						message: "Xoá thành công"
					});
					console.log("Delete BTCPointSmart Success");
				}
				client.close();
			});
		});
	} catch (caerr) {
		console.error("deleteBTCPointSmart:", caerr);
	}
});

router.post('/getGeoCode', function (req, res) {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	let body = req.body;
	var type = req.session.ViewType;
	var header;
	var img
	if (req.session.ViewType == "Ban Thanh niên Quân đội") 
		type = 'Quân đội';
	if (req.session.ViewType == "Đoàn Bộ Công an") 
		type = 'Bộ công an';                
	if (type=="Cấp tỉnh"){
		header = 'BỘ TIÊU CHÍ ĐÁNH GIÁ CÔNG TÁC ĐOÀN VÀ PHONG TRÀO THANH THIẾU NHI ' + req.session.Provincial + ' NĂM 2019';
		img = req.session.GeoCodeProvincial;
	} else {
		header = 'BỘ TIÊU CHÍ ĐÁNH GIÁ CÔNG TÁC ĐOÀN VÀ PHONG TRÀO THANH NIÊN ' + type + ' NĂM 2019';
		img = req.session.ViewType;
	}
	res.json({
		GeoCodeProvincial: req.session.GeoCodeProvincial,
		Type: type,
		Img: img,
		Header: header,
		Provincial: req.session.Provincial,
		UserName: req.session.Name,
		psid: req.session.psid
	});
});

router.post('/getTeamId', function (req, res) {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	let body = req.body;
	res.send(req.session.TeamId);
});

router.post('/setTeamType', function (req, res) {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	let body = req.body;
	req.session.ViewType = body.type;
	console.log('Change Team: ', req.session.ViewType)
	res.send(req.session.ViewType);
});

router.post('/getIsAdmin', function (req, res) {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	let body = req.body;
	res.send(req.session.IsAdmin == null ? false : req.session.IsAdmin);
});

router.post('/getCheckBTCFile', (req, res) => {
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	if (req.session == null || req.session.admin == null) {
		return res.sendStatus(401);
	}
	var geocodeprovincial = req.query.geocodeprovincial == null ? req.session.GeoCodeProvincial : req.query.geocodeprovincial;
	var type = req.query.type == null ? req.session.ViewType  : req.query.type;
	var contentid = req.query.contentid;
	
	var titleid = Number(req.query.titleid);
	var requireid = Number(req.query.requireid);
	console.log("getCheckBTCFile ContentId ", contentid);
	console.log("getCheckBTCFile Type ", type);
	if (geocodeprovincial == null || geocodeprovincial == 'all')
		geocodeprovincial = "";
	if (type!="Cấp tỉnh") geocodeprovincial = "VN-HN";
	if (type == null || type == 'all')
		type = "";
	if (contentid == null || contentid == 'all')
		contentid = "";
	if (titleid == null || titleid == 'all')
		titleid = "";
	if (requireid == null || requireid == 'all')
		requireid = "";
	var options = {};
	var pipeline = [];
	if (contentid == "") {
		pipeline = [{
			$match: {
				GeoCodeProvincial: geocodeprovincial,
				Type: type
			}
		}, {
			"$group": {
				"_id": {
					GeoCodeProvincial: "$GeoCodeProvincial",					
					ContentId: "$ContentId",
					TitleId: "$TitleId",
					RequireId: "$RequireId"
				},
				count: {
					$sum: 1
				}
			}
		}, {
			"$sort": {
				"_id.GeoCodeProvincial": 1,
				"_id.ContentId": 1,
				"_id.TitleId": 1,
				"_id.RequireId": 1,
			}
		}, {
			"$project": {
				"_id": 0,
				"GeoCodeProvincial": "$_id.GeoCodeProvincial",
				"ContentId": "$_id.ContentId",
				"TitleId": "$_id.TitleId",
				"RequireId": "$_id.RequireId",
				"Total": "$count"
			}
		}];
	} else {
		pipeline = [{
			$match: {
				GeoCodeProvincial: geocodeprovincial,
				Type: type,
				ContentId: Number(contentid)
			}
		}, {
			"$group": {
				"_id": {
					GeoCodeProvincial: "$GeoCodeProvincial",
					ContentId: "$ContentId",
					TitleId: "$TitleId",
					RequireId: "$RequireId"
				},
				count: {
					$sum: 1
				}
			}
		}, {
			"$sort": {
				"_id.GeoCodeProvincial": 1,
				"_id.ContentId": 1,
				"_id.TitleId": 1,
				"_id.RequireId": 1,
			}
		}, {
			"$project": {
				"_id": 0,
				"GeoCodeProvincial": "$_id.GeoCodeProvincial",
				"ContentId": "$_id.ContentId",
				"TitleId": "$_id.TitleId",
				"RequireId": "$_id.RequireId",
				"Total": "$count"
			}
		}];
	}
	//console.log("getCheckBTCFile", pipeline);
	objDb.getConnection(function (client) {
		objDb.findCheckBTCFile(pipeline, options, client, function (results) {
			client.close();
			//console.log("getCheckBTCFile", results);
			res.send(results);
		});
	});
});

router.get('/getotp/:id',(req,res)=>{
	var getRndInteger = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	const otp = getRndInteger(100000, 999999);
	let data={
		OTP:otp,
		_id:req.params.id,
		UpdateDate:new Date(),
		BlockStatus:'PENDING'
	}
	objDb.getConnection(dbclient => {
		objDb.updateOtp({
					_id: req.params.id
				}, data, dbclient, (err, ret) => {
			if (err || ret.matchedCount==0) {
				res.send({success:false,err:err});
			}else{
				client.sendText(req.params.id,`Mã otp là: ${otp}`).catch(reason=>{

				})
				res.send({success:true});
			}
		})
	})
	
});
module.exports = router;
