import React, { useState } from 'react';
import { Button, Form, Input, Label, TextArea } from "./FormElements";
import { API } from "../../utils";

export const NewProjectForm = props => {

   const [link, setLink] = useState('');
   const [summary, setSummary] = useState('');
   const [title, setTitle] = useState('');

   function handleInputChange(event) {
      const { name, value } = event.target;
      if (name === 'link') setLink(value);
      if (name === 'summary') setSummary(value);
      if (name === 'title') setTitle(value);
   }

   function buildHeaders() {
      const token = localStorage.getItem('token');
      return { headers: { "Authorization": `Bearer ${token}` } };
   }

   async function createProject(e) {
      e.preventDefault();
      let error;
      let project;
      const headers = buildHeaders();
      try {
         // keep the create project here to help control app flow
         project = await API.createProject({
            title,
            summary,
            link,
            userId: props.user._id
         }, headers);
         if (project.data.customMessage) throw project.data;
      }
      catch (err) {
         error = err;
         if (err.customMessage)
            props.setModal({
               body: <p>{err.customMessage}</p>,
               buttons: <Button onClick={props.closeModal}>OK</Button>
            });
         else
            props.setModal({
               body: <p>Something went wrong with your request. Please try again.</p>,
               buttons: <Button onClick={props.closeModal}>OK</Button>
            });
      }
      if (!error)
         props.addNewProject(project.data._id, props.toggleProjectForm);
   }

   return (
      <Form style={{ margin: 'auto', justifyContent: 'center' }}>
         <h2>New Project</h2>
         <Label>Project Title:</Label>
         <Input
            name="title"
            value={title}
            type="text"
            maxLength="40"
            onChange={handleInputChange}
            placeholder="40-character limit"
         />
         <Label>Project Summary:</Label>
         <TextArea
            name="summary"
            value={summary}
            type="text"
            maxLength="140"
            onChange={handleInputChange}
            placeholder="140-character limit"
         />
         <Label>Project Keyword:</Label>
         <Input
            name="link"
            value={link}
            type="text"
            maxLength="12"
            onChange={handleInputChange}
            placeholder="12-character limit"
         />
         <Button onClick={e => createProject(e)}>Submit</Button>
         <Button style={{ margin: "10px auto 0 auto" }} onClick={props.toggleProjectForm}>Cancel</Button>
      </Form>
   );
};

// export class NewProjectForm extends Component {
//   state = {
//     title: '',
//     summary: '',
//     link: '',
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   buildHeaders = () => {
//     const token = localStorage.getItem('token');
//     return { headers: { "Authorization": `Bearer ${token}` } };
//   }

//   createProject = async e => {
//     e.preventDefault();
//     let error;
//     let project;
//     const { link, summary, title } = this.state;
//     const headers = this.buildHeaders();
//     try {
//       // keep the create project here to help control app flow
//       project = await API.createProject({
//         title,
//         summary,
//         link,
//         userId: this.props.user._id
//       }, headers);
//       if (project.data.customMessage) throw project.data;
//     }
//     catch (err) {
//       error = err;
//       if (err.customMessage)
//         this.props.setModal({
//           body: <p>{err.customMessage}</p>,
//           buttons: <Button onClick={this.props.closeModal}>OK</Button>
//         });
//       else
//         this.props.setModal({
//           body: <p>Something went wrong with your request. Please try again.</p>,
//           buttons: <Button onClick={this.props.closeModal}>OK</Button>
//         });
//     }
//     if (!error)
//       this.props.addNewProject(project.data._id, this.props.toggleProjectForm);
//   }

//   render() {
//     return (
//       <Form style={{ margin: 'auto', justifyContent: 'center' }}>
//         <h2>New Project</h2>
//         <Label>Project Title:</Label>
//         <Input
//           name="title"
//           value={this.state.title}
//           type="text"
//           maxLength="40"
//           onChange={this.handleInputChange}
//           placeholder="40-character limit"
//         />
//         <Label>Project Summary:</Label>
//         <TextArea
//           name="summary"
//           value={this.state.summary}
//           type="text"
//           maxLength="140"
//           onChange={this.handleInputChange}
//           placeholder="140-character limit"
//         />
//         <Label>Project Keyword:</Label>
//         <Input
//           name="link"
//           value={this.state.link}
//           type="text"
//           maxLength="12"
//           onChange={this.handleInputChange}
//           placeholder="12-character limit"
//         />
//         <Button onClick={e => this.createProject(e)}>Submit</Button>
//         <Button style={{ margin: "10px auto 0 auto" }} onClick={this.props.toggleProjectForm}>Cancel</Button>
//       </Form>
//     );
//   }
// };