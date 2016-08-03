import * as React from "react";

interface Data {
  value: any;
  onClick: Function;
}

export class TrData extends React.Component<Data, {}> {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  public handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.value._id);
  }
  public render() {
    let td = [];
    let num = 1;
    for (let i in this.props.value) {
      if (i === "_id") { continue; };
      // 行と列番法をkeyに指定
      td.push(<td key={this.props.value._id + num.toString()}>
                {this.props.value[i]}
              </td>);
      num++;
    };
    return  <tr>
              {td}
              <td>
                <input
                  onClick={this.handleClick}
                  type="submit"
                  className="btn btn-xs btn-primary"
                  value="登録"
                 />
              </td>
            </tr>;
  }
}
