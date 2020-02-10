/////Search engine functions create new, update, delete data in mongoDb
MongoClient = require('mongodb').MongoClient;
mongodb = require('mongodb');
ObjectId = require('mongodb').ObjectId;
config = require('config');

MONGO_URL = (process.env.MONGO_URL) ?
	process.env.MONGO_URL :
	config.get('mongoUrl');
DATA_BASE_NAME = (process.env.DATABASE_NAME) ?
	process.env.DATABASE_NAME :
	config.get('databasename');

var dbQueryCounter = 0;
var maxDbIdleTime = 5000;
module.exports = {
	getConnection: function (callback) {		
		MongoClient.connect(MONGO_URL, function (err, client) { //conn =client;
			//console.log("Create:",client);
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				//console.log("Create conn 2:");
				callback(client);
			}
		});

	},
	getConnection2: function (callback) {	
		var options = { server:
               { socketOptions: 
                    { 
                        socketTimeoutMS: 600000, 
                        connectTimeoutMS: 600000 
                    }
                }
              };
		MongoClient.connect(MONGO_URL, options, function (err, client) { //conn =client;
			//console.log("Create:",client);
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				//console.log("Create conn 2:");
				callback(client);
			}
		});

	},
	findMembersByGroup: function (pipeline, options, client, callback) {

		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('Members');
		collection.aggregate(pipeline, options).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findTeam: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('Team');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findMembers: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('Members');
		// Find some documents
		collection.find(query).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findMembersBTC: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('MemberBTC');
		// Find some documents
		collection.find(query).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findMembersNMC: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('MemberBTC');
		collection2 = db.collection('Members');
		// Find some documents
		collection.find(query).sort({}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				if (results.length == 1) {
					callback(results);
				} else {
					collection2.find(query).sort({}).toArray(function (err, results) {
						//    assert.equal(err, null);
						if (err) {
							console.log("err:", err);
							callback(err);
						} else {
							callback(results);
						}
					});
				}
			}
		});
	},
	findReport: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewReport');

		console.log('Get Report');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	/*updateContent: function (query, client) {

		const db = client.db(DATA_BASE_NAME);
		colContent = db.collection('ContentPoint');
		colPoint = db.collection('BTCPoint');
		colTitle = db.collection('BTCTitle');
		colPro = db.collection('Provincial2');
		
		var pipeline = [{
			"$group": {
				"_id": {
					"GeoCodeProvincial": "$GeoCodeProvincial",
					"ContentId": "$ContentId"
				},
				"PointContent": {
					"$sum": "$Point"
				},
				"TeamPointContent": {
					"$sum": "$TeamPoint"
				}
			}
		}, {
			"$project": {
				"GeoCodeProvincial": "$_id.GeoCodeProvincial",
				"ContentId": "$_id.ContentId",
				"PointContent": "$PointContent",
				"TeamPointContent": "$TeamPointContent"
			}
		}];
		var docs;
		var makeRequest = async() => {
			docs = await colPoint.aggregate(pipeline).toArray();
			for (var i = 0; i < docs.length; ++i) {
				var doc = docs[i];
				//console.log("Doc:", doc);
				var makeReason = async() => {
					var rs = '';
					var pos = await colPoint.find({
						GeoCodeProvincial: doc.GeoCodeProvincial,
						ContentId: doc.ContentId,
						"TeamNote": {
							"$ne": null
						},
						"DiffPoint": {
							"$ne": 0
						}
					}).toArray();
					for (var k = 0; k < pos.length; ++k) {
						var po = pos[k];
						var dif = po.DiffPoint || 0;
						if (dif != 0) {
							var prs = await colTitle.find({
								_id: po.TitleId
							}).toArray();
							rs = rs + prs[0].Tit + " " + po.TeamNote + " (" + po.DiffPoint + " điểm);";
						}
					}
					return rs;
				}
				var mk = await makeReason();
				doc.Reason = mk;
				var pros = await colPro.find({
					GeoCode: doc.GeoCodeProvincial
				}).toArray();
				doc.Name = pros[0].Name;
				//console.log('Name',pros[0].Name);

				var results = await colContent.find({
					GeoCodeProvincial: doc.GeoCodeProvincial,
					ContentId: doc.ContentId
				}).toArray();

				if (results.length == 0) {
					var objInsert = {};
					objInsert.GeoCodeProvincial = doc.GeoCodeProvincial;
					objInsert.ContentId = doc.ContentId;
					objInsert.PointContent = doc.PointContent;
					objInsert.TeamPointContent = doc.TeamPointContent;
					objInsert.Name = doc.Name;
					objInsert.Reason = doc.Reason;
					objInsert.DiffPoint = doc.TeamPointContent - doc.PointContent;
					colContent.insertOne(objInsert, function (err, res) {
						if (err) {
							console.log("err:", err);
						} else {
							//console.log('Ok');

						}
					});
				} else {
					var objUpdate = {
						$set: {
							PointContent: doc.PointContent,
							TeamPointContent: doc.TeamPointContent,
							Name: doc.Name,
							Reason: doc.Reason,
							DiffPoint: doc.TeamPointContent - doc.PointContent
						}
					};
					colContent.updateOne({
						GeoCodeProvincial: doc.GeoCodeProvincial,
						ContentId: doc.ContentId
					}, objUpdate, function (err, res) {
						if (err) {
							console.log("err:", err);
						} else {
							//console.log('Ok');

						}
					});
				}
				/*var makeUpdate = async() => {
					var results = await colContent.find({
						GeoCodeProvincial: doc.GeoCodeProvincial,
						ContentId: doc.ContentId
					}).toArray();

					if (results.length == 0) {
						var objInsert = {};
						objInsert.GeoCodeProvincial = doc.GeoCodeProvincial;
						objInsert.ContentId = doc.ContentId;
						objInsert.PointContent = doc.PointContent;
						objInsert.TeamPointContent = doc.TeamPointContent;
						objInsert.Name = doc.Name;
						objInsert.Reason = doc.Reason;
						objInsert.DiffPoint = doc.TeamPointContent - doc.PointContent;
						colContent.insertOne(objInsert, function (err, res) {
							if (err) {
								console.log("err:", err);
							} else {
								console.log('Ok');

							}
						});
					} else {
						var objUpdate = {
							$set: {
								PointContent: doc.PointContent,
								TeamPointContent: doc.TeamPointContent,
								Name: doc.Name,
								Reason: doc.Reason,
								DiffPoint: doc.TeamPointContent - doc.PointContent
							}
						};
						colContent.updateOne({
							GeoCodeProvincial: doc.GeoCodeProvincial,
							ContentId: doc.ContentId
						}, objUpdate, function (err, res) {
							if (err) {
								console.log("err:", err);
							} else {
								console.log('Ok');

							}
						});
					}
				};
				var mu = await makeUpdate();
			};
		};
		makeRequest();

		//callback('Cập nhật thành công');
		/*}
		});

	},*/

	findGeoReport: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewGeoPoint');

		console.log('Get Geo Report');
		// Find some documents
		collection.find(query).sort({
			"Provincial": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				//console.log(results[0]);
				callback(results);
			}
		});
	},

	findBTCPic: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BtcPic');

		//console.log('Get Geo Report');
		// Find some documents
		collection.find(query).sort({
			"Status": -1,
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				//console.log(results[0]);
				callback(results);
			}
		});
	},

	findUpload: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewUpload');
		var pipeline = [];

		console.log('Get Upload');
		// Find some documents
		collection.find(query).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findCheckList: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewList');
		var pipeline = [];

		console.log('Get ViewList');
		// Find some documents
		collection.find(query).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findCheckList2: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewList2');
		var pipeline = [];

		console.log('Get ViewList');
		// Find some documents
		collection.find(query).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findBTCPointLog: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCPointLog');
		var pipeline = [];

		console.log('Get BTCPointLog');
		// Find some documents
		collection.find(query).sort({
			"UpdateDate": -1,
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	
	findBTCPointTeam: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ExcelReport');
		var pipeline = [];

		console.log('Get findBTCPointTeam');
		// Find some documents
		collection.find(query).sort({
			"Type":1, "Provincial":1, "ContentId":1, "TitleIdx":1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findMemList: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewMemList');
		var pipeline = [];

		console.log('Get ViewMemList');
		// Find some documents
		collection.find(query).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findMemFile: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('MemberBTC');


		console.log('db findMemFile');
		// Find some documents
		collection.aggregate([{
			"$lookup": {
				"from": "BTCFile",
				"localField": "_id",
				"foreignField": "psid",
				"as": "Files"
			}
		}]).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findUpList: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewUpList');
		var pipeline = [];

		console.log('Get ViewUpList');
		// Find some documents
		collection.find(query).sort({
			"ContentId": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findUpListAll: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewUpListAll');
		var pipeline = [];

		console.log('Get ViewUpListAll');
		// Find some documents
		collection.find(query).sort({
			"Upload": -1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findMarkList: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewMarkList');
		var pipeline = [];

		console.log('Get ViewMarkList');
		// Find some documents
		collection.find(query).sort({
			"ContentId": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findMarkListAll: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('ViewMarkListAll');
		var pipeline = [];

		console.log('Get ViewMarkListAll');
		// Find some documents
		collection.find(query).sort({
			"Checked": -1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	deleteBTCFile: function (query, objFile, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCFile');
		const collection2 = db.collection('BTCFile');
		const colog = db.collection('BTCFileLog');
		collection2.find(query).toArray(function (err2, results2) {
			if (results2) {
				objFile.FileType = results2[0].FileType;
				objFile.FileLink = results2[0].FileLink;
				objFile.FileName = results2[0].FileName;
				objFile.LinkNote = results2[0].LinkNote;
				objFile.UserName = results2[0].UserName;
				objFile.psid = results2[0].psid;
				objFile.InputDate = results2[0].InputDate;
			}
			colog.insertOne(objFile, function (erl, resl) {
				collection.deleteOne(query, function (err, results) {
					if (err) {
						console.log("err:", err);
						callback(err, null);
					} else {
						callback(null, results);
					}
				});
			});
		});
	},

	deleteBTCFileSmart: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFileSmart');
		collection.deleteOne(query, function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err, null);
			} else {
				callback(null, results);
			}
		});
	},
	deleteBTCSumaryFile: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCSumaryFile');
		collection.deleteOne(query, function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(null, results);
			}
		});
	},
	deleteBTCPointSmart: function (query, objPoint, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCPointSmart');
		collection2 = db.collection('BTCPointSmart');
		collog = db.collection('BTCPointSmartLog');
		collection2.find(query).toArray(function (err2, results2) {
			if (results2) {
				var obj = results2[0];
				obj.DeletedDate = objPoint.DeletedDate;
				obj.DeletedUserId = objPoint.DeletedUserId;
				obj.DeletedUserName = objPoint.DeletedUserName;
				obj.Id = obj._id;
				obj._id = null;
			}
			collog.insertOne(obj, function (erl, resl) {			
				collection.deleteOne(query, function (err, results) {
					if (err) {
						console.log("err:", err);
						callback(err);
					} else {
						callback(null, results);
					}
				});
			});
		})
	},
	

	findMemberBTC: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('MemberBTC');
		// Find some documents
		collection.find(query).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCOTP: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BtcOtp');
		// Find some documents
		collection.find(query).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	AGGBTCOTP: function (pipeline, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BtcOtp');
		// Find some documents
		collection.aggregate(pipeline).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findRedeemGifts: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('RedeemGifts');
		// Find some documents
		collection.find(query).sort({
			"InsertDate": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	updateContentId: function (contentId, client, callback) {
		console.log("Bf:", contentId);
		var doUpdate = async() => {
			const db = client.db(DATA_BASE_NAME);
			colContent = db.collection('ContentPoint');
			colPoint = db.collection('BTCPoint');
			colTitle = db.collection('BTCTitle');
			colPro = db.collection('Provincial2');
			/*var rQuery = {};
			colContent.remove(rQuery, function (err, obj) {
				if (err) console.log("err:", err);
				else {*/
			var pipeline = [{
				"$match": {
					"ContentId": contentId
				}
			}, {
				"$group": {
					"_id": {
						"GeoCodeProvincial": "$GeoCodeProvincial",
						"ContentId": "$ContentId"
					},
					"PointContent": {
						"$sum": "$Point"
					},
					"TeamPointContent": {
						"$sum": "$TeamPoint"
					}
				}
			}, {
				"$project": {
					"GeoCodeProvincial": "$_id.GeoCodeProvincial",
					"ContentId": "$_id.ContentId",
					"PointContent": "$PointContent",
					"TeamPointContent": "$TeamPointContent"
				}
			}];
			var docs;
			var makeRequest = async() => {
				docs = await colPoint.aggregate(pipeline).toArray();
				for (var i = 0; i < docs.length; ++i) {
					var doc = docs[i];
					//console.log("Doc:", doc);
					var makeReason = async() => {
						var rs = '';
						var pos = await colPoint.find({
							GeoCodeProvincial: doc.GeoCodeProvincial,
							ContentId: doc.ContentId,
							"TeamNote": {
								"$ne": null
							},
							"DiffPoint": {
								"$ne": 0
							}
						}).toArray();
						for (var k = 0; k < pos.length; ++k) {
							var po = pos[k];
							var dif = po.DiffPoint || 0;
							if (dif != 0) {
								var prs = await colTitle.find({
									_id: po.TitleId
								}).toArray();
								rs = rs + prs[0].Tit + " " + po.TeamNote + " (" + po.DiffPoint + " điểm);";
							}
						}
						return rs;
					}
					var mk = await makeReason();
					doc.Reason = mk;
					var pros = await colPro.find({
						GeoCode: doc.GeoCodeProvincial
					}).toArray();
					doc.Name = pros[0].Name;
					//console.log('Name',pros[0].Name);

					var results = await colContent.find({
						GeoCodeProvincial: doc.GeoCodeProvincial,
						ContentId: doc.ContentId
					}).toArray();

					if (results.length == 0) {
						var objInsert = {};
						objInsert.GeoCodeProvincial = doc.GeoCodeProvincial;
						objInsert.ContentId = doc.ContentId;
						objInsert.PointContent = doc.PointContent;
						objInsert.TeamPointContent = doc.TeamPointContent;
						objInsert.Name = doc.Name;
						objInsert.Reason = doc.Reason;
						objInsert.DiffPoint = doc.TeamPointContent - doc.PointContent;
						colContent.insertOne(objInsert, function (err, res) {
							if (err) {
								console.log("err:", err);
							} else {
								//console.log('Ok');

							}
						});
					} else {
						var objUpdate = {
							$set: {
								PointContent: doc.PointContent,
								TeamPointContent: doc.TeamPointContent,
								Name: doc.Name,
								Reason: doc.Reason,
								DiffPoint: doc.TeamPointContent - doc.PointContent
							}
						};
						colContent.updateOne({
							GeoCodeProvincial: doc.GeoCodeProvincial,
							ContentId: doc.ContentId
						}, objUpdate, function (err, res) {
							if (err) {
								console.log("err:", err);
							} else {
								//console.log('Ok');

							}
						});
					}

				};
			};
			var mk = await makeRequest();
		}
		doUpdate();
		console.log("Done");
		callback('Ok');
	},

	findContentPoint: function (query, client, callback) {
		console.log("findContentPoint query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);

		collection = db.collection('ViewContent');
		// Find some documents
		collection.find(query).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},

	findBTCContent: function (query, client, callback) {
		console.log("findBTCContent query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCContent');
		// Find some documents
		collection.find(query).sort({
			"ContentId": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCContentSmart: function (query, client, callback) {
		console.log("findBTCContentSmart query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCContentSmart');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCTitle: function (query, client, callback) {
		console.log("findBTCTitle query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCTitle');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCRequire: function (query, client, callback) {
		console.log("findBTCRequire query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCRequire');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCFile: function (query, client, callback) {
		console.log("findBTCFile query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFile');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCFileLog: function (query, client, callback) {
		console.log("findBTCFileLog query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFileLog');
		// Find some documents
		collection.find(query).sort({
			"DeletedDate": -1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	psidBTCFile: function (query, client, callback) {
		console.log("psidBTCFile query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFile');
		// Find some documents
		collection.distinct("psid", query, (function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		}));
	},
	findBTCFileSmart: function (query, client, callback) {
		console.log("findBTCFileSmart query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFileSmart');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCSumaryFile: function (query, client, callback) {
		console.log("findBTCSumaryFile query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCSumaryFile');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCPoint: function (query, client, callback) {
		console.log("findBTCPoint query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCPoint');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findBTCPointSmart: function (query, client, callback) {
		console.log("findBTCPointSmart query", query);
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCPointSmart');
		// Find some documents
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	findProvincial: function (query, client, callback) {
		console.log("findProvincial query", query);
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('Provincial2');
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				results = results.sort((a, b) => a.Name.localeCompare(b.Name, 'vn', {
					ignorePunctuation: true
				}));
				callback(results);
			}
		});
	},

	findBTCList: function (query, client, callback) {
		console.log("findProvincial query", query);
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCList');
		collection.find(query).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				results = results.sort((a, b) => a.Name.localeCompare(b.Name, 'vn', {
					ignorePunctuation: true
				}));
				callback(results);
			}
		});
	},

	findKycMembers: function (query, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('KycMembers');
		// Find some documents
		collection.find(query).sort({
			"Provincial": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	insertMembers: function (objMember, client, callback) {
		var mydate = new Date();
		var inputDate = new Date(mydate.toISOString());
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Members');
		//var objCallback = null;
		collection.find({
			'_id': objMember._id
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				//callback(err);
			} else {
				//console.log('Kiểm tra xem tồn tại hay chưa:', results.length);
				if (results.length == 0) {
					// insert documents
					collection.insertOne(objMember, function (err, res) {
						//neu xay ra loi
						if (err) throw err;
						//neu khong co loi			
						//console.log('Them thanh cong :',objMember);
						callback(null, res);
					});

				} else {
					//console.log('Thành viên đã điểm danh');
					var objMemberUpdate = {
						$set: {
							"Name": objMember.Name,
							"Birthday": objMember.Birthday,
							"Address": objMember.Address,
							"CMT": objMember.CMT,
							"Phone": objMember.Phone,
							"UpdateDate": inputDate
						}
					};
					collection.updateOne({
						'_id': objMember._id
					}, objMemberUpdate, function (err, res) {
						//neu xay ra loi
						if (err) throw err;
						//neu khong co loi			
						//console.log('Them thanh cong :',objMember);
						console.log("Update:", objMemberUpdate);
						callback(null, res);
					});
					//callback(null, res);
				}
			}
		});
	},
	insertDocument: function (objDocument, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Document');
		//var objCallback = null;
		console.log("objDocument :", objDocument);
		collection.insertOne(objDocument, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi			
			callback(null, res);
		});
	},
	insertLogs: function (objLogs, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('LogsMessage');
		//var objCallback = null;
		//console.log("objAiMessage :",objAiMessage);
		collection.insertOne(objLogs, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi			
			//console.log('Them thanh cong :',objMember);
			callback(null, res);
		});
	},
	//Toanva process Users
	findUsers: function (query, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Users');
		// Find some Users
		collection.find(query).sort({
			"_id": 1
		}).toArray(function (err, results) {
			//    assert.equal(err, null);
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	insertUsers: function (objUser, client, callback) {

		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Users');
		//var objCallback = null;
		collection.find({
			'UserName': objUser.UserName
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
			} else {
				//console.log('Kiểm tra xem tồn tại hay chưa:', results.length);
				if (results.length == 0) {
					console.log('Them tai khoan :', objUser.UserName);
					// insert Users
					collection.insertOne(objUser, function (err, res) {
						//neu xay ra loi
						if (err) throw err;
						//neu khong co loi			
						console.log('Them thanh cong :', objUser.UserName);
						callback(null, 'SUCCESS');
					});

				} else {
					//đã tồn tại
					//console.log('Tai khoan da ton tai');
					callback('ERROR_EXIST');
				}
			}
		});
	},
	editUsers: function (objUser, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Users');
		collection.find({
			'UserName': objUser.UserName
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
			} else {
				//console.log('Kiểm tra xem tồn tại hay chưa:', results.length);
				if (results.length > 0) {
					console.log('Update user:', objUser.UserName);
					// edit Users
					var objUserUpdate = {
						$set: {
							"UserName": objUser.UserName,
							"FullName": objUser.FullName,
							"Status": objUser.Status
						}
					};
					if (objUser.Password.length > 0) {
						objUserUpdate = {
							$set: {
								"Password": objUser.Password,
							}
						}
						console.log('Reset password');
					}
					collection.updateOne({
						'_id': results[0]._id
					}, objUserUpdate, function (err, res) {
						//neu xay ra loi
						if (err) throw err;
						//neu khong co loi			
						console.log("Update success");
						callback(null, res);
					});
				} else {
					//đã tồn tại
					console.log('Update fail. User not found');
					callback('Tài khoản không tồn tại');
				}
			}
		});
	},
	deleteUser: function (UserName, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('Users');
		var myquery = {
			UserName: UserName
		};
		collection.deleteOne(myquery, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi			
			callback(null, res);
		});
	},
	updateStatusGift: function (giftcode, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('RedeemGifts');
		collection.find({
			'GiftCode': giftcode
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
			} else {
				//console.log('Kiểm tra xem tồn tại hay chưa:', results.length);
				if (results.length > 0) {
					console.log('RedeemGift:', giftcode);
					// edit Users
					var objUserUpdate = {
						$set: {
							"Status": "ACTIVE"
						}
					};
					collection.updateOne({
						'_id': giftcode
					}, objUserUpdate, function (err, res) {
						//neu xay ra loi
						if (err) throw err;
						//neu khong co loi			
						console.log("Update success");
						callback(null, res);
					});
				} else {
					//đã tồn tại
					console.log('Update fail. Giftcode not found');
					callback('Mã đổi thưởng không tồn tại');
				}
			}
		});
	},
	updateBtcOtp: function (objBtcOtp, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BtcOtp');
		var rightNow = new Date();
		var objUserUpdate = {
			$set: {
				"BlockStatus": "ACTIVE",
				"LastLogin": rightNow
			}
		};
		collection.updateOne({
			'_id': objBtcOtp.psid,
			'OTP': Number(objBtcOtp.OTP)
		}, objUserUpdate, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi
			console.log("updateBtcOtp BlockStatus: ACTIVE success");
			callback(null, res);
		});
	},
	updateBtcOtpPass: function (query, data, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BtcOtp');
		collection.updateOne(query, {
			$set: data
		}, {
			upsert: true
		}, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi
			console.log("updateBtcOtp BlockStatus: ACTIVE success");
			callback(err, res);
		});
	},
	updateOtp: function (query, data, client, callback) {
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BtcOtp');
		collection.updateOne(query, {
			$set: data
		}, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi
			console.log("updateBtcOtp BlockStatus: ACTIVE success");
			callback(err, res);
		});
	},
	insertBTCFile: function (objFile, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCFile');
		const colog = db.collection('BTCFileLog');
		colog.insertOne(objFile, function (erl, resl) {
			console.log("BTCFile :", objFile);

			collection.insertOne(objFile, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi
				callback(err, res);
			});
		});
	},
	insertBTCFileSmart: function (objFile, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCFileSmart');
		//var objCallback = null;
		console.log("BTCFileSmart :", objFile);
		collection.insertOne(objFile, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi			
			callback(null, res);
		});
	},
	insertBTCSumaryFile: function (objFile, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCSumaryFile');
		//var objCallback = null;
		console.log("BTCSumaryFile :", objFile);
		collection.insertOne(objFile, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi			
			callback(null, res);
		});
	},
	insertBTCPoint: function (objPoint, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPoint');
		const colog = db.collection('BTCPointLog');
		colog.insertOne(objPoint, function (erl, resl) {
			collection.find({
				'ContentId': objPoint.ContentId,
				'TitleId': objPoint.TitleId,
				'GeoCodeProvincial': objPoint.GeoCodeProvincial,
				'Type': objPoint.Type
			}).toArray(function (err, results) {
				if (err) {
					throw err;
					console.log("err:", err);
				} else {
					if (results.length == 0) {
						collection.insertOne(objPoint, function (err, res) {
							//neu xay ra loi
							if (err) throw err;
							//neu khong co loi			
							callback(null, res);
						});
						console.log("Insert success BTCPoint", objPoint);
					} else {
						var objBTCPointUpdate = {
							$set: {
								"Point": objPoint.Point,
								"psid": objPoint.psid,
								"UserName": objPoint.UserName,
								"GeoCodeProvincial": objPoint.GeoCodeProvincial,
								"Type": objPoint.Type,
								"Provincial": objPoint.Provincial,
								"InputDate": objPoint.InputDate,
								"DiffPoint": results[0].TeamPoint - objPoint.Point
							}
						};
						collection.updateOne({
							'ContentId': objPoint.ContentId,
							'TitleId': objPoint.TitleId,
							'GeoCodeProvincial': objPoint.GeoCodeProvincial,
						}, objBTCPointUpdate, function (err, res) {
							//neu xay ra loi
							if (err) throw err;
							//neu khong co loi
							console.log("Update success BTCPoint", objPoint);
							callback(null, res);
						});
					}
				}
			});
		});
	},
	updateBTCPoint: function (objBTCPoint, client, callback) {
		console.log("Update BTCPoint", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPoint');
		const colog = db.collection('BTCPointLog');
		colog.insertOne(objBTCPoint, function (erl, resl) {
			/*var objBTCPointUpdate = {
				$set: {
					"TeamId": objBTCPoint.TeamId,
					"TeamName": objBTCPoint.TeamName,
					"TeamPoint": objBTCPoint.TeamPoint,
					"DiffPoint": objBTCPoint.DiffPoint,
					"TeamNote": objBTCPoint.TeamNote,
					"TeamPsid": objBTCPoint.TeamPsid,
					"TeamUserName": objBTCPoint.TeamUserName,
					"UpdateDate": objBTCPoint.UpdateDate,
				}
			};*/
			var objBTCPointUpdate;
			if (objBTCPoint.Unit)
				objBTCPointUpdate = {
					$set: {
						"Note": objBTCPoint.Note,
						"psid": objBTCPoint.psid,
						"UserName": objBTCPoint.UserName,
						"UpdateDate": objBTCPoint.UpdateDate,
						"TeamId": objBTCPoint.TeamId,
						"Point": objBTCPoint.Point,
						"DiffPoint": objBTCPoint.DiffPoint
					}
				};
			else objBTCPointUpdate = {
				$set: {
					"TeamId": objBTCPoint.TeamId,
					"TeamName": objBTCPoint.TeamName,
					"TeamPoint": objBTCPoint.TeamPoint,
					"DiffPoint": objBTCPoint.DiffPoint,
					"TeamNote": objBTCPoint.TeamNote,
					"TeamPsid": objBTCPoint.TeamPsid,
					"TeamUserName": objBTCPoint.TeamUserName,
					"UpdateDate": objBTCPoint.UpdateDate,
				}
			};
			collection.updateOne({
				'ContentId': objBTCPoint.ContentId,
				'TitleId': objBTCPoint.TitleId,
				'GeoCodeProvincial': objBTCPoint.GeoCodeProvincial,
				'Type': objBTCPoint.Type
			}, objBTCPointUpdate, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi
				console.log("Update BTCPoint success");
				callback(null, res);
			});
		});
	},
	updateStatusBTCPoint: function (objBTCPoint, client, callback) {
		console.log("Update Approve status BTCPoint", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPoint');
		const colog = db.collection('BTCPointLog');
		colog.insertOne(objBTCPoint, function (erl, resl) {
			var objBTCPointUpdate = {
				$set: {
					"TeamId": objBTCPoint.TeamId,
					"TeamName": objBTCPoint.TeamName,
					//"TeamPoint": objBTCPoint.TeamPoint,
					//"DiffPoint": objBTCPoint.DiffPoint,
					"TeamNote": objBTCPoint.TeamNote,
					"TeamPsid": objBTCPoint.TeamPsid,
					"TeamUserName": objBTCPoint.TeamUserName,
					"UpdateDate": objBTCPoint.UpdateDate,
					"ApprovePsid": objBTCPoint.ApprovePsid,
					"ApproveUserName": objBTCPoint.ApproveUserName,
					"ApproveDate": objBTCPoint.ApproveDate,
					"ApproveStatus": objBTCPoint.ApproveStatus,
				}
			};
			collection.updateOne({
				'ContentId': objBTCPoint.ContentId,
				'TitleId': objBTCPoint.TitleId,
				'GeoCodeProvincial': objBTCPoint.GeoCodeProvincial,
				'Type': objBTCPoint.Type
			}, objBTCPointUpdate, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi
				console.log("Update Approve status BTCPoint success");
				callback(null, res);
			});
		});
	},
	reUpdateStatusBTCPoint: function (objBTCPoint, client, callback) {
		console.log("Update Approve status BTCPoint", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPoint');
		collection.find({
			'ContentId': objBTCPoint.ContentId,
			'TitleId': objBTCPoint.TitleId,
			'GeoCodeProvincial': objBTCPoint.GeoCodeProvincial,
			'Type': objBTCPoint.Type
		}).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
			} else {
				if (results.length > 0) {
					if (results[0].ApproveStatus = 'CANCEL') {
						var objBTCPointUpdate = {
							$set: {
								"ApproveStatus": null,
							}
						};
						collection.updateOne({
							'ContentId': objBTCPoint.ContentId,
							'TitleId': objBTCPoint.TitleId,
							'GeoCodeProvincial': objBTCPoint.GeoCodeProvincial,
							'Type': objBTCPoint.Type
						}, objBTCPointUpdate, function (err, res) {
							//neu xay ra loi
							if (err) throw err;
							//neu khong co loi
							console.log("ReUpdate cancel status BTCPoint");
							callback(null, res);
						});
					} else {
						callback(null, null);
					}
				} else {
					callback(null, null);
				}
			}
		});

	},
	updateBTCPointSmart: function (objBTCPoint, client, callback) {
		console.log("Update BTCPointSmart", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPointSmart');
		collog = db.collection('BTCPointSmartLog');
		var objBTCPointUpdate = {
			$set: {
				"Note": objBTCPoint.Note,
				"Des": objBTCPoint.Des,
				"Point": objBTCPoint.Point,
				"TeamId": objBTCPoint.TeamId,
				"TeamName": objBTCPoint.TeamName,
				"TeamPoint": objBTCPoint.TeamPoint,
				"DiffPoint": objBTCPoint.DiffPoint,
				"TeamNote": objBTCPoint.TeamNote,
				"TeamPsid": objBTCPoint.TeamPsid,
				"TeamUserName": objBTCPoint.TeamUserName,
				"UpdateDate": objBTCPoint.UpdateDate,
			}
		};
		objBTCPoint.Id = objBTCPoint._id;
		objBTCPoint._id = null;
		collog.insertOne(objBTCPoint, function (erl, resl) {			
			collection.updateOne({
				'_id': objBTCPoint.Id,
				'ContentId': objBTCPoint.ContentId,
				'GeoCodeProvincial': objBTCPoint.GeoCodeProvincial,
			}, objBTCPointUpdate, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi
				console.log("Update BTCPoint success");
				callback(null, res);
			});
		});
	},
	teamupdateBTCPointSmart: function (objBTCPoint, client, callback) {
		console.log("Update BTCPointSmart", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPointSmart');
		collog = db.collection('BTCPointSmartLog');
		var objBTCPointUpdate = {
			$set: {
				"TeamPoint": objBTCPoint.TeamPoint,
				"DiffPoint": objBTCPoint.DiffPoint,
				"TeamNote": objBTCPoint.TeamNote,
				"TeamPsid": objBTCPoint.TeamPsid,
				"TeamUserName": objBTCPoint.TeamUserName,
				"UpdateDate": objBTCPoint.UpdateDate,
			}
		};
		objBTCPoint.Id = objBTCPoint._id;
		objBTCPoint._id = null;
		collog.insertOne(objBTCPoint, function (erl, resl) {
			collection.updateOne({
				'_id': objBTCPoint.Id,
			}, objBTCPointUpdate, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi
				console.log("Update BTCPoint success");
				callback(null, res);
			});
		});
	},
	updateStatusBTCPointSmart: function (objBTCPoint, client, callback) {
		console.log("Update Approve status BTCPointSmart", objBTCPoint);
		// Get the Users collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPointSmart');
		var objBTCPointUpdate = {
			$set: {
				"TeamId": objBTCPoint.TeamId,
				"TeamName": objBTCPoint.TeamName,
				"TeamNote": objBTCPoint.TeamNote,
				"TeamPsid": objBTCPoint.TeamPsid,
				"TeamUserName": objBTCPoint.TeamUserName,
				"UpdateDate": objBTCPoint.UpdateDate,
				"ApprovePsid": objBTCPoint.ApprovePsid,
				"ApproveUserName": objBTCPoint.ApproveUserName,
				"ApproveDate": objBTCPoint.ApproveDate,
				"ApproveStatus": objBTCPoint.ApproveStatus,
			}
		};
		collection.updateOne({
			'_id': objBTCPoint._id,
		}, objBTCPointUpdate, function (err, res) {
			//neu xay ra loi
			if (err) throw err;
			//neu khong co loi
			console.log("Update Approve status BTCPointSmart success");
			callback(null, res);
		});
	},
	findSumpointByProvincalTeam: function (pipeline, options, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCPoint');
		collection.aggregate(pipeline, options).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	getNextSequenceValue: function (sequenceName, client, callback) {
		let db = client.db(DATA_BASE_NAME);
		let collection = db.collection('Counters');
		collection.findAndModify({
				_id: sequenceName
			}, [], {
				$inc: {
					sequence_value: 1
				}
			}, {
				upsert: true,
				new: true
			},
			function (err, doc) {
				console.log("getNextSequenceValue: ", doc.value);
				if (err) throw err;
				callback(err, doc);
			}
		);
		// return sequenceDocument.sequence_value;
	},
	insertBTCPointSmart: function (objPoint, client, callback) {
		// Get the documents collection
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BTCPointSmart');
		collog = db.collection('BTCPointSmartLog');
		objPoint.Id = objPoint._id;
		collog.insertOne(objPoint, function (erl, resl) {
			collection.insertOne(objPoint, function (err, res) {
				//neu xay ra loi
				if (err) throw err;
				//neu khong co loi			
				callback(null, res);
			});
		});
			
		//Chỉ insert
		//collection.find({
		//    'ContentId': objPoint.ContentId,
		//    'GeoCodeProvincial': objPoint.GeoCodeProvincial
		//}).toArray(function (err, results) {
		//    if (err) {
		//        console.log("err:", err);
		//    } else {
		//        if (results.length == 0) {
		//            collection.insertOne(objPoint, function (err, res) {
		//                //neu xay ra loi
		//                if (err) throw err;
		//                //neu khong co loi			
		//                callback(null, res);
		//            });
		//            console.log("Insert success BTCPointSmart", objPoint);
		//        } else {
		//            var objBTCPointUpdate = {
		//                $set: {
		//                    "Point": objPoint.Point,
		//                    "psid": objPoint.psid,
		//                    "UserName": objPoint.UserName,
		//                    "GeoCodeProvincial": objPoint.GeoCodeProvincial,
		//                    "Provincial": objPoint.Provincial,
		//                    "InputDate": objPoint.InputDate,
		//                    "DiffPoint": results[0].TeamPoint - objPoint.Point
		//                }
		//            };
		//            collection.updateOne({
		//                'ContentId': objPoint.ContentId,
		//                'GeoCodeProvincial': objPoint.GeoCodeProvincial,
		//                '_id': objPoint._id
		//            }, objBTCPointUpdate, function (err, res) {
		//                //neu xay ra loi
		//                if (err) throw err;
		//                //neu khong co loi
		//                console.log("Update success BTCPointSmart", objPoint);
		//                callback(null, res);
		//            });
		//        }
		//    }
		//});
	},

	authPic: function (id, psid, name, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		let coll = db.collection('Counters');
		const collection = db.collection('BtcPic');
		var objUpdate = {
			$set: {
				"Status": "AUTH",
				"AuthName": name,
				"AuthId": psid
			}
		};
		collection.updateOne({
			'_id': ObjectId(id)
		}, objUpdate, function (err, res) {

			if (err) {
				console.log("Update err:", err);
				callback(err);
			} else {
				collection.find({
					'_id': ObjectId(id)
				}).toArray(function (err, rs) {
					console.log('Insert BTCFile', rs);
					var objFile = {};
					objFile.ContentId = rs[0].ContentId;
					objFile.TitleId = rs[0].TitleId;
					objFile.RequireId = rs[0].RequireId;
					objFile.FileLink = rs[0].Link;
					objFile.LinkNote = rs[0].Note;
					objFile.FileType = 'P';
					objFile.psid = psid;
					objFile.oid = ObjectId(id);
					objFile.UserName = name;
					objFile.GeoCodeProvincial = rs[0].GeoCodeProvincial;
					objFile.Provincial = rs[0].Provincial;
					objFile.Type = 'Cấp tỉnh'; //rs[0].Type;
					objFile.InputDate = rs[0].InsertDate;
					coll.findAndModify({
							_id: 'FileUpload'
						}, [], {
							$inc: {
								sequence_value: 1
							}
						}, {
							upsert: true,
							new: true
						},
						function (err, doc) {
							console.log("getNextSequenceValue: ", doc.value.sequence_value);
							objFile._id = doc.value.sequence_value;
							const filecoll = db.collection('BTCFile');
							filecoll.insertOne(objFile, function (err, res) {
								//neu xay ra loi
								if (err) throw err;
								//neu khong co loi
								callback(err, res);
							});
						}
					);

				});
			}
		});


	},

	refusePic: function (id, psid, name, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		const collection = db.collection('BtcPic');
		var objUpdate = {
			$set: {
				"Status": "CANCEL",
				"AuthName": name,
				"AuthId": psid
			}
		};
		collection.updateOne({
			'_id': ObjectId(id)
		}, objUpdate, function (err, res) {

			if (err) {
				console.log("Update err:", err);
				callback(err);
			} else callback(err, res);

		});


	},

	findCheckBTCFile: function (pipeline, options, client, callback) {
		const db = client.db(DATA_BASE_NAME);
		collection = db.collection('BTCFile');
		collection.aggregate(pipeline, options).toArray(function (err, results) {
			if (err) {
				console.log("err:", err);
				callback(err);
			} else {
				callback(results);
			}
		});
	},
	// Toanva process User - End

}
