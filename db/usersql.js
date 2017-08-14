var UserSQL = {
                insert:'INSERT INTO User(uid,username,password) VALUES(?,?,?)',
                queryAll:'SELECT * FROM User',
                getUserById:'SELECT * FROM User WHERE uid = ? ',
                checkUserAndPwd:'SELECT * FROM User WHERE username = ? AND password = ?'
              };
 module.exports = UserSQL;
