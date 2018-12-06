export const Utils = {
  formatInitialData: function (project) {
    const initialData = { texts: {}, subjects: {} };
    const subjectArray = [];

    for (let i = 0; i < project.texts.length; i++) {
      const element = project.texts[i];
      initialData.texts[element._id] = element;
    }

    for (let i = 0; i < project.subjects.length; i++) {
      const element = project.subjects[i];
      initialData.subjects[element._id] = element;
      initialData.subjects[element._id].textIds = element.texts || [];
      subjectArray.push(element._id);
    }

    initialData.subjectOrder = subjectArray;
    return initialData;
  },

  formatProjectOrder: function (projects) {
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
    project.texts.forEach(text => {
      project.order.texts[text._id] = text;
      project.order.texts[text._id].text = text.text;
    });
    return project;
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