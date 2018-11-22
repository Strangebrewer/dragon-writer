import API from "./API";

export const Scales = {
  toggleSubjectHelper: function (state, subject) {
    const newSubjectOrder = [...state.subjectOrder, subject._id];
    const newSubjects = {
      ...state.subjects,
      [subject._id]: {
        subject: subject.subject,
        textIds: [],
        theme: subject.theme,
        _id: subject._id
      }
    }
    return {
      subjectOrder: newSubjectOrder,
      subjects: newSubjects,
      create: !state.create
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
    API.deleteText(textId);
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
    return {
      texts: newTexts
    }
  },

  dragonSubjectColumns: function (state, source, destination, draggableId) {
    // create a new subject array that has the same values as the previous subject array:
    const newSubjectOrder = Array.from(state.subjectOrder)
    // const newSubjectOrder = state.subjectOrder.map(item => ({ ...item }));
    // remove the subject from the array:
    newSubjectOrder.splice(source.index, 1);
    // and insert the subject into its new position:
    newSubjectOrder.splice(destination.index, 0, draggableId);
    // create a new state with same properties, but new subjectOrder
    const newState = {
      ...state,
      subjectOrder: newSubjectOrder
    };
    return newState;
  },

  singleSubjectDragon: function (state, start, source, destination, draggableId) {
    const newTextIds = Array.from(start.textIds);
    // const newTextIds = start.textIds.map(item => ({ ...item }));
    // const movingText = { ...newTextIds[source.index] };
    newTextIds.splice(source.index, 1);
    newTextIds.splice(destination.index, 0, draggableId);
    // const newSubjectTexts = Array.from(state.subjectTexts);
    // newSubjectTexts.splice(source.index, 1);
    // newSubjectTexts.splice(destination.index, 0, draggableId);
    // create new subject column with the same properties as the old column, but with new textIds.
    const newSubject = {
      ...start,
      textIds: newTextIds
    };
    // spread existing state into a new state object, and modify it with the new draggable placement:
    const newState = {
      ...state,
      subjects: {
        ...state.subjects,
        [newSubject._id]: newSubject,
      },
      // subjectTexts: newSubjectTexts
    };
    console.log(newState);
    return newState;
  },

  multiSubjectDragon: function (state, start, finish, source, destination, draggableId) {
    // first, create a new array from the existing start array:
    const startTextIds = Array.from(start.textIds);
    // const startTextIds = start.textIds.map(item => ({ ...item }));
    // Then, splice the dragged item from the new start array:
    startTextIds.splice(source.index, 1);
    // then create a new column with the dragged item removed:
    const newStart = {
      ...start,
      textIds: startTextIds
    };

    // Then do the opposite for the destination column:
    const finishTextIds = Array.from(finish.textIds);
    // const finishTextIds = finish.textIdsmap(item => ({ ...item }));
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
  }
}