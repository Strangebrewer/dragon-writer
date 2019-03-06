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

  render() {
    console.log(this.state.works);
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
                    {project.published.map(subject => (
                      <li key={subject._id}>{subject.subject}</li>
                    ))}
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