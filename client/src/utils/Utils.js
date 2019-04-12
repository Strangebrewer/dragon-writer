export const Utils = {
  consoleLoud: function (logObj, msg, options) {
    let paddingColor = '#5598e4';
    let messageColor = '#8d13ff';
    let isTable = false;
    let isSpaced = false;
    let rowLength = 60;
    let msgOne = " SOME PEOPLE DON'T THINK IT BE LIKE IT IS ";
    let msgTwo = " BUT IT DO ";


    if (msg) {
      msgOne = ` ${msg} `;
      msgTwo = ` END OF ${msg} `;
    }

    if (options) {
      const { padding, message, row, table, spaced } = options;
      if (padding) paddingColor = padding;
      if (message) messageColor = message;
      if (table) isTable = true;
      if (spaced) isSpaced = true;
      if ((row || row === 0) && parseInt(row) <= 500 && parseInt(row) >= 0) {
        rowLength = parseInt(row);
      }
    }

    // set defaults:
    const padLeft1 = (rowLength - (msgOne.length)) / 2;
    const padLeft2 = (rowLength - (msgTwo.length)) / 2;
    let padRight1 = (rowLength - (msgOne.length)) / 2;
    let padRight2 = (rowLength - (msgTwo.length)) / 2;


    if ((rowLength - msgOne.length) % 2 === 1) {
      padRight1 = ((rowLength - (msgOne.length + 1)) / 2);
    }

    if ((rowLength - msgTwo.length) % 2 === 1) {
      padRight2 = ((rowLength - (msgTwo.length + 1)) / 2);
    }

    const colorOne = `color: ${paddingColor}; font-weight: bold;`;
    const colorTwo = `
      color: #baffa9;
      font-weight: bold;
      text-shadow:0 0 1px ${messageColor},
        0 0 2px ${messageColor},
        0 0 3px ${messageColor},
        0 0 4px ${messageColor},
        0 0 5px ${messageColor};
      `;

    if (rowLength > 0) console.log(`%c${writeFullRow(rowLength)}`, colorOne);
    console.log(`%c${writePadding(padLeft1)}` + `%c${msgOne}` + `%c${writePadding(padRight1)}`, colorOne, colorTwo, colorOne);
    if (isSpaced) console.log('\n');
    if (isTable) console.table(logObj);
    else console.log(logObj);
    if (isSpaced) console.log('\n');
    console.log(`%c${writePadding(padLeft2)}` + `%c${msgTwo}` + `%c${writePadding(padRight2)}`, colorOne, colorTwo, colorOne);
    if (rowLength > 0) console.log(`%c${writeFullRow(rowLength)}`, colorOne);

    // helper functions:
    function writeFullRow(num) {
      let str = '';
      for (let i = 0; i < num; i++) { str += '='; }
      return str;
    }
    function writePadding(len) {
      let str = '';
      for (let i = 0; i < len; i++) { str += '='; }
      return str;
    }
  },

  formatInitialData: function (project) {
    const initialData = { texts: {}, subjects: {} };
    const subjectArray = [];

    for (let i = 0; i < project.texts.length; i++) {
      const element = project.texts[i];
      initialData.texts[element._id] = element;
    }

    for (let i = 0; i < project.subjects.length; i++) {
      const element = project.subjects[i];
      console.log(element)
      initialData.subjects[element._id] = element;
      initialData.subjects[element._id].textIds = element.texts || [];
      initialData.subjects[element._id].projectId = element.projectId;
      subjectArray.push(element._id);
    }

    initialData.subjectOrder = subjectArray || [];
    return initialData;
  },

  formatProjectOrderData: function (projects) {
    const projectOrderData = {};
    const newProjects = JSON.parse(JSON.stringify(projects));
    for (let i = 0; i < newProjects.length; i++) {
      const element = newProjects[i];
      delete element.order;
      delete element.subjects;
      delete element.texts;
      projectOrderData[element._id] = element;
    }
    return projectOrderData;
  },

  addTextsToOrder: function (project) {
    const order = JSON.parse(project.order);
    project.order = order;
    project.order.texts = {};
    // when a project is first created, the DB will not return anything for texts (not even an empty array)
    // Then, when the first column is created, it saves an order string for the project
    // Which triggers addTextsToOrder, which will throw an error when it gets to the 'forEach' below
    // unless you add the field as an empty array:
    if (!project.texts) project.texts = [];
    project.texts.forEach(text => {
      project.order.texts[text._id] = text;
      project.order.texts[text._id].text = text.text;
    });
    return project;
  },

  getArrayIndex: function (array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === id)
        return i;
    }
  }
}

// const exampleDataStructure = {
//   texts: {
//     'text-1._id': {
//       id: 'text-1._id',
//       createdAt: 'Date',
//       updatedAt: 'Date',
//       thesis: 'thesis',
//       title: 'title'
//     },
//     'text-2._id': {
//       id: 'text-2._id',
//       createdAt: 'Date',
//       updatedAt: 'Date',
//       thesis: 'thesis',
//       title: 'title'
//     },
//     'text-3._id': {
//       id: 'text-3._id',
//       createdAt: 'Date',
//       updatedAt: 'Date',
//       thesis: 'thesis',
//       title: 'title'
//     },
//   },
//   subjects: {
//     'subject-1._id': {
//       id: 'subject-1._id',
//       subject: 'subject-1.subject',
//       textIds: [{ 'text-1': { text: "text" } }, 'text-2', 'text-3'],
//     },
//     'subject-2._id': {
//       id: 'subject-2._id',
//       subject: 'subject-2.subject',
//       textIds: [],
//     },
//     'subject-3._id': {
//       id: 'subject-3._id',
//       subject: 'subject-3.subject',
//       textIds: [],
//     },
//   },
//   // facilitate reordering of the columns
//   subjectOrder: ['subject-1._id', 'subject-2._id', 'subject-3._id']
// }