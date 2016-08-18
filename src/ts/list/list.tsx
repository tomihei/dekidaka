import * as React from "react";
import {Input} from "../form/form";

interface Data {
  value: any;
  onClick: Function;
  inputOn: boolean;
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
    let input;

    for (let i in this.props.value) {
      if (i === "_id") { continue; };
      // 行と列番号をkeyに指定
      td.push(<td key={this.props.value._id + num.toString()}>
                {this.props.value[i]}
              </td>);
      num++;
    };
    // ボタン設置
    if (this.props.inputOn) {
      input =      <Input
                        inputvalue="削除"
                        onSubmit={this.handleClick}
                       />;
      return  <tr>
                 {td}
               <td>
                 {input}
               </td>
             </tr>;
    }else {
      return <tr onClick={this.handleClick}>
                {td}
             </tr>;
    }
  }
}


interface ListData {
  onEvent: Function;
  value: any[];
  th: string[];
  inputOn: boolean;
}

export class List extends React.Component<ListData, {}> {

  public render() {
    let head = [];
    for (let key in this.props.value[0]) {
      if (key === "_id") { continue; };
      head.push(key);
    }
    this.props.value.sort((a, b) => {
      if (a[head[0]] < b[head[0]]) { return -1; };
      if (a[head[0]] > b[head[0]]) { return 1; };
      return 0;
    });
    let tr = this.props.value.map((data) => {
      return <TrData key={data._id} inputOn={this.props.inputOn} value={data} onClick={this.props.onEvent}/>;
    });
    let thead = this.props.th.map((data) => {
      return <th key={data}>{data}</th>;
    });
    return <table className="table table-condensed  table-hover">
             <thead>
              <tr>
                {thead}
              </tr>
             </thead>
             <tbody>
              {tr}
             </tbody>
           </table>;
  }
}
