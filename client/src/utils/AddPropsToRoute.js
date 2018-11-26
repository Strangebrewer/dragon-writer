import React, { Component } from "react";

export const AddPropsToRoute = (WrappedComponent, passedProps) => {
  return (
    class Route extends Component {
      render() {
        let props = Object.assign({}, this.props, passedProps);
        return <WrappedComponent {...props} />;
      }
    }
  );
};