import * as React from "react";
import { List } from "../ts/list/list";
import {spy} from "sinon";
import {assert} from "chai";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";

describe("Listテスト", () => {

  it("表示テスト", () => {
      const props: ALineData = {linename: "F/Y1", partnum: "53F", cicletime: 31.5};
      const listComponent: any = TestUtils.renderIntoDocument(
        <List value={props}/>
      );

      const listDOM = ReactDOM.findDOMNode(listComponent);
      const list: NodeListOf<HTMLTableDataCellElement> = listDOM.getElementsByTagName("td");
      const td1: HTMLTableDataCellElement = list[0];
      assert.deepEqual(td1.textContent, "F/Y1");
      const td2 = list[1];
      assert.deepEqual(td2.textContent, "53F");
      const td3 = list[2];
      assert.deepEqual(td3.textContent, "31.5");
  });
});
