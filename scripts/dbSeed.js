const mongoose = require("mongoose");
require('dotenv').config();
const db = require("../models");
const bcrypt = require('bcryptjs');

const pw = bcrypt.hashSync("1234", bcrypt.genSaltSync(10), null);

const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, MONGODB_URI } = process.env;

const URI = MONGODB_URI || `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/writing_tool?retryWrites=true`

mongoose.connect(URI);

const userSeed = [
  {
    username: "Narf",
    url: "narf",
    password: pw,
    email: "BKAShambala@gmail.com",
    projects: []
  },
  {
    username: "Feck",
    url: "feck",
    password: pw,
    email: "adcatcher73@gmail.com",
    projects: []
  },
];

const projectSeed = [
  {
    userId: '',
    title: "New Novel",
    link: "novel",
    summary: "Write a novel, yo.",
    subjects: [],
    texts: [],
    image: '',
    largeImage: '',
    publicId: ''
  },
  {
    userId: '',
    title: "Journal",
    link: "journal",
    summary: "Write my thoughts and experiences...",
    subjects: [],
    texts: [],
    image: '',
    largeImage: '',
    publicId: ''
  },
  {
    userId: '',
    title: "To Do List",
    link: "todo",
    summary: "A to-do list that's customizable and easy to use.",
    subjects: [],
    texts: [],
    image: '',
    largeImage: '',
    publicId: ''
  }
];

const subjectSeed = [
  {
    subject: "Scene Ideas",
    theme: "Ideas for character development, plot progression, plot twists, revealing character traits, etc.",
    texts: []
  },
  {
    subject: "Philosophy",
    theme: "Philosophical underpinnings of the story or of parts of the story.",
    texts: []
  },
  {
    subject: "Story Snippets",
    theme: "Pieces of writing that may or may not make it into the final story.",
    texts: []
  },
];

async function seedDb() {
  // empty all collections:
  await db.User.remove({});
  await db.Project.remove({});
  await db.Subject.remove({});
  await db.Text.remove({});

  // insert users and assign to variable:
  const users = await db.User.collection.insertMany(userSeed);
  // add user id to each seed project:
  projectSeed.forEach(project => (
    project.userId = users.ops[0]._id
  ));

  // insert projects and assign to variable:
  const projects = await db.Project.collection.insertMany(projectSeed)
  // extract project ids:
  const projectIds = projects.ops.filter(project => project._id);
  // add project ids to user projects array:
  const thisUser = await db.User.findOneAndUpdate(
    { _id: users.ops[0]._id },
    { $push: { projects: { $each: projectIds } } },
    { new: true }
  );
  // log the user to verify:
  console.log("***********User with projects added:*************");
  console.log(thisUser);

  // add user id and project id to each seed subject:
  subjectSeed.forEach(subject => (
    subject.userId = users.ops[0]._id,
    subject.projectId = projects.ops[0]._id
  ));

  // insert subjects and assign to variable:
  const subjects = await db.Subject.collection.insertMany(subjectSeed);
  // extract subject ids:
  const subjectIds = subjects.ops.filter(subject => subject._id);
  // add subject ids to project subjects array:
  const thisProject = await db.Project.findOneAndUpdate(
    { _id: projects.ops[0]._id },
    { $push: { subjects: { $each: subjectIds } } },
    { new: true }
  );

  // log insertion counts:
  console.log("***********Aaaaaand, here's your insert counts:*************");
  console.log(users.insertedCount + " user records inserted!");
  console.log(projects.insertedCount + " project records inserted!");
  console.log(subjects.insertedCount + " subject records inserted!");
  // console.log(texts.insertedCount + " records inserted!");

  // exit:
  process.exit(0);
};

// call the function:
seedDb();