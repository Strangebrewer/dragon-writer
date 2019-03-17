import { Component } from 'react';
import { Block, Selection, Value } from "slate";
import { getEventRange, getEventTransfer } from "slate-react";
import imageExtensions from 'image-extensions';
import isUrl from "is-url";
import initialValue from "../slate/utils/value.json";
import { API, Scales } from "../../utils";

const DEFAULT_NODE = 'paragraph';

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph');
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    }
  }
}

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

  isImage = url => !!imageExtensions.some(ext => url.includes(`.${ext}`));

  insertImage = (editor, src, target) => {
    if (target) editor.select(target);
    editor.insertBlock({
      type: 'image',
      data: { src }
    });
  };

  wrapLink = (editor, href) => {
    editor.wrapInline({
      type: 'link',
      data: { href }
    });
    editor.moveToEnd();
  }

  unwrapLink = editor => {
    editor.unwrapInline('link');
  }

  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === 'link');
  }

  onClickLink = event => {
    event.preventDefault();
    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.command(this.unwrapLink)
    } else if (value.selection.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');
      if (href === null) return;

      const text = window.prompt('Enter the text for hte link:');
      if (text === null) return;

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(this.wrapLink, href)
    }
  }

  onDropOrPaste = (event, editor, next) => {
    const target = getEventRange(event, editor);
    console.log(editor);
    if (!target && event.type === 'drop') return next();

    const transfer = getEventTransfer(event);
    const { type, text, files } = transfer;
    console.log(transfer);

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime !== 'image') continue;

        reader.addEventListener('load', () => {
          editor.command(this.insertImage, reader.result, target);
        });

        reader.readAsDataURL(file);
      }
      return;
    }

    if (type === 'text' || type === 'html') {
      if (!isUrl(text) && !this.isImage(text)) return next();
      if (this.isImage(text) || text.includes('.mp4')) {
        editor.command(this.insertImage, text, target);
        return;
      }
      if (isUrl(text)) {
        if (this.hasLinks())
          editor.command(this.unwrapLink);
        editor.command(this.wrapLink, text)
      }
      return;
    }

    next();
  }

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
      const isList = this.hasBlock('list-item');
      const hasImage = this.hasBlock('image-left') || this.hasBlock('image-right');

      if (isList)
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      else if (hasImage)
        editor.setBlocks(isActive ? DEFAULT_NODE : type);

      else if (type === 'image-left' || type === 'image-right') {
        let location;
        if (type === 'image-left') location = 'left';
        if (type === 'image-right') location = 'right';
        const src = window.prompt('Enter the URL of the image:');
        editor
          .wrapBlock(isActive ? DEFAULT_NODE : { type, data: { src, location } })
          // .unwrapBlock(DEFAULT_NODE)
      }
      else
        editor.setBlocks(isActive ? DEFAULT_NODE : type);

    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(
          block.key, parent => parent.type === type
        );
      });

      if (isList && isType)
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      else if (isList)
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      else
        editor.setBlocks('list-item').wrapBlock(type);
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
        hasLinks: this.hasLinks,
        hasMark: this.hasMark,
        onChange: this.onChange,
        onClickBlock: this.onClickBlock,
        onClickImage: this.onClickImage,
        onClickImageLeft: this.onClickImageLeft,
        onClickImageRight: this.onClickImageRight,
        onClickLink: this.onClickLink,
        onClickMark: this.onClickMark,
        onDropOrPaste: this.onDropOrPaste,
        thisRef: this.ref,
        schema: schema,
        state: this.state,
        updateText: this.updateText,
      })
    )
  };
}