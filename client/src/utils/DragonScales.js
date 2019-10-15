import { API } from "./API";

export const Scales = {
  addSubjectToOrder: function (create, subjects, subjectOrder, subject) {
    const newSubjectOrder = [...subjectOrder, subject._id];
    const newSubjects = {
      ...subjects,
      [subject._id]: {
        projectId: subject.projectId,
        subject: subject.subject,
        textIds: [],
        theme: subject.theme,
        _id: subject._id
      }
    }
    return {
      // '[subject._id]: true' to make sure the new column appears on the screen
      [subject._id]: true,
      subjectOrder: newSubjectOrder,
      subjects: newSubjects,
      create: !create
    }
  },

  updateSubjectHelper: function (subjectId, subjectContent, state) {
    const newSubjects = {
      ...state.subjects,
      [subjectId]: {
        ...state.subjects[subjectId],
        subject: subjectContent.subject,
        theme: subjectContent.theme,
        published: subjectContent.published
      }
    }
    return { subjects: newSubjects };
  },

  deleteSubjectHelper: function (subjectId, index, state) {
    const subjectOrder = Array.from(state.subjectOrder);
    const textIds = state.subjects[subjectId].textIds;
    const texts = Object.assign({}, { ...state.texts });
    const subjects = Object.assign({}, { ...state.subjects });
    subjectOrder.splice(index, 1);

    for (let i = 0; i < textIds.length; i++)
      delete texts[textIds[i]];

    delete subjects[subjectId];
    return {
      texts,
      subjects,
      subjectOrder
    }
  },

  clearTopicsHelper: function (subjectOrder) {
    let stateObject = {};
    for (let i = 0; i < subjectOrder.length; i++) {
      stateObject[subjectOrder[i]] = false;
    }
    return stateObject;
  },

  deleteTextHelper: function (textId, subjectId, index, state) {
    const newTextIds = Array.from(state.subjects[subjectId].textIds);
    // const newTextIds = state.subjects[subjectId].textIds.map(item => ({ ...item }));
    newTextIds.splice(index, 1)
    const newTexts = { ...state.texts };
    delete newTexts[textId];
    const newState = {
      ...state,
      subjects: {
        ...state.subjects,
        [subjectId]: {
          ...state.subjects[subjectId],
          textIds: newTextIds
        }
      },
      texts: newTexts
    }
    return newState;
  },

  insertTextHelper: function (subjectId, newText, state) {
    const newTextIds = Array.from(state.subjects[subjectId].textIds);
    // const newTextIds = state.subjects[subjectId].textIds.map(item => ({ ...item }));
    newTextIds.unshift(newText._id);
    const newSubjects = {
      ...state.subjects,
      [subjectId]: {
        ...state.subjects[subjectId],
        textIds: newTextIds
      }
    };
    const newTexts = {
      ...state.texts,
      [newText._id]: newText
    };
    return {
      subjects: newSubjects,
      texts: newTexts
    }
  },

  updateTextHelper: function (newText, state) {
    const newTexts = {
      ...state.texts,
      [newText._id]: newText
    };
    return { texts: newTexts }
  },

  addImageToProject: function (newProject, state) {

  },

  addImageToSubject: function (newSubject, state) {
    const newState = {
      ...state,
      subjects: {
        ...state.subjects,
        [newSubject._id]: {
          ...state.subjects[newSubject._id],
          image: newSubject.image,
          largeImage: newSubject.largeImage,
          publicId: newSubject.publicId
        }
      }
    }
    return newState;
  },

  addImageToText: function (text, state) {
    const { image, largeImage, publicId, updatedAt } = text;
    const newState = {
      ...state,
      texts: {
        ...state.texts,
        [text._id]: {
          ...state.texts[text._id],
          image,
          largeImage,
          publicId,
          updatedAt
        }
      }
    }
    return newState;
  },

  singleProjectDragon: function (state, source, destination, draggableId) {
    const newProjectOrder = Array.from(state.projectOrder);
    newProjectOrder.splice(source.index, 1);
    newProjectOrder.splice(destination.index, 0, draggableId)
    const newState = {
      ...state,
      projectOrder: newProjectOrder
    };
    return newState;
  },

  dragonSubjectColumns: function (args) {
    const { subjectOrder: orderArray, source, destination, draggableId } = args;
    // create a new subject array that has the same values as the previous subject array:
    const subjectOrder = Array.from(orderArray)
    // remove the subject from the array:
    subjectOrder.splice(source.index, 1);
    // and insert the subject into its new position:
    subjectOrder.splice(destination.index, 0, draggableId);
    // create a new state with same properties, but new subjectOrder
    const stateUpdate = { subjectOrder };
    return stateUpdate;
  },

  singleSubjectDragon: function (args) {
    const { state, start, source, destination, draggableId } = args
    const textIds = Array.from(start.textIds);
    textIds.splice(source.index, 1);
    textIds.splice(destination.index, 0, draggableId);
    // create new subject column with the same properties as the old column, but with new textIds.
    const newSubject = { ...start, textIds };
    // spread existing subjects into a new state object, and modify it with the new draggable placement:
    const stateUpdate = {
      subjects: {
        ...state.subjects,
        [newSubject._id]: newSubject,
      },
    };
    return stateUpdate;
  },

  multiSubjectDragon: function (args) {
    const { state, start, finish, source, destination, draggableId } = args;
    // first, create a new array from the existing start array:
    const startTextIds = Array.from(start.textIds);
    // Then, splice the dragged item from the new start array:
    startTextIds.splice(source.index, 1);
    // then create a new column with the dragged item removed:
    const newStart = {
      ...start,
      textIds: startTextIds
    };

    // Then do the opposite for the destination column:
    const finishTextIds = Array.from(finish.textIds);
    finishTextIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      textIds: finishTextIds,
    }

    // then create a new state object:
    const newState = {
      ...state,
      subjects: {
        ...state.subjects,
        [newStart._id]: newStart,
        [newFinish._id]: newFinish,
      }
    }

    // change the text subject references in the database:
    const textId = draggableId;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    const changeObject = {
      sourceId,
      destinationId
    }
    API.updateTextSubject(textId, changeObject);

    return newState;
  },

  storyboardDragon: function (state, subjectId, newOrder) {
    const newSubject = {
      ...state.subjects[subjectId],
      textIds: newOrder
    }
    const newState = {
      ...state,
      subjects: {
        ...state.subjects,
        [subjectId]: newSubject
      }
    }
    return newState;
  },
}