import React, { Component, Fragment } from 'react';
import { API } from '../utils';

class Public extends Component {
  state = {
    loading: true,
    works: ''
  }

  async componentDidMount() {
    const username = this.props.match.params.username;
    const res = await API.fetchPublicWorks(username);
    console.log(res.data);
    const works = res.data.projects;
    this.setState({ works, loading: false });
  }

  unwrittenFunction = id => {
    console.loud(id, "SUBJECT ID", { padding: 'cyan', message: 'green'});
    // this function will toggle the selected column on and toggle all others off
    // That's right, only one column at a time, folks. Because I said so.
  }

  render() {
    // console.loud(this.state.works, "Works");
    return (
      <div>
        {/* Got it returning the data I need */}
        {/* Now just need to refine the data and decide what to display and how */}
        {!this.state.loading
          ? (
            <ul>
              {this.state.works.map(project => (
                <Fragment key={project._id}>
                  <li>{project.title}</li>
                  <ul>
                    {project.published.map(subject => {
                      console.loud(subject, "HERE'S YOUR SUBJECT, SUCKA!");
                      return (
                        <li key={subject._id}>
                          <button onClick={() => this.unwrittenFunction(subject._id)}>{subject.subject}</button>
                        </li>
                      )
                    })}
                  </ul>
                </Fragment>
              ))}
            </ul>
          )
          : null
        }
      </div>
    );
  }
}

export default Public;