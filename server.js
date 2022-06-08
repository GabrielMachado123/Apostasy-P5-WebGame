const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express()
const port = 3000


app.use(express.static('Public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//creates instance to make connection to the sql database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "apostasy",

});

function insertNewHero(pI,pU){
	
	let sql = "INSERT INTO hero (`playerId_fk`, `hero_name`, `class`, `lvl`, `experience`) VALUES ('"+pI+"','"+pU+"', 'warrior', '1',' 0')";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result)
	});
};

function updateDungeonTime(){
	console.log("hey");
	
let sql6 = "UPDATE player SET dungeonTime = "+0+"";
			
db.query(sql6,(err,result)=>{
	if(err) throw err;
console.log(result);
});	
};

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!");
});





setInterval(function(){ updateDungeonTime(); }, 3600000);







app.post('/getDungeonTime',(req,res)=>{
	
let playerId = req.body.playerId;




let sql = "SELECT dungeonTime FROM player WHERE playerId='"+playerId+"'";
db.query(sql,(err,result)=>{
	if(err) throw err;
		res.send(result);

		let sql6 = "UPDATE player SET dungeonTime = "+1+" WHERE playerId='"+playerId+"'";
			
		db.query(sql6,(err,result)=>{
			if(err) throw err;



	});


});

});





app.get('/getUsername/:playerId',(req,res)=>{

	let playerId = req.params.playerId;
	
		
	let sql = "SELECT username FROM player WHERE playerId='"+playerId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		
			res.send(result);
		});
				
});


app.get('/getItems',(req,res)=>{

	let sql = "SELECT * FROM apostasy.item";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		
			res.send(result);
		});
				
});

app.get('/getInventory/:playerId',(req,res)=>{

let playerId = req.params.playerId;

let sql = "SELECT item_name, quantity, item_description FROM item, inventory WHERE itemId = itemId_fk and playerId_fk = '"+playerId+"'";
db.query(sql,(err,result)=>{
	if(err) throw err;

		res.send(result);
		
});
});



	
app.post('/register',(req,res)=>{
	let playerUsername = req.body.playerUsername;
	let playerPassword = req.body.playerPassword;
	let pI;
	

	let sql = "SELECT * FROM player WHERE username='"+playerUsername+"'";
	db.query(sql,(err,result)=>{
	if(err) throw err;

	if(result.length<1){
		
		let sql = "INSERT INTO player (`username`,`passwd`) VALUES ('"+playerUsername+"','"+playerPassword+"')";

		db.query(sql,(err,result)=>{
		if(err) throw err;



			let sql = "SELECT playerId FROM Player WHERE username='"+playerUsername+"' AND passwd='"+playerPassword+"'";

				db.query(sql,(err,result)=>{
				if(err) throw err;
				pI = result[0].playerId;

					res.send(result);
			        insertNewHero(pI,playerUsername);	

					let sql = "INSERT INTO inventory (`playerId_fk`,`itemId_fk`,`quantity`) VALUES ('"+pI+"','"+1+"','"+0+"'), ('"+pI+"','"+2+"','"+0+"'), ('"+pI+"','"+3+"','"+0+"'), ('"+pI+"','"+4+"','"+0+"'), ('"+pI+"','"+5+"','"+0+"'), ('"+pI+"','"+6+"','"+0+"'), ('"+pI+"','"+7+"','"+0+"'), ('"+pI+"','"+8+"','"+0+"'), ('"+pI+"','"+9+"','"+0+"')";

					db.query(sql,(err,result)=>{
					if(err) throw err;
				});

		});
	});

	}else{

    let ack = []
	res.send(ack);

	}

});
});

app.post('/login',(req,res)=>{

let playerUsername = req.body.playerUsername;
let playerPassword = req.body.playerPassword;


let sql = "SELECT * FROM player WHERE username='"+playerUsername+"'";

db.query(sql,(err,result)=>{
	if(err) throw err;
		if(result.length>=1){
			let sql = "SELECT playerId FROM player WHERE username='"+playerUsername+"' AND passwd='"+playerPassword+"'";
			
			db.query(sql,(err,result)=>{
				if(err) throw err;

				res.send(result);
				
			}
			);
		}else{
			let ack = []
			res.send(ack)
		}



	});
});





app.post('/trade',(req,res)=>{

let player_sellingId_fk = req.body.player_sellingId_fk;
let item_sellingId_fk = req.body.item_sellingId_fk;
let item_buyingId_fk = req.body.item_buyingId_fk;
let quantity_Selling = req.body.quantity_Selling;
let quantity_Buying = req.body.quantity_Buying;
let quantity_Trade = req.body.quantity_Trade;
let itemSoldQtInInventory;
let emptyArray = [];
let emptyArray2 = [1,2,3,4];

let sql7 = "SELECT * FROM apostasy.trade WHERE  player_sellingId_fk = '"+player_sellingId_fk+"';"
				
				db.query(sql7,(err,result)=>{
					if(err) throw err;

if(result.length < 1 ){



				let sql9 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";
				
				db.query(sql9,(err,result)=>{
					if(err) throw err;
				
					if(result.length > 0){			
					itemSoldQtInInventory = result[0].quantity;
					if(itemSoldQtInInventory >= quantity_Selling * quantity_Trade){
						

	let sql = "INSERT INTO trade (`player_sellingId_fk`,`item_sellingId_fk`,`item_buyingId_fk`,`quantity_Selling`,`quantity_Buying`,`quantity_Trade` ) VALUES ('"+player_sellingId_fk+"','"+item_sellingId_fk+"','"+item_buyingId_fk+"','"+quantity_Selling+"','"+quantity_Buying+"','"+quantity_Trade+"')";
			db.query(sql,(err,result)=>{
			if(err) throw err;

    let sql2 = "SELECT * FROM apostasy.trade WHERE  player_sellingId_fk = '"+player_sellingId_fk+"';"

			db.query(sql2,(err,result)=>{
				if(err) throw err;
               
				res.send(result);	
			});

	});
}	else{
	
	res.send(emptyArray);
}	
				}else{
				
					res.send(emptyArray);
				}
			}

			);	
				}else{
					
					res.send(emptyArray2);
				} } );
});
	

app.get('/getTrades/:playerId',(req,res)=>{

	let playerId = req.params.playerId;
	
	let sql = "SELECT item_sellingId_fk, item_buyingId_fk, quantity_Selling, quantity_Buying, quantity_Trade FROM trade WHERE  player_sellingId_fk = '"+playerId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
	
			res.send(result);
	
	});
	});

	app.post('/Rtrade',(req,res)=>{

		let player_sellingId_fk = req.body.player_sellingId_fk;
		
			let sql = "DELETE FROM trade WHERE player_sellingId_fk = '"+player_sellingId_fk+"'";
		
					db.query(sql,(err,result)=>{
					if(err) throw err;
		
						res.send(result);	
					});
		
			});



			app.get('/getbPostedTrades/:bI/:playerId',(req,res)=>{
                let playerId = req.params.playerId;
				let itemSellingId = req.params.bI;
				let sql = "SELECT player_sellingId_fk, item_buyingId_fk, quantity_Selling, quantity_Buying, quantity_Trade FROM trade WHERE item_sellingId_fk ="+itemSellingId+" AND player_sellingId_fk !="+playerId+"";
				db.query(sql,(err,result)=>{
					if(err) throw err;
						res.send(result);
					});
					
							
			});


			app.get('/getsPostedTrades/:bI/:playerId',(req,res)=>{
				let playerId = req.params.playerId;
				let itemSellingId = req.params.bI;
			
				let sql = "SELECT player_sellingId_fk, item_sellingId_fk, quantity_Selling, quantity_Buying, quantity_Trade FROM trade WHERE item_buyingId_fk ="+itemSellingId+"  AND player_sellingId_fk !="+playerId+"";
				db.query(sql,(err,result)=>{
					if(err) throw err;
						res.send(result);
					});
							
			});




			app.post('/buy',(req,res)=>{

				let player_sellingId_fk = req.body.player_sellingId_fk;
				let item_sellingId_fk = req.body.item_sellingId_fk;
				let item_buyingId_fk = req.body.item_buyingId_fk;
				let quantity_Selling = req.body.quantity_Selling;
				let quantity_Buying = req.body.quantity_Buying;
				let quantity_Trade = req.body.quantity_Trade;
				let playerId = req.body.playerBuying;
				let itemBoughtQtInInventory;
				let itemSoldQtInInventory;
				let newAmoutB;
				let newAmoutS;
				let itemBoughtQtInInventoryS;
				let itemSoldQtInInventoryS;
				let newAmoutBS;
				let newAmoutSS;
				let emptyarr = [];


				let sql9 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+playerId+"";
				
				db.query(sql9,(err,result)=>{
					if(err) throw err;
					if(result.length > 0){			
					itemSoldQtInInventory = result[0].quantity;
		
								
if(itemSoldQtInInventory < quantity_Selling * quantity_Trade){

	res.send(emptyarr)
}
else {
	      
	let sql1 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_buyingId_fk+" AND playerId_fk = "+playerId+"";
				
	db.query(sql1,(err,result)=>{
		if(err) throw err;
	

	itemBoughtQtInInventory = result[0].quantity;
	
	newAmoutB = (quantity_Buying * quantity_Trade)  + itemBoughtQtInInventory;


	let sql2 = "UPDATE inventory SET quantity = "+newAmoutB+" WHERE itemId_fk = "+item_buyingId_fk+" AND playerId_fk = "+playerId+" ";
	
	db.query(sql2,(err,result)=>{
		if(err) throw err;
			

	let sql3 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+playerId+"";
	
	db.query(sql3,(err,result)=>{
		if(err) throw err;
	itemSoldQtInInventory = result[0].quantity;
	newAmoutS =  itemSoldQtInInventory - (quantity_Selling * quantity_Trade);		


		let sql4 = "UPDATE inventory SET quantity = "+newAmoutS+" WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+playerId+"";
	
				db.query(sql4,(err,result)=>{
				if(err) throw err;


			

			// player selling



			let sql5 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_buyingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";
	
			db.query(sql5,(err,result)=>{
				if(err) throw err;
			itemBoughtQtInInventoryS = result[0].quantity;
			newAmoutBS = itemBoughtQtInInventoryS - (quantity_Buying * quantity_Trade);
					
	

			let sql6 = "UPDATE inventory SET quantity = "+newAmoutBS+" WHERE itemId_fk = "+item_buyingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";
			
			db.query(sql6,(err,result)=>{
				if(err) throw err;
					
		

			let sql7 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";
			
			db.query(sql7,(err,result)=>{
				if(err) throw err;
			itemSoldQtInInventoryS = result[0].quantity;
			newAmoutSS = (quantity_Selling * quantity_Trade) + itemSoldQtInInventoryS;		
			
				let sql8 = "UPDATE inventory SET quantity = "+newAmoutSS+" WHERE itemId_fk = "+item_sellingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";
			
						db.query(sql8,(err,result)=>{
						if(err) throw err;
                     let arrayToSend = [1,2,3];   

						res.send(arrayToSend)

					

					});		
				});
			});
		});
	});
});

});

});
}


}else{
	res.send(emptyarr);
}
});
});



app.post('/sell',(req,res)=>{

	let player_sellingId_fk = req.body.player_sellingId_fk;
	let item_sellingId_fk = req.body.item_sellingId_fk;
	let item_buyingId_fk = req.body.item_buyingId_fk;
	let quantity_Selling = req.body.quantity_Selling;
	let quantity_Buying = req.body.quantity_Buying;
	let quantity_Trade = req.body.quantity_Trade;
	let playerId = req.body.playerBuying;
	let itemBoughtQtInInventory;
	let itemSoldQtInInventory;
	let newAmoutB;
	let newAmoutS;
	let itemBoughtQtInInventoryS;
	let itemSoldQtInInventoryS;
	let newAmoutBS;
	let newAmoutSS;
	let emptyarr = [];



		let sql10 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_buyingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";

db.query(sql10,(err,result)=>{
	if(err) throw err;
	if(result.length > 0){
itemBoughtQtInInventoryS = result[0].quantity;


	
		
if(itemBoughtQtInInventoryS < quantity_Buying * quantity_Trade){
res.send(emptyarr)

}
else {

let sql1 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_buyingId_fk+" AND playerId_fk = "+playerId+"";
	
db.query(sql1,(err,result)=>{
if(err) throw err;


itemBoughtQtInInventory = result[0].quantity;

newAmoutB = (quantity_Buying * quantity_Trade)  + itemBoughtQtInInventory;


let sql2 = "UPDATE inventory SET quantity = "+newAmoutB+" WHERE itemId_fk = "+item_buyingId_fk+" AND playerId_fk = "+playerId+" ";

db.query(sql2,(err,result)=>{
if(err) throw err;


let sql3 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+playerId+"";

db.query(sql3,(err,result)=>{
if(err) throw err;
itemSoldQtInInventory = result[0].quantity;
newAmoutS =  itemSoldQtInInventory - (quantity_Selling * quantity_Trade);		


let sql4 = "UPDATE inventory SET quantity = "+newAmoutS+" WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+playerId+"";

	db.query(sql4,(err,result)=>{
	if(err) throw err;




// player selling



let sql5 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_buyingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";

db.query(sql5,(err,result)=>{
	if(err) throw err;
itemBoughtQtInInventoryS = result[0].quantity;
newAmoutBS = itemBoughtQtInInventoryS - (quantity_Buying * quantity_Trade);
		


let sql6 = "UPDATE inventory SET quantity = "+newAmoutBS+" WHERE itemId_fk = "+item_buyingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";

db.query(sql6,(err,result)=>{
	if(err) throw err;
		


let sql7 = "SELECT quantity FROM inventory WHERE itemId_fk ="+item_sellingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";

db.query(sql7,(err,result)=>{
	if(err) throw err;
itemSoldQtInInventoryS = result[0].quantity;
newAmoutSS = (quantity_Selling * quantity_Trade) + itemSoldQtInInventoryS;		

	let sql8 = "UPDATE inventory SET quantity = "+newAmoutSS+" WHERE itemId_fk = "+item_sellingId_fk+" AND playerId_fk = "+player_sellingId_fk+"";

			db.query(sql8,(err,result)=>{
			if(err) throw err;

			let arrayToSend = [1,2,3];   

			res.send(arrayToSend)
		});		
	});
});
});
});
});

});

});
}

}else{
	res.send(emptyarr);
}
});

});







app.post('/createFight',(req,res)=>{
	let playerId = req.body.playerId;

	let sql = "SELECT fightId FROM fight WHERE playerId_fk = '"+playerId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length < 1){
			let sql = "INSERT INTO fight (`playerId_fk`) VALUES ('"+playerId+"')";
			db.query(sql,(err,result)=>{
				if(err) throw err;
				let sql = "SELECT fightId FROM fight WHERE playerId_fk = '"+playerId+"'";
				db.query(sql,(err,result)=>{
					if(result.length > 0){
						if(err) throw err;
						res.send(result);
					} else {
						let ack = [];
						res.send(ack);
					}
				});
			});
		} else {
			let fightId = result[0].fightId;
			let sql = "DELETE FROM heroInFight WHERE fightId_fk = '"+fightId+"'";
			db.query(sql,(err,result)=>{
				if(err) throw err;
				let sql = "DELETE FROM enemyInFight WHERE fightId_fk = '"+fightId+"'";
				db.query(sql,(err,result)=>{
					if(err) throw err;
					let sql = "SELECT fightId FROM fight WHERE playerId_fk = '"+playerId+"'";
					db.query(sql,(err,result)=>{
						if(result.length > 0){
							if(err) throw err;
							res.send(result);
						} else {
							let ack = [];
							res.send(ack);
						}
					});
				});
			});
		}
	});
});



app.post('/createFightHero',(req, res)=>{
	let playerId = req.body.playerId;
	let fightId = req.body.fightId;
	let herostats = [];
	let Insert;

	let sql = "SELECT heroId, weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId, class, lvl, slot FROM hero WHERE playerId_fk = '"+playerId+"' AND slot != 0";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			for(let i = 0; i < result.length; i++){
				herostats[i] = {
					"id": 0,
					"level": 0,
					"class": 0,
					"slot": 0,
					"damage": {
						"base": 0,
						"growth": 0,
						"final": 0
					},
					"health": {
						"base": 0,
						"growth": 0,
						"final": 0
					},
					"weapon": {
						"id": 0,
						"damage": 0,
						"health": 0
					},
					"armor": {
						"id": 0,
						"damage": 0,
						"health": 0
					},
					"acessory": {
						"id:": 0,
						"damage": 0,
						"health": 0
					}
				}
				herostats[i].id = result[i].heroId;
				herostats[i].level = result[i].lvl;
				herostats[i].class = result[i].class;
				herostats[i].slot = result[i].slot;
										
				if(result[i].class = "warrior"){
					herostats[i].damage.base = 10;
					herostats[i].damage.growth = 10;
					herostats[i].health.base = 100;
					herostats[i].health.growth = 35;
				}
				else if(result[i].class = "knight") {
					herostats[i].damage.base = 5;
					herostats[i].damage.growth = 5;
					herostats[i].health.base = 150;
					herostats[i].health.growth = 50;
				}
				else if(result[i].class = "witch") {
					herostats[i].damage.base = 15;
					herostats[i].damage.growth = 20;
					herostats[i].health.base = 75;
					herostats[i].health.growth = 25;
				}
				else if(result[i].class = "ranger") {
					herostats[i].damage.base = 15;
					herostats[i].damage.growth = 15;
					herostats[i].health.base = 75;
					herostats[i].health.growth = 25;
				}

				herostats[i].weapon.id = result[i].weapon_fk_itemId;
				herostats[i].armor.id = result[i].armor_fk_itemId;
				herostats[i].acessory.id = result[i].acessory_fk_itemId;
			}

			let sql = "SELECT itemId_fk, item_damage, item_health FROM equipment WHERE equipmentTypeId_fk = 1";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				for(let i = 0; i < herostats.length; i++){
					if(herostats[i].weapon.id == null){
						herostats[i].weapon.damage = 0;
						herostats[i].weapon.health = 0;
					} else {
						for(let x = 0; x < result.length; x++){
							if(herostats[i].weapon.id == result[x].itemId_fk){
								herostats[i].weapon.damage = result[x].item_damage;
								herostats[i].weapon.health = result[x].item_health;
							}
						}
					}
				}
				let sql = "SELECT itemId_fk, item_damage, item_health FROM equipment WHERE equipmentTypeId_fk = 2";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					for(let i = 0; i < herostats.length; i++){
						if(herostats[i].armor.id == null){
							herostats[i].armor.damage = 0;
							herostats[i].armor.health = 0;
						} else {
							for(let x = 0; x < result.length; x++){
								if(herostats[i].armor.id == result[x].itemId_fk){
									herostats[i].armor.damage = result[x].item_damage;
									herostats[i].armor.health = result[x].item_health;
								}
							}
						}
					}
					let sql = "SELECT itemId_fk, item_damage, item_health FROM equipment WHERE equipmentTypeId_fk = 3";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						for(let i = 0; i < herostats.length; i++){
							if(herostats[i].acessory.id == null){
								herostats[i].acessory.damage = 0;
								herostats[i].acessory.health = 0;
							} else {
								for(let x = 0; x < result.length; x++){
									if(herostats[i].acessory.id == result[x].itemId_fk){
										herostats[i].acessory.damage = result[x].item_damage;
										herostats[i].acessory.health = result[x].item_health;
									}
								}
							}
							herostats[i].damage.final = herostats[i].damage.base + herostats[i].damage.growth * herostats[i].level + herostats[i].weapon.damage + herostats[i].armor.damage + herostats[i].acessory.damage;
							herostats[i].health.final = herostats[i].health.base + herostats[i].health.growth * herostats[i].level + herostats[i].weapon.health + herostats[i].armor.health + herostats[i].acessory.health;

							if(i==0){
								Insert = "('"+fightId+"', '"+herostats[i].id+"', '"+herostats[i].damage.final+"', '"+herostats[i].health.final+"', '"+herostats[i].health.final+"')"
							} else {
								Insert = Insert+",('"+fightId+"', '"+herostats[i].id+"', '"+herostats[i].damage.final+"', '"+herostats[i].health.final+"', '"+herostats[i].health.final+"')"
							}
						}
						let sql = "INSERT INTO heroinfight (`fightId_fk`, `heroId_fk`, `attack`, `maxHP`, `currentHP`) VALUES "+Insert+"";
						db.query(sql,(err, result)=>{
							if(err) throw err;
							let sql = "SELECT heroId, slot FROM hero, heroinfight WHERE heroId = heroId_fk AND fightId_fk = '"+fightId+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								console.log(result);
								res.send(result);
							});
						});
					});
				});
			});
		} else {
			let ack = [];
			res.send(ack);
		}
	});
});



app.post('/createFightEnemy',(req,res)=>{
	let playerId = req.body.playerId;
	let instance = req.body.instance;
	let fightId = req.body.fightId;	

	let enemytypes;
	let enemyamount;
	let Insert;
	let enemystats = [];

	let sql = "SELECT * FROM enemy";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		enemytypes = result.length;
		enemyamount = Math.floor(Math.random() * 4)+1;
		console.log("Enemy Amount: "+enemyamount);
		for(let i=0; i<enemyamount;i++){
			enemystats[i] = {
				"id": 0,
				"name": null,
				"level": 0,
				"slot": 0,
				"experience": 0,
				"damage": {
					"base": 0,
					"growth": 0,
					"final": 10
				},
				"health": {
					"base": 0,
					"growth": 0,
					"final": 10
				}
			};
			enemystats[i].id = Math.floor(Math.random() * enemytypes)+1;
			enemystats[i].slot = i+1;
			enemystats[i].name = result[enemystats[i].id - 1].enemy_name;
		}

		let sql = "SELECT lvl FROM hero, heroInFight WHERE heroId = heroId_fk && fightId_fk = '"+fightId+"' && playerId_fk = '"+playerId+"'";
		db.query(sql,(err, result)=>{
			if(err) throw err;
			for(let i=0; i<enemyamount; i++){
				for(let x=0; x<result.length; x++){
					enemystats[i].level = enemystats[i].level + result[x].lvl;
				}
				enemystats[i].level = enemystats[i].level / result.length;

				if(enemystats[i].name == "Jealosy"){
					enemystats[i].damage.base = 25;
					enemystats[i].damage.growth = 10;
					enemystats[i].health.base = 80;
					enemystats[i].health.growth = 20;
				} else if(enemystats[i].name == "Virtue"){
					enemystats[i].damage.base = 15;
					enemystats[i].damage.growth = 10;
					enemystats[i].health.base = 10;
					enemystats[i].health.growth = 35;
				}
			}
			let sql = "SELECT streak FROM fight WHERE playerId_fk = '"+playerId+"' && fightId = '"+fightId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				for(let i=0; i<enemyamount; i++){
					enemystats[i].level = enemystats[i].level + result[0].streak;
					enemystats[i].damage.final = enemystats[i].damage.base + enemystats[i].damage.growth * enemystats[i].level;
					enemystats[i].health.final = enemystats[i].health.base + enemystats[i].health.growth * enemystats[i].level;

					if(i==0){
						Insert = "('"+fightId+"', '"+enemystats[i].id+"', '"+enemystats[i].damage.final+"', '"+enemystats[i].health.final+"', '"+enemystats[i].health.final+"', '"+enemystats[i].slot+"')"
					} else {
						Insert = Insert+",('"+fightId+"', '"+enemystats[i].id+"', '"+enemystats[i].damage.final+"', '"+enemystats[i].health.final+"', '"+enemystats[i].health.final+"', '"+enemystats[i].slot+"')"
					}
				}
				let sql = "INSERT INTO enemyinfight (`fightId_fk`, `enemyId_fk`, `damage`, `maxHP`, `currentHP`, `slot`) VALUES "+Insert+"";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					let sql = "SELECT enemyInFightId, slot FROM enemyinfight WHERE fightId_fk = '"+fightId+"'";
					db.query(sql, (err, result)=>{
						if(err) throw err;
						if(result.length > 0){
							res.send(result);
						}else{
							let ack = [];
							res.send(ack);
						};
					});
				});
			});
		});
	});
});

app.get('/getHero/:heroId/:fightId',(req,res)=>{
	let heroId = req.params.heroId;
	let fightId = req.params.fightId;
	let sql = "SELECT hero_name, class, maxHP, currentHP, currentMP, cover, thornmail, down FROM hero, heroinfight WHERE heroId = heroId_fk AND heroId_fk = '"+heroId+"' AND fightId_fk = '"+fightId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}		
	});
});

app.get('/getConsumables/:playerId',(req,res)=>{
	let playerId = req.params.playerId;
	let sql = "SELECT item_name, quantity FROM item, consumable, inventory WHERE itemId = inventory.itemId_fk AND inventory.itemId_fk = consumable.itemId_fk AND playerId_fk = '"+playerId+"' AND quantity > 0";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}
	});
});

app.get('/getEnemyStats/:enemyId/:fightId',(req,res)=>{
	let enemyId = req.params.enemyId;
	let fightId = req.params.fightId;
	let sql = "SELECT enemy_name, maxHP, currentHP, mark FROM enemyinfight, enemy WHERE enemyInFightId = '"+enemyId+"' && fightId_fk = '"+fightId+"' && enemyId = enemyId_fk";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}
	});
})

app.post('/PerformAction',(req,res)=>{
	let action = {
		"source": {
			"instance": req.body.source.instance + 1,
			"team": req.body.source.team,
			"type": req.body.source.type,
			"action": req.body.source.action
			},
		"target": {
			"instance": req.body.target.instance + 1,
			"team": req.body.target.team
			},
		"fightId": req.body.fightId,
		"playerId": req.body.playerId
		}

	if(action.source.team == "Ally"){
		console.log("got to ally");
		if(action.source.type == "Ability"){
			console.log("got to ability");
			let sql = "SELECT heroId_fk, attack, class, maxHP, currentHP, currentMP FROM heroInFight, hero WHERE fightId_fk = '"+action.fightId+"' AND heroId_fk = heroId AND slot = '"+action.source.instance+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				if(result.length > 0){
					let id = result[0].heroId_fk;
					let attack = result[0].attack;
					let role = result[0].class;
					let maxHP = result[0].maxHP;
					let currentHP = result[0].currentHP;
					let currentMP = result[0].currentMP;

					if(role == "warrior"){
						//Bash
						if(action.source.action == 1){
							let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								if(result[0].mark == 1){
									attack = attack * 2;
								}
								let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"', mark = 0 WHERE slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(currentHP + Math.round(attack * 0.2) >= maxHP){
										sql = "UPDATE heroinfight SET currentHP = MaxHP WHERE heroId_fk = '"+id+"'";
									}else{
										attack = Math.round(attack * 0.2);
										sql = "UPDATE heroinfight SET currentHP = currentHP + '"+attack+"' WHERE heroId_fk = '"+id+"'";
									}
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": attack,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": attack,
												"heal": null,
												"manaheal": null,
												"amount": "Single",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							});

						//Execute
						} else if(action.source.action == 2){
							if(currentHP - Math.round(currentHP * 0.25) <= 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result[0].mark == 1){
										attack = attack * 2;
									}
									attack = attack * 2;
									let sql = "UPDATE enemyinfight SET currentHP = currentHP - "+attack+", mark = 0 WHERE slot = '"+action.target.instance+"'";
									console.log(sql);
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let sql = "UPDATE heroinfight SET currentHP = currentHP - '"+Math.round(currentHP * 0.25)+"' WHERE heroId_fk = '"+id+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let attacktype = {
												"source": {
													"heal": null,
													"healthcost": null,
													"manacost": null
												},
												"target": {
													"damage": null,
													"heal": null,
													"manaheal": null,
													"amount": "Single",
													"id": null 
												}
											}
											res.send(attacktype);
										});
									});
								});
							}

						//Cleave
						}else if(action.source.action == 3){
							if(currentHP - Math.round(currentHP * 0.10) <= 0){
								let ack = [];
								res.send(ack);
							} else {
								attack = Math.round((maxHP - currentHP)*0.5);
								let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"' WHERE fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "UPDATE heroinfight SET currentHP = currentHP - '"+Math.round(currentHP * 0.10)+"' WHERE heroId_fk = '"+id+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "All",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							}
			
						//Battle Rage
						}else if(action.source.action == 4){
							if(currentHP + Math.round((maxHP - currentHP)*0.6) >= maxHP){
								sql = "UPDATE heroinfight SET currentHP = maxHP WHERE heroId_fk = '"+id+"'";
							} else {
								sql = "UPDATE heroinfight SET currentHP = currentHP + '"+Math.round((maxHP - currentHP)*0.6)+"' WHERE heroId_fk = '"+id+"'";
							}
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let attacktype = {
									"source": {
										"heal": null,
										"healthcost": null,
										"manacost": null
									},
									"target": {
										"damage": null,
										"heal": null,
										"manaheal": null,
										"amount": "Single",
										"id": null 
									}
								}
								res.send(attacktype);
							});
			
						//War Cry
						}else if(action.source.action == 5){
							if(currentHP - Math.round(maxHP * 0.5) <= 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT currentMP, heroId_fk FROM heroinfight WHERE fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									for(let i=0; i<result.length; i++){
										let sql;
										if(result[i].currentMP + 50 >= 100){
											sql = "UPDATE heroinfight SET currentMP = 100 WHERE heroId_fk = '"+result[i].heroId_fk+"'";
										} else {
											sql = "UPDATE heroinfight SET currentMP = currentMP + 50 WHERE heroId_fk = '"+result[i].heroId_fk+"'";
										}
										db.query(sql,(err, result)=>{
											if(err) throw err;
										});
									}
									let sql = "UPDATE heroinfight SET currentHP = currentHP - '"+Math.round(maxHP * 0.50)+"' WHERE heroId_fk = '"+id+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "All",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});	
							}
						}
			
			
					} else if(role == "knight"){
			
						//Stab
						if(action.source.action == 1){
							let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								if(result[0].mark == 1){
									attack = attack * 2;
								}
								let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"', mark = 0 WHERE slot = '"+action.target.instance+"'";
								db.query(sql,(err,result)=>{
									if(err) throw err;
									if(currentMP + 10 >= 100){
										sql = "UPDATE heroinfight SET currentMP = 100 WHERE heroId_fk = '"+id+"'";
									} else {
										sql = "UPDATE heroinfight SET currentMP = currentMP + 10 WHERE heroId_fk = '"+id+"'";
									}
									db.query(sql,(err,result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "Single",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							});
			
			
						//Cover
						}else if(action.source.action == 2){
							if(currentMP - 10 >= 0){
								let sql = "UPDATE heroInFight SET cover = 0 WHERE fightId_fk = '"+action.fightId+"' && cover != 3";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "SELECT heroId_fk FROM heroInFight, hero WHERE heroId = heroId_fk && slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let sql = "UPDATE heroInFight set cover = 1 WHERE fightId_fk = '"+action.fightId+"' && heroId_fk = '"+result[0].heroId_fk+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let sql = "UPDATE heroInFight SET cover = 2, currentMP = currentMP - 10 WHERE fightId_fk = '"+action.fightId+"' && heroId_fk = '"+id+"'";
											db.query(sql,(err, result)=>{
												if(err) throw err;
												let attacktype = {
													"source": {
														"heal": null,
														"healthcost": null,
														"manacost": null
													},
													"target": {
														"damage": null,
														"heal": null,
														"manaheal": null,
														"amount": "All",
														"id": null 
													}
												}
												res.send(attacktype);
											});
										});
									});

										
								});
							}else {
								let ack = [];
								res.send(ack);
							}
			
						//Sword of Wrath
						}else if(action.source.action == 3){
							if(currentMP - 20 < 0){
								let ack = [];
								res.send(ack);
							} else {
								attack = attack + maxHP * 0.3;
								let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result[0].mark == 1){
										attack = attack * 2;
									}
									let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"', mark = 0 WHERE slot = '"+action.target.instance+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let sql = "UPDATE heroinfight SET currentMP = currentMP - 20 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let attacktype = {
												"source": {
													"heal": null,
													"healthcost": null,
													"manacost": null
												},
												"target": {
													"damage": null,
													"heal": null,
													"manaheal": null,
													"amount": "Single",
													"id": null 
												}
											}
											res.send(attacktype);
										});
									});
								});
							}
			
						//Shield Magic
						}else if(action.source.action == 4){
							if(currentMP - 80 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "UPDATE heroInFight SET cover = 3 WHERE fightId_fk ='"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "UPDATE heroInFight SET currentMP = currentMP - 80 WHERE fightId_fk ='"+action.fightId+"' && heroId_fk = '"+id+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "All",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							}
							
						//Thornmail
						}else if(action.source.action == 5){
							if(currentMP - 30 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "UPDATE heroInFight SET thornmail = 1, currentMP = currentMP - 30 WHERE fightId_fk ='"+action.fightId+"' && heroId_fk = '"+id+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let attacktype = {
										"source": {
											"heal": null,
											"healthcost": null,
											"manacost": null
										},
										"target": {
											"damage": null,
											"heal": null,
											"manaheal": null,
											"amount": "Single",
											"id": null 
										}
									}
									res.send(attacktype);
								});
							}
						}
			
					} else if(role == "witch"){
			
						//Meditate
						if(action.source.action == 1){
							let sql;
							if(currentMP + 20 > 100){
								sql = "UPDATE heroinfight SET currentMP = 100 WHERE heroId_fk = '"+id+"'";
							} else {
								sql = "UPDATE heroinfight SET currentMP = currentMP + 20 WHERE heroId_fk = '"+id+"'";
							}
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let attacktype = {
									"source": {
										"heal": null,
										"healthcost": null,
										"manacost": null
									},
									"target": {
										"damage": null,
										"heal": null,
										"manaheal": null,
										"amount": "Single",
										"id": null 
									}
								}
								res.send(attacktype);
							});
			
						//Resurrection
						}else if(action.source.action == 2){
							if(currentMP - 80 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT heroId_fk, down FROM heroInFight, hero WHERE heroId = heroId_fk && fightId_fk = '"+action.fightId+"' && slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result[0].down == 0){
										let ack = [];
										res.send(ack);	
									} else if(result[0].down == 1){
										let sql = "UPDATE heroInFight SET down = 0, currentHP = maxHP WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let sql = "UPDATE heroInFight SET currentMP = currentMP - 80 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
											db.query(sql,(err, result)=>{
												if(err) throw err;
												let attacktype = {
													"source": {
														"heal": null,
														"healthcost": null,
														"manacost": null
													},
													"target": {
														"damage": null,
														"heal": null,
														"manaheal": null,
														"amount": "Single",
														"id": null 
													}
												}
												res.send(attacktype);
											});
										});
									}
								});
							}
			
						//Circle of Healing
						}else if(action.source.action == 3){
							if(currentMP - 40 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT heroId_fk, maxHP, currentHP FROM heroInFight WHERE fightId_fk = '"+action.fightId+"' && down = false";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result.length > 0){
										let sql;
										attack = attack * 2;
										for(let i = 0; i < result.length; i++){
											if(result[0].currentHP + attack >= result[i].maxHP){
												sql = "UPDATE heroInFight SET currentHP = maxHP WHERE heroId_fk = '"+result[i].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
											} else {
												sql = "UPDATE heroInFight SET currentHP = currentHP + '"+attack+"' WHERE heroId_fk = '"+result[i].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
											}
											db.query(sql,(err, result)=>{
												if(err) throw err;
											});
										}
										sql = "UPDATE heroInFight SET currentMP = currentMP - 40 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let attacktype = {
												"source": {
													"heal": null,
													"healthcost": null,
													"manacost": null
												},
												"target": {
													"damage": null,
													"heal": null,
													"manaheal": null,
													"amount": "All",
													"id": null 
												}
											}
											res.send(attacktype);
										});
									} else {
										let ack = [];
										res.send(ack);
									}
								});
							}
			
						//Dark Skies
						}else if(action.source.action == 4){
							if(currentMP - 100 < 0){
								let ack = [];
								res.send(ack);
							} else {
								attack = attack * 1.5;
								let sql = "UPDATE enemyInFight SET currentHP = currentHP - '"+attack+"' WHERE fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "UPDATE heroInFight SET currentMP = currentMP - 100 WHERE fightId_fk = '"+action.fightId+"' && heroId_fk = '"+id+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "All",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							}
						//Flash Heal
						}else if(action.source.action == 5){
							if(currentMP - 20 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT heroId_fk, currentHP, maxHP FROM heroinfight, hero WHERE down = false && heroId = heroId_fk && slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result.length > 0){
										let sql;
										attack = attack * 3;
										if(result[0].currentHP + attack*3 > result[0].maxHP){
											sql = "UPDATE heroinfight SET currentHP = maxHP WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
										} else {
											sql = "UPDATE heroinfight SET currentHP = currentHP + '"+attack+"' WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
										}
										db.query(sql,(err, result)=>{
											if(err) throw err;
											sql = "UPDATE heroinfight SET currentMP = currentMP - 20 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
											db.query(sql,(err, result)=>{
												if(err) throw err;
												let attacktype = {
													"source": {
														"heal": null,
														"healthcost": null,
														"manacost": null
													},
													"target": {
														"damage": null,
														"heal": null,
														"manaheal": null,
														"amount": "Single",
														"id": null 
													}
												}
												res.send(attacktype);
											});
										});
									} else {
										let ack = [];
										res.send(ack);
									}
								});
							}
						}
			
					} else if(role == "ranger"){
						
						//Arcane Shot
						if(action.source.action == 1){
							let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								if(result[0].mark == 1){
									attack = attack * 2;
								}
								let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"', mark = 0 WHERE slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(currentMP + 10 >= 100){
										sql = "UPDATE heroinfight SET currentMP = 100 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
									} else {
										sql = "UPDATE heroinfight SET currentMP = currentMP + 10 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
									}
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "Single",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							});
			
						//Focus
						} else if(action.source.action == 2){
							if(currentMP - 30 < 0){
								let ack = [];
								res.send(ack);
							} else {
								attack = attack + attack * 0.2;
								let sql = "UPDATE heroInFight SET attack = '"+attack+"', currentMP = currentMP - 30 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let attacktype = {
										"source": {
											"heal": null,
											"healthcost": null,
											"manacost": null
										},
										"target": {
											"damage": null,
											"heal": null,
											"manaheal": null,
											"amount": "Single",
											"id": null 
										}
									}
									res.send(attacktype);
								});
							}
			
						//Deadly Shot
						}else if(action.source.action == 3){
							if(currentMP - 40 < 0){
								let ack = [];
								res.send(ack);
							} else {
								attack = attack * 1.75;
								let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result[0].mark == 1){
										attack = attack * 2;
									}
									let sql = "UPDATE enemyinfight SET currentHP = currentHP - '"+attack+"', mark = 0 WHERE slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let sql = "UPDATE heroinfight SET currentMP = currentMP - 40 WHERE heroId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let attacktype = {
												"source": {
													"heal": null,
													"healthcost": null,
													"manacost": null
												},
												"target": {
													"damage": null,
													"heal": null,
													"manaheal": null,
													"amount": "Single",
													"id": null 
												}
											}
											res.send(attacktype);
										});
									});
								});
							}
			
						//Barrage
						}else if(action.source.action == 4){
							if(currentMP - 20 < 0){
								let ack = [];
								res.send(ack);
							}else{
								attack = attack * 0.5;
								let sql = "UPDATE enemyInFight SET currentHP = currentHP - '"+attack+"' WHERE fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "UPDATE heroinfight SET currentMP = currentMP - 20 WHERE fightId_fk = '"+action.fightId+"' && heroId_fk ='"+id+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "All",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
							}
			
						//Hunter's Mark
						}else if(action.source.action == 5){
							if(currentMP - 30 < 0){
								let ack = [];
								res.send(ack);
							} else {
								let sql = "SELECT mark FROM enemyInFight WHERE slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									if(result[0].mark == 1){
										let ack = [];
										res.send(ack);
									} else {
										let sql = "UPDATE enemyInFight SET mark = 1 WHERE slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let sql = "UPDATE heroInFight SET currentMP = currentMP - 30 WHERE fightId_fk = '"+id+"' && fightId_fk = '"+action.fightId+"'";
											db.query(sql,(err, result)=>{
												if(err) throw err;
												let attacktype = {
													"source": {
														"heal": null,
														"healthcost": null,
														"manacost": null
													},
													"target": {
														"damage": null,
														"heal": null,
														"manaheal": null,
														"amount": "Single",
														"id": null 
													}
												}
												res.send(attacktype);
											});
										});
									}
								});
							}
						}
					}

				} else {
					let ack = [];
					res.send(ack);
				}
			});
		} else if(action.source.type == "Item"){
			let sql = "SELECT itemId, item_name, restoredHP, restoredMP, multiTarget, ressurection, quantity FROM item, consumable, inventory WHERE itemId = inventory.itemId_fk AND inventory.itemId_fk = consumable.itemId_fk AND playerId_fk = '"+action.playerId+"' AND quantity > 0";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let itemId;
				let restoredHP;
				let restoredMP;
				let multiTarget;
				let ressurection;
				if(result[action.source.action].item_name == "Health Potion"){
					itemId = result[action.source.action].itemId;
					let sql = "SELECT heroId_fk, maxHP, currentHP, down FROM heroInFight, hero WHERE heroId = heroId_fk && slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						console.log(result[0].down);
						if(result[0].down == 0){
							restoredHP = result[0].maxHP / 2;
							if(result[0].currentHP + restoredHP >= result[0].maxHP){
								sql = "UPDATE heroInFight SET currentHP = maxHP WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
							}else{
								sql = "UPDATE heroInFight SET currentHP = currentHP + '"+restoredHP+"' WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
							}
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let sql = "UPDATE inventory SET quantity = quantity - 1 WHERE playerId_fk = '"+action.playerId+"' && itemId_fk = '"+itemId+"'";
								db.query(sql,(err, result)=>{
									let attacktype = {
										"source": {
											"heal": null,
											"healthcost": null,
											"manacost": null
										},
										"target": {
											"damage": null,
											"heal": null,
											"manaheal": null,
											"amount": "Single",
											"id": null 
										}
									}
									res.send(attacktype);
								});
							});
						}else{
							let ack = [];
							res.send(ack);	
						}
					});	
				}else if(result[action.source.action].item_name == "Revive Potion"){
					itemId = result[action.source.action].itemId;
					let sql = "SELECT heroId_fk, down FROM heroInFight, hero WHERE down = 1 && heroId = heroId_fk && slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						if(result.length > 0){
							let sql = "UPDATE heroInFight SET down = 0, currentHP = maxHP/4 WHERE heroId_fk = '"+result[0].heroId_fk+"' && && slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
							db.query(sql,(err, result)=>{
									if(err) throw err;
									let sql = "UPDATE inventory SET quantity = quantity - 1 WHERE playerId_fk = '"+action.playerId+"' && itemId_fk = '"+itemId+"'";
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "Single",
												"id": null 
											}
										}
										res.send(attacktype);
									});
								});
						} else {
							let ack = [];
							res.send(ack);
						}
					});
				}else if(result[action.source.action].item_name == "Mana Potion"){
					itemId = result[action.source.action].itemId;
					let sql = "SELECT heroId_fk, down, currentMP FROM heroInFight, hero WHERE heroId = heroId_fk && slot = '"+action.target.instance+"' && fightId_fk = '"+action.fightId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						if(result[0].down == 0){
							restoredMP = 50;
							if(result[0].currentMP + restoredMP >= 100){
								sql = "UPDATE heroInFight SET currentMP = 100 WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
							}else{
								sql = "UPDATE heroInFight SET currentMP = currentMP + '"+restoredMP+"' WHERE heroId_fk = '"+result[0].heroId_fk+"' && fightId_fk = '"+action.fightId+"'";
							}
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let sql = "UPDATE inventory SET quantity = quantity - 1 WHERE playerId_fk = '"+action.playerId+"' && itemId_fk = '"+itemId+"'";
								db.query(sql,(err, result)=>{
									let attacktype = {
										"source": {
											"heal": null,
											"healthcost": null,
											"manacost": null
										},
										"target": {
											"damage": null,
											"heal": null,
											"manaheal": null,
											"amount": "Single",
											"id": null 
										}
									}
									res.send(attacktype);
								});
							});
						} else {
							let ack = [];
							res.send(ack);
						}
					});
				}
			});
		}
	}else if(action.source.team == "Enemy"){
		let sql = "SELECT heroId_fk, currentHP FROM heroInFight WHERE down = 0 AND fightId_fk = '"+action.fightId+"'";
		db.query(sql,(err, result)=>{
			if(err) throw err;
			if(result.length > 0){
				action.target.instance = Math.floor((Math.random() * result.length));
				action.target.id = result[action.target.instance].heroId_fk;
				let sql = "SELECT damage FROM enemyInFight WHERE slot = '"+action.source.instance+"' && fightId_fk = '"+action.fightId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					let damage = result[0].damage;
					let sql = "SELECT currentHP, cover, thornmail FROM heroInFight WHERE heroId_fk = '"+action.target.id+"' && fightId_fk = '"+action.fightId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						let currentHP = result[0].currentHP;

						if(result[0].thornmail == 1){
							let sql = "UPDATE enemyInFight SET currentHP = currentHP - '"+damage+"' WHERE slot = '"+action.source.instance+"' && fightId_fk = '"+action.fightId+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let sql = "UPDATE heroInFight SET thornmail = 0 WHERE heroId_fk = '"+action.target.id+"' && fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
								});
							});
						}

						if(result[0].cover == 3){
							let sql = "UPDATE heroInFight SET cover = 0 WHERE heroId_fk = '"+action.target.id+"' && fightId_fk = '"+action.fightId+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let attacktype = {
									"source": {
										"heal": null,
										"healthcost": null,
										"manacost": null
									},
									"target": {
										"damage": null,
										"heal": null,
										"manaheal": null,
										"amount": "Single",
										"id": action.target.instance 
									}
								}
								res.send(attacktype);
							});

						} else if(result[0].cover == 1){
							let sql = "UPDATE heroInFight SET cover = 0 WHERE heroId_fk = '"+action.target.id+"' && fightId_fk = '"+action.fightId+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let sql = "SELECT heroId_fk, currentHP, thornmail, slot FROM hero, heroInFight WHERE heroId = heroId_fk AND cover = 2 AND fightId_fk = '"+action.fightId+"'";
								db.query(sql,(err, result)=>{
									if(err) throw err;
									let coverid = result[0].heroId_fk;
									let coverhp = result[0].currentHP;

									if(result[0].thornmail == 1){
										let sql = "UPDATE enemyInFight SET currentHP = currentHP - '"+damage+"' WHERE slot = '"+action.source.instance+"' AND fightId_fk = '"+action.fightId+"'";
										db.query(sql,(err, result)=>{
											if(err) throw err;
											let sql = "UPDATE heroInFight SET thornmail = 0 WHERE heroId_fk = '"+coverid+"' AND fightId_fk = '"+action.fightId+"'";
											db.query(sql,(err, result)=>{
												if(err) throw err;
											});
										});
									}
									let sql;
									if(coverhp - damage <= 0){
										sql = "UPDATE heroInFight SET cover = 0, currentHP = 0, down = 1 WHERE heroId_fk = '"+coverid+"' AND fightId_fk = '"+action.fightId+"'";
									} else {
										sql = "UPDATE heroInFight SET cover = 0, currentHP = currentHP - '"+damage+"' WHERE heroId_fk = '"+coverid+"' AND fightId_fk = '"+action.fightId+"'";
									}
									db.query(sql,(err, result)=>{
										if(err) throw err;
										let attacktype = {
											"source": {
												"heal": null,
												"healthcost": null,
												"manacost": null
											},
											"target": {
												"damage": null,
												"heal": null,
												"manaheal": null,
												"amount": "Single",
												"id": action.target.instance 
											}
										}
										res.send(attacktype);

									});
								});
							});
						} else if(result[0].cover == 0 || result[0].cover == 2){
							let sql;
							if(currentHP - damage <= 0){
								sql = "UPDATE heroInFight SET currentHP = 0, down = 1 WHERE heroId_fk = '"+action.target.id+"' AND fightId_fk = '"+action.fightId+"'";
							} else {
								sql = "UPDATE heroInFight SET currentHP = currentHP - '"+damage+"' WHERE heroId_fk = '"+action.target.id+"' AND fightId_fk = '"+action.fightId+"'";
							}
							db.query(sql,(err, result)=>{
								if(err) throw err;
								let attacktype = {
									"source": {
										"heal": null,
										"healthcost": null,
										"manacost": null
									},
									"target": {
										"damage": null,
										"heal": null,
										"manaheal": null,
										"amount": "Single",
										"id": action.target.instance 
									}
								}
								res.send(attacktype);
							});
						}
					});
				});
			} else {
				let ack = [];
				res.send(ack);
			}
		});
	}
});

app.get('/getEnemyATBMaxTimer/:enemyid',(req,res)=>{
	let enemyid = req.params.enemyid;
	let Max;
	let sql = "SELECT enemy_name FROM enemy, enemyinfight WHERE enemyInFightId = '"+enemyid+"' AND enemyId = enemyId_fk"
	db.query(sql,(err, result)=>{
		if(result[0].enemy_name == "Jealosy"){
			Max = 7;
		}else if(result[0].enemy_name == "Virtue"){
			Max = 10;
		}
		result[0].Max = Max;
		res.send(result);
	});	
});



app.post('/Victory',(req,res)=>{
	let playerId = req.body.playerId;
	let fightId;
	let itemId;
	let level = 0;

	let sql = "SELECT itemId FROM item";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		itemId = result[Math.floor((Math.random() * result.length))].itemId;
			let sql = "SELECT * FROM loot WHERE playerId_fk = '"+playerId+"' && itemId_fk = '"+itemId+"'";
			db.query(sql,(err,result)=>{
				if(err) throw err;
				if(result < 1){
					sql = "INSERT INTO loot (`playerId_fk`, `itemId_fk`, `quantity`) VALUES ('"+playerId+"', '"+itemId+"', 1)";
				} else {
					sql = "UPDATE loot SET quantity = quantity + 1 WHERE playerId_fk = '"+playerId+"' AND itemId_fk = '"+itemId+"'";
				}
				db.query(sql,(err,result)=>{
					if(err) throw err;
					let sql = "SELECT fightId FROM fight WHERE playerId_fk = '"+playerId+"'";
					db.query(sql,(err,result)=>{
						if(err) throw err;
						fightId = result[0].fightId;
						let sql = "SELECT lvl FROM hero WHERE playerId_fk = '"+playerId+"' AND slot > 0";
						db.query(sql,(err,result)=>{
							if(err) throw err;
							for(let i = 0; i < result.length; i++){
								level = level + result[i].lvl;
							}
							level = level / result.length;
							let sql = "SELECT * FROM enemyInFight WHERE fightId_fk = '"+fightId+"'";
							db.query(sql,(err,result)=>{
								if(err) throw err;
								level = (level * 25) * result.length;
								let sql = "UPDATE hero SET experience = experience + '"+level+"' WHERE slot > 0 AND playerId_fk = '"+playerId+"'";
								db.query(sql,(err,result)=>{
									if(err) throw err;
									let sql = "SELECT experience, lvl FROM hero WHERE playerId_fk = '"+playerId+"' AND slot > 0";
									db.query(sql,(err,result)=>{
										if(err) throw err;
										for(let i = 0; i < result.length; i++){
											if(result[i].experience > result[i].lvl * 400){
												let sql = "UPDATE hero SET lvl = lvl + 1, experience = experience - '"+result[i].lvl*400+"' WHERE playerId_fk = '"+playerId+"' AND slot > 0";
												db.query(sql,(err,result)=>{
													if(err) throw err;
												});
											}
										}
										let sql = "UPDATE fight SET streak = streak + 1 WHERE fightId = '"+fightId+"' AND playerId_fk = '"+playerId+"'";
										db.query(sql,(err,result)=>{
											if(err) throw err;
											sql = "DELETE FROM enemyInFight WHERE fightId_fk = '"+fightId+"'";
											db.query(sql,(err,result)=>{
												if(err) throw err;
												let sql = "DELETE FROM heroInFight WHERE fightId_fk = '"+fightId+"'";
												db.query(sql,(err,result)=>{
													if(err) throw err;
													let sql = "SELECT item_name, quantity FROM item, loot WHERE itemId = itemId_fk AND playerId_fk = '"+playerId+"'";
													db.query(sql,(err,result)=>{
														if(err) throw err;
														res.send(result);
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
	});
});

app.post('/Defeat',(req,res)=>{
	let playerId = req.body.playerId;
	let fightId;
	let sql = "DELETE FROM loot WHERE playerId_fk = '"+playerId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		let sql = "SELECT fightId FROM fight WHERE playerId_fk = '"+playerId+"'";
		db.query(sql,(err,result)=>{
			if(err) throw err;
			fightId = result[0].fightId;
			let sql = "DELETE FROM heroInFight WHERE fightId_fk = '"+fightId+"'";
			db.query(sql,(err,result)=>{
				if(err) throw err;
				let sql = "DELETE FROM enemyInFight WHERE fightId_fk ='"+fightId+"'";
				db.query(sql,(err,result)=>{
					if(err) throw err;
					let sql = "DELETE FROM fight WHERE fightId ='"+fightId+"' AND playerId_fk = '"+playerId+"'";
					db.query(sql,(err,result)=>{
						if(err) throw err;
						res.send(true);
					});
				});
			});
		});
	});
});


app.post('/LeaveDungeon',(req,res)=>{
	let playerId = req.body.playerId;
	let itemId = [];
	let final;
	let sql = "SELECT itemId_fk, quantity FROM loot WHERE playerId_fk = '"+playerId+"'";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		final = result.length;
		for(let i = 0; i < result.length; i++){
			itemId[i] = {
				"id": result[i].itemId_fk,
				"quantity": result[i].quantity
			}
			let sql = "SELECT itemId_fk FROM inventory WHERE playerId_fk = '"+playerId+"' AND itemId_fk = '"+itemId[i].id+"'";
			db.query(sql,(err,result)=>{
				if(err) throw err;
				if(result.length > 0){
					sql = "UPDATE inventory SET quantity = quantity + '"+itemId[i].quantity+"' WHERE playerId_fk = '"+playerId+"' AND itemId_fk = '"+itemId[i].id+"'";
				} else {
					sql = "INSERT INTO inventory (`playerId_fk`, `itemId_fk`, `quantity`) VALUES ('"+playerId+"', '"+itemId[i].id+"', '"+itemId[i].quantity+"')";
				}
				db.query(sql,(err,result)=>{
					if(err) throw err;
					if(i+1 == final){
						let sql = "DELETE FROM fight WHERE playerId_fk = '"+playerId+"'";
						db.query(sql,(err,result)=>{
							if(err) throw err;
							let sql = "DELETE FROM loot WHERE playerId_fk = '"+playerId+"'";
							db.query(sql,(err,result)=>{
								if(err) throw err;
								res.send(true);
							});
						});
					}
				});
			});
		}
	});
});


app.get('/getEquipment/:playerId',(req,res)=>{
	let playerId = req.params.playerId;
	let sql = "SELECT itemId, item_name, item_description, quantity, item_damage, item_health FROM inventory, item, equipment WHERE playerId_fk = '"+playerId+"' AND quantity > 0 AND inventory.itemId_fk = itemId AND itemId = equipment.itemId_fk ORDER BY equipmentTypeId_fk";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}		
	});
});


app.get('/getCharacterSlots/:playerId',(req,res)=>{
	let playerId = req.params.playerId;
	let sql = "SELECT * FROM hero WHERE playerId_fk = '"+playerId+"' AND slot != 0 ORDER BY slot";
	db.query(sql,(err,result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}		
	});
});

app.get('/getCharacterIdentity/:playerId/:slot',(req,res)=>{
	let playerId = req.params.playerId;
	let slot = req.params.slot;
	let sql = "SELECT hero_name, lvl, class FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = '"+slot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});

app.get('/getCharacterWeapon/:playerId/:slot',(req,res)=>{
	let playerId = req.params.playerId;
	let slot = req.params.slot;
	let sql = "SELECT weapon_fk_itemId FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = '"+slot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			if(result[0].weapon_fk_itemId != null){
				let sql = "SELECT item_name FROM item WHERE itemId = '"+result[0].weapon_fk_itemId+"'";
				db.query(sql,(err, result)=>{
					if(result.length > 0){
						res.send(result);
					} else {
						let ack = [];
						res.send(ack);
					}
				});
			} else {
				if(result.length > 0){
					result[0].item_name = "Nothing";
					res.send(result);
				} else {
					let ack = [];
					res.send(ack);
				}
			}
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});

app.get('/getCharacterArmor/:playerId/:slot',(req,res)=>{
	let playerId = req.params.playerId;
	let slot = req.params.slot;
	let sql = "SELECT armor_fk_itemId FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = '"+slot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			if(result[0].armor_fk_itemId != null){
				let sql = "SELECT item_name FROM item WHERE itemId = '"+result[0].armor_fk_itemId+"'";
				db.query(sql,(err, result)=>{
					if(result.length > 0){
						res.send(result);
					} else {
						let ack = [];
						res.send(ack);
					}
				});
			} else {
				if(result.length > 0){
					result[0].item_name = "Nothing";
					res.send(result);
				} else {
					let ack = [];
					res.send(ack);
				}
			}
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});

app.get('/getCharacterAcessory/:playerId/:slot',(req,res)=>{
	let playerId = req.params.playerId;
	let slot = req.params.slot;
	let sql = "SELECT acessory_fk_itemId FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = '"+slot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			if(result[0].acessory_fk_itemId != null){
				let sql = "SELECT item_name FROM item WHERE itemId = '"+result[0].acessory_fk_itemId+"'";
				db.query(sql,(err, result)=>{
					if(result.length > 0){
						res.send(result);
					} else {
						let ack = [];
						res.send(ack);
					}
				});
			} else {
				if(result.length > 0){
					result[0].item_name = "Nothing";
					res.send(result);
				} else {
					let ack = [];
					res.send(ack);
				}
			}
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});

app.get('/getCharacterStats/:playerId/:slot',(req,res)=>{
	let playerId = req.params.playerId;
	let slot = req.params.slot;
	let herostats = {
		"id": 0,
		"level": 0,
		"class": 0,
		"slot": 0,
		"damage": {
			"base": 0,
			"growth": 0,
			"final": 0
		},
		"health": {
			"base": 0,
			"growth": 0,
			"final": 0
		},
		"weapon": {
			"id": 0,
			"damage": 0,
			"health": 0
		},
		"armor": {
			"id": 0,
			"damage": 0,
			"health": 0
		},
		"acessory": {
			"id:": 0,
			"damage": 0,
			"health": 0
		}
	}

	let sql = "SELECT weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId, class, lvl FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = '"+slot+"'";
	db.query(sql,(err,result)=>{
	if(err) throw err;
		if(result.length>0){
			herostats.level = result[0].lvl;
			herostats.class = result[0].class;
			herostats.slot = result[0].slot;
							
			if(result[0].class = "warrior"){
				herostats.damage.base = 10;
				herostats.damage.growth = 10;
				herostats.health.base = 100;
				herostats.health.growth = 35;
			}
			else if(result[0].class = "knight") {
				herostats.damage.base = 5;
				herostats.damage.growth = 5;
				herostats.health.base = 150;
				herostats.health.growth = 50;
			}
			else if(result[0].class = "witch") {
				herostats.damage.base = 15;
				herostats.damage.growth = 20;
				herostats.health.base = 75;
				herostats.health.growth = 25;
			}
			else if(result[0].class = "ranger") {
				herostats.damage.base = 15;
				herostats.damage.growth = 15;
				herostats.health.base = 75;
				herostats.health.growth = 25;
			}

				herostats.weapon.id = result[0].weapon_fk_itemId;
				herostats.armor.id = result[0].armor_fk_itemId;
				herostats.acessory.id = result[0].acessory_fk_itemId;

				let sql = "SELECT item_damage, item_health FROM equipment WHERE itemId_fk = '"+herostats.weapon.id+"' AND equipmentTypeId_fk = 1";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					if(herostats.weapon.id != null){
					herostats.weapon.damage = result[0].item_damage;
					herostats.weapon.health = result[0].item_health;
					} else {
						herostats.weapon.damage = 0;
						herostats.weapon.health = 0;
					}
					let sql = "SELECT item_damage, item_health FROM equipment WHERE itemId_fk = '"+herostats.armor.id+"' AND equipmentTypeId_fk = 2";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						if(herostats.armor.id != null){
							herostats.armor.damage = result[0].item_damage;
							herostats.armor.health = result[0].item_health;
						} else {
							herostats.armor.damage = 0;
							herostats.armor.health = 0;
						}
						let sql = "SELECT item_damage, item_health FROM equipment WHERE itemId_fk = '"+herostats.acessory.id+"' AND equipmentTypeId_fk = 3";
						db.query(sql,(err, result)=>{
							if(err) throw err;
							if(herostats.acessory.id != null){
								herostats.acessory.damage = result[0].item_damage;
								herostats.acessory.health = result[0].item_health;
							} else {
								herostats.acessory.damage = 0;
								herostats.acessory.health = 0;
							}
							herostats.damage.final = herostats.damage.base + herostats.damage.growth * herostats.level + herostats.weapon.damage + herostats.armor.damage + herostats.acessory.damage;
							herostats.health.final = herostats.health.base + herostats.health.growth * herostats.level + herostats.weapon.health + herostats.armor.health + herostats.acessory.health;
							res.send(herostats);
						});
					});
				});
		}else{
			res.send(false);
		}

	});
});


app.post('/CharInvSwap',(req,res)=>{
	let equipmentSwapServer = {
		"CharSlot": req.body.CharSlot,
		"CharEquip": req.body.CharEquip,
		"CharEquipId": null,
		"CharEquipType": null,
		"InvEquip": req.body.InvEquip,
		"InvEquipType": null,
		"PlayerId": req.body.PlayerId,
	}
	console.log("First: "+equipmentSwapServer.InvEquip);

	let sql = "SELECT weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId  FROM hero WHERE playerId_fk = '"+equipmentSwapServer.PlayerId+"' AND slot = '"+equipmentSwapServer.CharSlot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(equipmentSwapServer.CharEquip == "Weapon"){
			equipmentSwapServer.CharEquipId = result[0].weapon_fk_itemId;
			equipmentSwapServer.InvEquipType = 1;
		} else if(equipmentSwapServer.CharEquip == "Armor"){
			equipmentSwapServer.CharEquipId = result[0].armor_fk_itemId;
			equipmentSwapServer.InvEquipType = 2;
		} else if(equipmentSwapServer.CharEquip == "Acessory"){
			equipmentSwapServer.CharEquipId = result[0].acessory_fk_itemId;
			equipmentSwapServer.InvEquipType = 3;
		}

		if(equipmentSwapServer.CharEquipId != null){
			let sql = "SELECT equipmentTypeId_fk FROM equipment WHERE itemId_fk = '"+equipmentSwapServer.CharEquipId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				equipmentSwapServer.CharEquipType = result[0].equipmentTypeId_fk;
				let sql = "SELECT equipmentTypeId_fk FROM equipment WHERE itemId_fk = '"+equipmentSwapServer.InvEquip+"'";
				db.query(sql,(err, result)=>{
					equipmentSwapServer.InvEquipType = result[0].equipmentTypeId_fk;
					if(equipmentSwapServer.CharEquipType != equipmentSwapServer.InvEquipType){
						let ack = [];
						res.send(ack);
					} else {
						let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+equipmentSwapServer.CharEquipId+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
						db.query(sql,(err, result)=>{
							if(err) throw err;
							let sql = "UPDATE inventory SET quantity = quantity - 1 WHERE itemId_fk = '"+equipmentSwapServer.InvEquip+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
							db.query(sql,(err, result)=>{
								if(err) throw err;
								if(equipmentSwapServer.CharEquip == "Weapon"){
									sql = "UPDATE hero SET weapon_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
								} else if(equipmentSwapServer.CharEquip == "Armor"){
									sql = "UPDATE hero SET armor_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
								} else if(equipmentSwapServer.CharEquip == "Acessory"){
									sql = "UPDATE hero SET acessory_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
								}
								db.query(sql,(err, result)=>{
									if(err) throw err;
									res.send(true);
								});
							});
						});
					}
				});
			});
		} else {
			let sql = "SELECT equipmentTypeId_fk FROM equipment WHERE itemId_fk = '"+equipmentSwapServer.InvEquip+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				if(equipmentSwapServer.InvEquipType != result[0].equipmentTypeId_fk){
					let ack = [];
					res.send(ack);
				} else {
					let sql = "UPDATE inventory SET quantity = quantity - 1 WHERE itemId_fk = '"+equipmentSwapServer.InvEquip+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						if(equipmentSwapServer.CharEquip == "Weapon"){
							sql = "UPDATE hero SET weapon_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
						} else if(equipmentSwapServer.CharEquip == "Armor"){
							sql = "UPDATE hero SET armor_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
						} else if(equipmentSwapServer.CharEquip == "Acessory"){
							sql = "UPDATE hero SET acessory_fk_itemId = '"+equipmentSwapServer.InvEquip+"' WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
						}
						db.query(sql,(err, result)=>{
							if(err) throw err;
							res.send(true);
						});
					});
				}
			});
		}
	});
});


app.post('/RemoveGear',(req,res)=>{
	let equipmentSwapServer = {
		"CharSlot": req.body.CharSlot,
		"PlayerId": req.body.PlayerId,
	}
	let sql = "SELECT weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId FROM hero WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result[0].weapon_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].weapon_fk_itemId+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET weapon_fk_itemId = null WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}

		if(result[0].armor_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].armor_fk_itemId+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET armor_fk_itemId = null WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}

		if(result[0].acessory_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].acessory_fk_itemId+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET acessory_fk_itemId = null WHERE slot = '"+equipmentSwapServer.CharSlot+"' AND playerId_fk = '"+equipmentSwapServer.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}
		res.send(true);
	});
});


app.get('/getAllCharacters/:playerId',(req,res)=>{
	let playerId = req.params.playerId;
	let sql = "SELECT hero_name, class, lvl FROM hero WHERE playerId_fk = '"+playerId+"' AND slot = 0";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});


app.post('/SwapCharacters',(req,res)=>{
	let CharSwap = {
		"CharSlot": req.body.CharSlot,
		"PlayerId": req.body.PlayerId,
		"CharSwap": req.body.SwapCharacter,
		"Weapon": null,
		"Armor": null,
		"Acessory": null
	}
	let sql = "SELECT heroId FROM hero WHERE playerId_fk = '"+CharSwap.PlayerId+"' AND slot = 0";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		CharSwap.CharSwap = result[CharSwap.CharSwap].heroId;
		let sql = "SELECT weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId FROM hero WHERE playerId_fk = '"+CharSwap.PlayerId+"' AND slot = '"+CharSwap.CharSlot+"'";
		db.query(sql,(err, result)=>{
			if(err) throw err;
			if(result.length > 0){
				CharSwap.Weapon = result[0].weapon_fk_itemId;
				CharSwap.Armor = result[0].armor_fk_itemId;
				CharSwap.Acessory = result[0].acessory_fk_itemId;
				let sql = "UPDATE hero SET weapon_fk_itemId = null, armor_fk_itemId = null, acessory_fk_itemId = null, slot = 0 WHERE slot = '"+CharSwap.CharSlot+"' AND playerId_fk = '"+CharSwap.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					let sql = "UPDATE hero SET weapon_fk_itemId = "+CharSwap.Weapon+", armor_fk_itemId = "+CharSwap.Armor+", acessory_fk_itemId = "+CharSwap.Acessory+", slot = '"+CharSwap.CharSlot+"' WHERE heroId = '"+CharSwap.CharSwap+"' AND playerId_fk = '"+CharSwap.PlayerId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
						res.send(true);
					});
				});
			} else {
				let sql = "UPDATE hero SET weapon_fk_itemId = null, armor_fk_itemId = null, acessory_fk_itemId = null, slot = '"+CharSwap.CharSlot+"' WHERE heroId = '"+CharSwap.CharSwap+"' AND playerId_fk = '"+CharSwap.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					res.send(true);
				});
			}
		});
	});
});

app.post('/RemoveCharacter',(req,res)=>{
	let CharRemove = {
		"CharSlot": req.body.CharSlot,
		"PlayerId": req.body.PlayerId,
	}
	let sql = "SELECT weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId FROM hero WHERE playerId_fk = '"+CharRemove.PlayerId+"' AND slot = '"+CharRemove.CharSlot+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result[0].weapon_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].weapon_fk_itemId+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET weapon_fk_itemId = null WHERE slot = '"+CharRemove.CharSlot+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}

		if(result[0].armor_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].armor_fk_itemId+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET armor_fk_itemId = null WHERE slot = '"+CharRemove.CharSlot+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}

		if(result[0].acessory_fk_itemId != null){
			let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[0].acessory_fk_itemId+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				let sql = "UPDATE hero SET acessory_fk_itemId = null WHERE slot = '"+CharRemove.CharSlot+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
				});
			});
		}
		let sql = "UPDATE hero SET weapon_fk_itemId = null, armor_fk_itemId = null, acessory_fk_itemId = null, slot = 0 WHERE slot = '"+CharRemove.CharSlot+"' AND playerId_fk = '"+CharRemove.PlayerId+"'";
		db.query(sql,(err, result)=>{
			if(err) throw err;
			res.send(true);
		});
	});
});

app.get('/countCharacters/:playerId',(req,res)=>{
	let playerId = req.params.playerId;
	let sql = "SELECT hero_name FROM hero WHERE playerId_fk = '"+playerId+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			res.send(result);
		} else {
			let ack = [];
			res.send(ack);
		}	
	});
});


app.post('/InsertCharacter',(req,res)=>{
	let Insert = {
		"name": req.body.name,
		"role": req.body.role,
		"playerId": req.body.playerId
	}
	let sql = "SELECT heroId FROM hero WHERE playerId_fk = '"+Insert.playerId+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length < 8 && (Insert.role == "warrior" || Insert.role == "knight" || Insert.role == "witch" || Insert.role == "ranger")){
			let sql = "INSERT INTO hero (`playerId_fk`, `hero_name`, `weapon_fk_itemId`, `armor_fk_itemId`, `acessory_fk_itemId`, `class`) VALUES ('"+Insert.playerId+"','"+Insert.name+"', null, null, null, '"+Insert.role+"')";
			db.query(sql,(err, result)=>{
				if(err) throw err;
				res.send(true);
			});
		} else {
			let ack = [];
			res.send(ack);
		}
	});
});

app.post('/DeleteCharacter',(req,res)=>{
	let Delete = {
		"name": req.body.name,
		"row": req.body.row,
		"id": null,
		"slot": null,
		"playerId": req.body.playerId
	}
	let sql = "SELECT heroId, hero_name, weapon_fk_itemId, armor_fk_itemId, acessory_fk_itemId, slot FROM hero WHERE playerId_fk = '"+Delete.playerId+"'";
	db.query(sql,(err, result)=>{
		if(err) throw err;
		if(result.length > 0){
			if(result[Delete.row].hero_name == Delete.name){
				Delete.id = result[Delete.row].heroId;
				Delete.slot = result[Delete.row].slot;
				if(result[Delete.row].weapon_fk_itemId != null){
					let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[Delete.row].weapon_fk_itemId+"' AND playerId_fk = '"+Delete.playerId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
					});
				}
		
				if(result[Delete.row].armor_fk_itemId != null){
					let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[Delete.row].armor_fk_itemId+"' AND playerId_fk = '"+Delete.playerId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
					});
				}
		
				if(result[Delete.row].acessory_fk_itemId != null){
					let sql = "UPDATE inventory SET quantity = quantity + 1 WHERE itemId_fk = '"+result[Delete.row].acessory_fk_itemId+"' AND playerId_fk = '"+Delete.playerId+"'";
					db.query(sql,(err, result)=>{
						if(err) throw err;
					});
				}
				let sql = "DELETE FROM hero WHERE heroId = '"+Delete.id+"' AND playerId_fk = '"+Delete.playerId+"'";
				db.query(sql,(err, result)=>{
					if(err) throw err;
					res.send(Delete);
				});
				
			} else {
				let ack = [];
				res.send(ack);
			}
		} else {
			let ack = [];
			res.send(ack);
		}
	});
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});