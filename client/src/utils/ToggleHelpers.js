export const Toggle = {
  inlineNew: function (subject, inline, dropZone) {
    const newState = {
      singleSubject: subject,
      inlineTextNew: !inline,
      singleTextEdit: false,
      dropZoneOn: !dropZone,
    }
    return newState;
  },

  singleNew: function (editor, dropZone, inlineTextNew, singleTextEdit) {
    const newState = {};
    if (inlineTextNew || singleTextEdit) {
      newState.editorOn = !editor;
      newState.dropZoneOn = dropZone;
      newState.inlineTextNew = false;
      newState.singleTextEdit = false;
    }
    else {
      newState.editorOn = !editor;
      newState.dropZoneOn = !dropZone;
    }
    return newState;
  },

  singleEdit: function (subject, text, edit, dropZone) {
    const newState = {
      singleSubject: subject,
      singleText: text,
      inlineTextNew: false,
      singleTextEdit: !edit,
      dropZoneOn: !dropZone,
    }
    return newState;
  },

  dragonText: function (id) {
    const newState = {}
    if (id) {
      newState.singleSubjectId = id;
      newState.dragons = true;
      newState.storyboardOn = false;
    }
    else newState.dragons = false;
    return newState;
  },

  storyboard: function (id) {
    const newState = {}
    if (id) {
      newState.singleSubjectId = id;
      newState.storyboardOn = true;
      newState.dragons = false;
    }
    else newState.storyboardOn = false;
    return newState;
  }

}