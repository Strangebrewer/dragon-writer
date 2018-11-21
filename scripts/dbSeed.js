const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');

const pw = bcrypt.hashSync("1234", bcrypt.genSaltSync(10), null);

// This file empties the User collection and inserts the users below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/writing_tool"
);

const userSeed = [
  {
    username: "Narf",
    password: pw,
    email: "BKAShambala@gmail.com",
    projects: []
  },
  {
    username: "Feck",
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
    summary: "Write a novel about some shit, yo.",
    subjects: [],
    texts: []
  },
  {
    userId: '',
    title: "Therapy Journal",
    link: "journal",
    summary: "Write my thoughts and experiences while I go through therapy.",
    subjects: [],
    texts: []
  },
  {
    userId: '',
    title: "To Do List",
    link: "todo",
    summary: "A to-do list that's customizable and easy to use.",
    subjects: [],
    texts: []
  }
];

const subjectSeed = [
  {
    subject: "Scene Ideas",
    theme: "Ideas for character development, plot progression, plot twists, revealing character traits or flaws, etc.",
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

const textSeed = [
  {
    text: "Lorem lorem lorem ispum, ipsum ipsum ipsum, nomsayn? Second verse, same as the first! Lorem lorem lorem ispum, ipsum ipsum ipsum, nomsayn? Yeah, man!",
    title: "Lorem Ipsum!",
    thesis: "The lorem ipsum song."
  },
  {
    text: "Some people don't think it be like it is, but it do.",
    title: "Do be do be do.",
    thesis: "It's like that."
  },
  {
    text: "A foolish consistency is the hobgoblin of little minds, adored by philosophers, statesmen, and divines.",
    title: "Ralph Waldo Emerson",
    thesis: "Self-reliance."
  },
  {
    text: "You know the day destroys the night. Night divides the day. Try to run, try to hide, break on through to the other side.",
    title: "The Doers",
    thesis: "Break on through."
  },
]

async function seedDb() {
  // empty all collections:
  await db.User.remove({});
  await db.Project.remove({});
  await db.Subject.remove({});
  await db.Text.remove({});

  // insert users and assign to variable:
  const users = await db.User.collection.insertMany(userSeed);
  // add user id to each project:
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
  console.log(thisUser)
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

  // // log the project to verify:
  // console.log("***********Project with subjects added:*************");
  // console.log(thisProject)
  // textSeed.forEach(text => (
  //   text.userId = users.ops[0]._id,
  //   text.projectId = projects.ops[0]._id,
  //   text.subjectId = subjects.ops[0]._id
  // ));

  // // insert texts and assign to variable:
  // const texts = await db.Text.collection.insertMany(textSeed);
  // // extract text ids:
  // const textIds = texts.ops.filter(text => text._id);
  // // add text ids to project texts array:
  // const projectAgain = await db.Project.findOneAndUpdate(
  //   { _id: projects.ops[0]._id },
  //   { $push: { texts: { $each: textIds } } },
  //   { new: true }
  // );
  // // log the project to verify:
  // console.log("***********Project with texts added:*************");
  // console.log(projectAgain)
  // // add text ids to subject texts array:
  // const subjectAgain = await db.Subject.findOneAndUpdate(
  //   { _id: subjects.ops[0]._id },
  //   { $push: { texts: { $each: textIds } } },
  //   { new: true }
  // );
  // // log the subject to verify:
  // console.log("***********Subject with texts added:*************");
  // console.log(subjectAgain)

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





  // .then(() => db.User.collection.insertMany(userSeed))
  // .then(users => {
  //   projectSeed.forEach(project => (
  //     project.userId = users.ops[0]._id
  //   ));

  //   db.Project
  //     .remove({})
  //     .then(() => db.Project.collection.insertMany(projectSeed))
  //     .then(projects => {
  //       const projectIds = projects.ops.map(project => project._id);
  //       db.User.findOneAndUpdate(
  //         { _id: users.ops[0]._id },
  //         { $push: { projects: { $each: projectIds } } },
  //         { new: true }
  //       ).then(thisUser => {
  //         console.log("***********User with projects added:*************");
  //         console.log(thisUser)
  //       });

  //       subjectSeed.forEach(subject => (
  //         subject.userId = users.ops[0]._id,
  //         subject.projectId = projects.ops[0]._id
  //       ));

  //       db.Subject
  //         .remove({})
  //         .then(() => db.Subject.collection.insertMany(subjectSeed))
  //         .then(subjects => {
  //           // console.log(subjects);
  //           const subjectIds = subjects.ops.map(subject => subject._id);
  //           db.Project.findOneAndUpdate(
  //             { _id: projects.ops[0]._id },
  //             { $push: { subjects: { $each: subjectIds } } },
  //             { new: true }
  //           ).then(thisProject => {
  //             console.log("***********Project with subjects added:*************");
  //             console.log(thisProject)
  //           });

  //           textSeed.forEach(text => (
  //             text.userId = users.ops[0]._id,
  //             text.projectId = projects.ops[0]._id,
  //             text.subjectId = subjects.ops[0]._id
  //           ));

  //           db.Text
  //             .remove({})
  //             .then(() => db.Text.collection.insertMany(textSeed))
  //             .then(texts => {
  //               console.log("***********Here's your texts:*************");
  //               console.log(texts);
  //               const textIds = texts.ops.map(text => text._id);
  //               console.log("***********Here's your textIds:*************");
  //               console.log(textIds);
  //               db.Project.findOneAndUpdate(
  //                 { _id: projects.ops[0]._id },
  //                 { $push: { texts: { $each: textIds } } },
  //                 { new: true }
  //               ).then(projectAgain => {
  //                 console.log("***********Project with texts added:*************");
  //                 console.log(projectAgain)

  //                 db.Subject.findOneAndUpdate(
  //                   { _id: subjects.ops[0]._id },
  //                   { $push: { texts: { $each: textIds } } },
  //                   { new: true }
  //                 ).then(subjectAgain => {
  //                   console.log("***********Subject with texts added:*************");
  //                   console.log(subjectAgain)
  //                   console.log(users.insertedCount + " user records inserted!");
  //                   console.log(projects.insertedCount + " project records inserted!");
  //                   console.log(subjects.insertedCount + " subject records inserted!");
  //                   console.log(texts.insertedCount + " records inserted!");
  //                   process.exit(0);
  //                 });
  //               });
  //             })
  //         })
  //     })
  // })
  // .catch(err => {
  //   console.error(err);
  //   process.exit(1);
  // });