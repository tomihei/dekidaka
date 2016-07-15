import * as React from "react";

export interface TextFormdata { label: string; };

export class TextForm extends React.Component<TextFormdata, {}> {
    render() {
        return <div className="form-group">
                <label>{this.props.label}</label>
                <input type="text" className="form-control"/>
               </div>;
    }
}
