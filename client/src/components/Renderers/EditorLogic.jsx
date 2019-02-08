import { Component } from 'react';
import { Value } from "slate";
import initialValue from "../slate/utils/value.json";
import { API, Scales } from "../../utils";

const DEFAULT_NODE = 'paragraph';

export class EditorLogic extends Component {
  state = {
    value: Value.fromJSON(this.props.text ? this.props.text : initialValue),
    title: this.props.title || '',
    subject: this.props.subject || '',
    thesis: this.props.thesis || '',
    incomingText: this.props.incomingText,
  };

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  onChange = ({ value }) => {
    this.setState({ value });
  };

  ref = editor => {
    this.editor = editor;
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  onClickMark = (type) => {
    this.editor.toggleMark(type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onClickBlock = (type) => {
    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  };

  updateText = async id => {
    const textObject = {
      title: this.state.title,
      thesis: this.state.thesis,
      text: JSON.stringify(this.state.value.toJSON())
    }
    const headers = this.buildHeaders();
    const text = await API.updateText(id, textObject, headers);
    const newState = Scales.updateTextHelper(text.data, this.props.state);
    this.props.callback(id);
    this.props.executeDragonStateChanges(newState, "update-text", text.data);
  };

  createText = async () => {
    const { callback, state } = this.props;
    const id = this.state.subject._id || this.state.subject;
    const textObject = {
      projectId: this.props.projectId,
      subjectId: this.state.subject._id || this.state.subject,
      title: this.state.title,
      thesis: this.state.thesis,
      text: JSON.stringify(this.state.value.toJSON())
    }
    const headers = this.buildHeaders();
    const text = await API.createText(textObject, headers);
    const newState = await Scales.insertTextHelper(id, text.data, state);
    if (callback) this.props.callback();
    this.props.executeDragonStateChanges(newState, "new-text", text.data);
  };

  render() {
    return (
      this.props.children({
        createText: this.createText,
        handleInputChange: this.handleInputChange,
        hasBlock: this.hasBlock,
        hasMark: this.hasMark,
        onChange: this.onChange,
        onClickBlock: this.onClickBlock,
        onClickMark: this.onClickMark,
        thisRef: this.ref,
        state: this.state,
        updateText: this.updateText,
      })
    )
  };
}