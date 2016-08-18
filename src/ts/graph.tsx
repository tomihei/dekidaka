import * as React from "react";
import * as ReactDOM from "react-dom";
import { NVD3Chart } from "react-nvd3";

interface GraphData {
  value: any[];
  type: string;
  x: string;
  y: string;
}

export class Graph extends React.Component<GraphData, {}> {
  public render () {
    return  <NVD3Chart id="barChart"
                      type={this.props.type}
                      datum={this.props.value}
                      x={this.props.x}
                      y={this.props.y}
           />;
  }
}
