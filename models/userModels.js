const fs = require('fs');
const path = require('path');
const pathToUsersDb = path.resolve(__dirname, '../db/usersDataSet.json');


function readAllUsers() {
  const allUsers = fs.readFileSync(pathToUsersDb);
  if(allUsers) {
      return JSON.parse(allUsers);
  }
}

function readAllUsersAsync() {
   return fs.readFile(pathToUsersDb, 'utf8', (err, data) => {
      if (err) {
        return err;
      } else {
        return JSON.parse(data);
      }
    });
  }

function addUser(newUser) {
  try {
    const allUsers = readAllUsers();
    allUsers.push(newUser);
    fs.writeFileSync(pathToUsersDb, JSON.stringify(allUsers));
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(newUserInfo) {
  try {
    const allUsers = await readAllUsers();
    const userId = newUserInfo.id
    const newAllUsers = await allUsers.filter(user => user.id !== userId);
    newAllUsers.push(newUserInfo);
    fs.writeFileSync(pathToUsersDb, JSON.stringify(newAllUsers));
    return newAllUsers;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readAllUsers, readAllUsersAsync, addUser, updateUser };