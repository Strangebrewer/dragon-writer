export const Utils = {
  formatInitialData: function (project) {
    const initialData = { texts: {}, subjects: {} };
    const subjectArray = [];
    for (let i = 0; i < project.texts.length; i++) {
      const element = project.texts[i];
      initialData.texts[element._id] = element;
    }

    console.log(initialData.texts);

    for (let i = 0; i < project.subjects.length; i++) {
      const element = project.subjects[i];

      initialData.subjects[element._id] = {
        _id: element._id,
        subject: element.subject,
        theme: element.theme,
        textIds: element.texts || []
      }
      subjectArray.push(element._id);
    }
    initialData.subjectOrder = subjectArray;
    return initialData;
  },
}

const exampleDataStructure = {
  texts: {
    'text-1._id': {
      id: 'text-1._id',
      createdAt: 'Date',
      updatedAt: 'Date',
      thesis: 'thesis',
      title: 'title'
    },
    'text-2._id': {
      id: 'text-2._id',
      createdAt: 'Date',
      updatedAt: 'Date',
      thesis: 'thesis',
      title: 'title'
    },
    'text-3._id': {
      id: 'text-3._id',
      createdAt: 'Date',
      updatedAt: 'Date',
      thesis: 'thesis',
      title: 'title'
    },
  },
  subjects: {
    'subject-1._id': {
      id: 'subject-1._id',
      subject: 'subject-1.subject',
      textIds: [{ 'text-1': { text: "text" } }, 'text-2', 'text-3'],
    },
    'subject-2._id': {
      id: 'subject-2._id',
      subject: 'subject-2.subject',
      textIds: [],
    },
    'subject-3._id': {
      id: 'subject-3._id',
      subject: 'subject-3.subject',
      textIds: [],
    },
  },
  // facilitate reordering of the columns
  subjectOrder: ['subject-1._id', 'subject-2._id', 'subject-3._id']
}