import React, { Component } from 'react';
import { API } from '../utils';

class Public extends Component {
  state = {
    works: ''
  }

  async componentDidMount() {
    const username = this.props.match.params.username;
    const res = await API.fetchPublicWorks(username);
    console.log(res);
    this.setState({ works: res.data });
  }

  render() {
    console.log(this.state.works);
    return (
      <div>
        {/* Got it returning the data I need */}
        {/* Now just need to refine the data and decide what to display and how */}
      </div>
    );
  }
}

export default Public;