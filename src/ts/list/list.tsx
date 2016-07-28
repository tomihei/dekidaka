import * as React from "react";

interface ListData {
  value: ALineData;
}

export class List extends React.Component<ListData, {}> {
  public render() {
    return <tr>
             <td>{this.props.value.linename}</td>
             <td>{this.props.value.partnum}</td>
             <td>{this.props.value.cicletime}</td>
           </tr>;
  }
}
