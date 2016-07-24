import * as React from "react";

export class Form extends React.Component<LineFormData, {}> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(event) {
    this.props.checkValue(this.props.name, event.target.value);
  }
  public render() {
    return <div className="form-group">
             <input
              name={this.props.name}
              type={this.props.type}
              placeholder={this.props.placeholder}
              onChange={this.handleChange}
              className="form-control"
              required
            />
          </div>;
  }
}
