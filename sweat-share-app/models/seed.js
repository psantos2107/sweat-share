// Require the database connection & the other models
const db = require("./");

// Data to seed the Vampire collection
const exProgramData = [
  //
];

const userData = [
  //
];

const commentData = [
  //
];

module.exports = {
  exProgramData,
  userData,
  commentData,
};
// Create an async function that will seed the database after the database connects
async function seedData() {
  await db.ExerciseProgram.deleteMany({});
  console.log("Removed all log entries");
  await db.ExerciseProgram.insertMany(exProgramData);
  console.log(`Added ${exProgramData.length} exercise prorams to the database`);
  await db.User.deleteMany({});
  console.log("Removed all log entries");
  await db.User.insertMany(userData);
  console.log(`Added ${userData.length} users to the database`);
  await db.Comment.deleteMany({});
  console.log("Removed all log entries");
  await db.Comment.insertMany(commentData);
  console.log(`Added ${commentData.length} comments to the database`);
  process.exit();
}

// Invoke the function defined above
seedData().catch((err) => {
  console.log("Could not seed database:\n" + err);
  process.exit();
});
