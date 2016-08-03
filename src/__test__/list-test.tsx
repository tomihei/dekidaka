import * as React from "react";
import { LineList } from "../ts/list/linelist";
import {spy} from "sinon";
import {assert} from "chai";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";

describe("LineListテスト", () => {

  it("表示テスト", () => {
      const props: ALineData[] = [
        {linename: "F/Y1", partnum: "53f", cicletime: 31.5},
        {linename: "STB3", partnum: "82M", cicletime: 32}
      ];

      const listComponent: any = TestUtils.renderIntoDocument(
        <LineList value={props}/>
      );

      const listDOM = ReactDOM.findDOMNode(listComponent);
      const list: NodeListOf<HTMLTableDataCellElement> = listDOM.getElementsByTagName("td");
      const td1: HTMLTableDataCellElement = list[0];
      assert.deepEqual(td1.textContent, "F/Y1");
  });
});
