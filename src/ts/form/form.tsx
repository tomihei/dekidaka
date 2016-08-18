import * as React from "react";
interface Formcomp {
    name: string;
    type: string;
    placeholder: string;
    checkValue: Function;
}

interface FormData {
  value: LineFormData[];
  checkValue: Function;
}
interface InputData {
  inputvalue: string;
  onSubmit: Function;
}

export class Input extends React.Component<InputData, {}> {
  public render() {
    return <input
              type="submit"
              className="btn btn-default btn-block"
              value={this.props.inputvalue}
              onClick={this.props.onSubmit}
            />;
  }
}

export class FormTemp extends React.Component<FormData, {}> {
  public render() {
    let input;
    let form = this.props.value.map((data) => {
       return <Form   type={data.type}
                      key={data.name}
                      name={data.name}
                      placeholder={data.placeholder}
                      checkValue={this.props.checkValue}
              />;
    });
    return <div>
             {form}
           </div>;
  }
}


export class Form extends React.Component<Formcomp, {}> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(event) {
    this.props.checkValue(this.props.name, event.target.value);
  }
  public render() {
    let num;
    if (this.props.type === "number") {
       num = <input
                name={this.props.name}
                type={this.props.type}
                step="0.1"
                onChange={this.handleChange}
                className="input"
                required
             />;
    }else if (this.props.type === "select") {
        num = <select className="form-control">
                  <option default>{this.props.placeholder}</option>
              </select>
    }else  {
      num = <input
               name={this.props.name}
               type={this.props.type}
               onChange={this.handleChange}
               className="input"
               required
            />;
    }
    return <div className="group">
              {num}
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="label">{this.props.placeholder}</label>
          </div>;
  }
}

interface DateData {
  onChange: Function;
  name: string;
  label: string;
}

export class Date extends React.Component<DateData, {}> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(event) {
    this.props.onChange(this.props.name, event.target.value);
  }
  public render() {
    return  <div className="group">
              <input
                type="date"
                onChange={this.handleChange}
                className="input"
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <span className="date-label">{this.props.label}</span>
            </div>;
  }
}

interface Fixed {
  label: string;
  value: any;
}

export class FixedForm extends React.Component<Fixed, {}> {
  public render() {
    return <div className="group">
             <span className="fixed-input">
                {this.props.value}
              </span>
             <span className="fixed-highlight"></span>
             <span className="fixed-bar"></span>
             <span className="fixed-label">{this.props.label}</span>
           </div>;
  }
}
