import React from "react";

function renderNode(props, editor, next) {
  const { attributes, children, node } = props;
  switch (node.type) {
    case "code":
      return (
        <pre {...attributes} style={{ textIndent: '25px', lineHeight: '1' }}>
          <code style={{ background: '#eeeeee', borderRadius: '2px', padding: '0', textIndent: "25px" }}>{children}</code>
        </pre>
      );
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

    case 'paragraph':
      return <p {...attributes}>{children}</p>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 style={{ fontSize: "30px", fontWeight: "bold" }} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={{ fontSize: "25px", fontWeight: "bold" }} {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 style={{ fontSize: "20px", fontWeight: "bold" }} {...attributes}>{children}</h3>
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
    case 'link': {
      let tempObj = {};
      for (let i in children)
        if (i !== "props")
          tempObj[i] = children[i]

      let propObj = {};
      for (let j in children.props)
        propObj[j] = children.props[j]

      tempObj.props = propObj;
      let str = tempObj.props.children;
      const start = str.indexOf('(');
      const end = str.indexOf(')');
      const href = str.substring(start + 1, end);
      const linkText = str.slice(0, start);
      tempObj.props.children = linkText;
      return (
        <a
          style={{ color: '#1111ff', textDecoration: 'underline' }}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          {...attributes}
          value={linkText}
        >
          {tempObj}
        </a>
      )
    }
    default:
      return next();
  }
};

export { renderNode, renderMark };