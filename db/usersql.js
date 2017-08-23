var UserSQL = {
                insert:'INSERT INTO User(uid,username,password) VALUES(?,?,?)',
                queryAll:'SELECT * FROM User',
                getUserById:'SELECT * FROM User WHERE uid = ? ',
                checkUserAndPwd:'SELECT * FROM User WHERE username = ? AND password = ?',
                changeClientInfo:'INSERT INTO client_description(id,title,comment,content,modifyUser,changeTime) VALUES(?,?,?,?,?,?)',
                getCurrentClientInfo:'SELECT * FROM client_description ORDER BY id DESC LIMIT 1'
              };
 module.exports = UserSQL;
