import React from "react";
import styled from 'styled-components';
import { ModalLogic } from "../../Renderers";

const Image = styled.img`
  display: block;
  /* float: left; */
  /* margin: 5px 20px 5px 0px; */
  margin: 10px auto;
  max-width: 50%;
  max-height: 500px;
  box-shadow: ${props => props.selected ? '0 0 0 2px blue' : 'none'};
  text-align: center;
`;

function renderNode(props, editor, next) {
  const { attributes, children, node, isFocused } = props;
  
  switch (node.type) {
    case 'block-quote':
      return (
        <div
          style={{
            borderLeft: "2px solid #e1e1e1",
            paddingLeft: "10px",
            width: "80%",
            opacity: ".8",
            fontStyle: "italic"
          }}>
          <blockquote {...attributes}>{children}</blockquote>
        </div>
      );
    case "code":
      return (
        <pre {...attributes} style={{ textIndent: '25px', lineHeight: '1' }}>
          <code style={{ background: '#eeeeee', borderRadius: '2px', padding: '0', textIndent: "25px" }}>{children}</code>
        </pre>
      );

    case "image": {
      const src = node.data.get('src');
      return (
        <ModalLogic>
          {props => (
            <Image
              {...attributes}
              src={src}
              onClick={
                () => props.setModal({
                  body: <img src={src} style={{ maxHeight: '80vh', maxWidth: '90vw' }} />,
                  buttons: <button onClick={props.closeModal}>OK</button>
                })
              }
              selected={isFocused}
            />
          )}
        </ModalLogic>
      )
    }


    case "link": {
      const { data } = node;
      let href = data.get('href');
      //  Many (most? all?) https sites automatically redirect from http to https
      //  So maybe this way I don't have to exclude http sites...?
      if (!href.includes('http')) href = `http://${href}`;
      return (
        <a {...attributes} href={`${href}`} target="_blank" rel="noopener noreferrer">{children}</a>
      )
    }

    case 'paragraph':
      return <p {...attributes}>{children}</p>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 style={{ fontSize: "30px", fontWeight: "bold" }} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={{ fontSize: "25px", fontWeight: "bold" }} {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 style={{ fontSize: "18px", fontWeight: "bold", fontStyle: 'italic' }} {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return next();
  }
};

function renderMark(props, editor, next) {
  const { children, mark, attributes } = props;
  switch (mark.type) {
    case "red":
      return <span style={{ color: '#bd0000' }} {...attributes}>{children}</span>;
    case "blue":
      return <span style={{ color: '#1111ff' }} {...attributes}>{children}</span>;
    case "green":
      return <span style={{ color: '#39ff14' }} {...attributes}>{children}</span>;
    case "yellow":
      return <span style={{ color: '#fffb00' }} {...attributes}>{children}</span>;
    case "purple":
      return <span style={{ color: '#660d8a' }} {...attributes}>{children}</span>;
    case "code":
      return <code style={{ background: '#eeeeee', borderRadius: '2px' }} {...attributes}>{children}</code>;
    case 'bold':
      return <strong {...attributes}>{children}</strong>;
    case 'italic':
      return <em {...attributes}>{children}</em>;
    case 'strikethrough':
      return <del {...attributes}>{children}</del>;
    case 'underline':
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
};

export { renderNode, renderMark };