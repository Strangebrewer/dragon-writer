import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 6px;
  left: 8px;
  width: calc(100% - 40px);
  a {
    color: ${props => props.theme.mainColor};
    font-size: 1.5rem;
    transition: ${props => props.theme.colorTrans};
    &:hover {
      color: ${props => !props.disabled && "#26d4cc"};
    }
  }
  button {
    position: relative;
  }

  button:first-child:hover {
   span {
      color: ${props => !props.disabled && "#26d4cc"};
    }
  }
  span {
    display: inline-block;
    font-weight: bold;
    position: absolute;
    transition: ${props => props.theme.colorTrans}, text-shadow 0.15s ease-in-out;
  }
  .column-btn-plus {
    color: lightgreen;
    font-size: 13px;
    top: -4px;
    left: -1px;
    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #000;
  }
  .column-btn-square {
    font-size: 15px;
    top: -1px;
    left: 0;
    right: 0
  }
`;

export const ColumnButtons = React.memo(props => {
   const { id, index, subject, texts } = props;
   const { image, publicId, published } = subject;
   console.log(subject);
   return (
      props.loading
         ? <Spinner top="8px" left="54px" size="12px" />
         : (
            <Fragment>
               <Buttons>
                  <LinkBtn
                     disabled={props.disabled}
                     onClick={() => props.toggleInlineNew(subject)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? `create new text for ${subject.subject}` : null}
                  >
                     <span className="column-btn-plus">+</span><i className="far fa-file-alt" />
                  </LinkBtn>

                  <LinkBtn
                     disabled={props.disabled}
                     onClick={() => props.toggleDragonText(id)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? "expand column to read all full texts" : null}
                  >
                     <span className="column-btn-square">
                        &#9642;
              </span><i className="fas fa-expand" />
                  </LinkBtn>

                  <LinkBtn
                     disabled={props.disabled}
                     onClick={() => props.updateSubjectModal(subject)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? "edit column name" : null}
                  >
                     <i className="fas fa-edit" />
                  </LinkBtn>

                  <LinkBtn
                     disabled={props.disabled || !image}
                     onClick={() => props.imageModal(image, publicId, id, "column")}
                     padding="0 3px 5px 3px"
                     title={!props.disabled
                        ? (
                           image
                              ? "see image for this column"
                              : "no image has been uploaded for this column"
                        ) : null}
                  >
                     <i className="far fa-images" />
                  </LinkBtn>

                  <LinkBtn
                     disabled={props.disabled || image}
                     onClick={() => props.uploadImageModal(id)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled
                        ? (
                           image
                              ? "you must delete the current image before uploading another"
                              : "upload image for this column"
                        ) : null}
                  >
                     <i className="fas fa-upload" />
                  </LinkBtn>

                  <LinkBtn
                     disabled={props.disabled}
                     onClick={() => props.toggleStoryboard(id)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? "storyboard view" : null}
                  >
                     <i className="fas fa-th" />
                  </LinkBtn>

                  {/* when buttons are disabled, make this a button so the link won't work */}
                  {props.disabled
                     ? (
                        <LinkBtn disabled={props.disabled} padding="0 3px 5px 3px">
                           <i className="fas fa-print" />
                        </LinkBtn>
                     ) : (
                        <Link
                           style={{ padding: "1px 3px 5px 3px" }}
                           title={!props.disabled ? "print view" : null}
                           to={{ pathname: "/print", state: { texts, subject } }}
                        >
                           <i className="fas fa-print" />
                        </Link>
                     )
                  }

                  <LinkBtn
                     disabled={props.disabled}
                     onClick={() => props.publishModal(subject)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? (published ? "make this column private" : "make this column public") : null}
                  >
                     <i className="fas fa-book-open" />
                  </LinkBtn>

                  <LinkBtn
                     delete
                     disabled={props.disabled}
                     onClick={() => props.deleteSubjectModal(id, index)}
                     padding="0 3px 5px 3px"
                     title={!props.disabled ? "delete this column" : null}
                  >
                     <i className="fas fa-trash-alt" />
                  </LinkBtn>
               </Buttons>

               <LinkBtn
                  disabled={props.disabled}
                  onClick={() => props.toggleSubject(id)}
                  padding="0 4px 5px 0"
                  position="absolute"
                  top="2px"
                  right="3px"
                  size="2rem"
                  title={!props.disabled ? "close this column" : null}
               >
                  &times;
          </LinkBtn>
            </Fragment>
         )
   )
});