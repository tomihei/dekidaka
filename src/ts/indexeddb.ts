
export class IndexDB {
  public onWriteEvent: (message: boolean) => void;
  public onReadEvent: (message: string, data?: any) => void;
  public onConnect: (message: boolean) => void;
  protected table: string;
  protected db: IDBDatabase = null;
  protected request;
  constructor(target: string) {
    this.table = target;
    this.request = indexedDB.open("dekidaka");
    // 接続成功（初回 or DBのバージョンが変わったとき）
    this.request.onupgradeneeded = (event) => {
        this.db = (<IDBRequest>event.target).result;
        this.index();
        this.onConnect(true);
    };
    // 接続成功（すでにDBが存在する場合）
    this.request.onsuccess = (event) => {
        this.db = (<IDBRequest>event.target).result;
        this.onConnect(true);
    };
    this.request.onerror = (event) => {
        console.log(event.message);
        this.onConnect(false);
    };
  }

  public getAllData() {
    let trans = this.db.transaction(this.table, "readonly");
    let store = trans.objectStore(this.table);
    let request = store.openCursor();
    let data = [];
    request.onsuccess = (event) => {
      let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
      if (cursor) {
        data.push(cursor.value);
        // this.onReadEvent("success", cursor.value);
        cursor.continue();
      } else {
      this.onReadEvent("success", data);
      };
    };
  }
  public getDataforTable(table: string, key: number): any {
    let trans = this.db.transaction(table, "readonly");
    let store = trans.objectStore(table);
    let request = store.get(key);
    let data;
    request.onsuccess = (event) => {
      data = request.result;
      this.onReadEvent("successtable", data);
    };
    request.onerror = (event) => {
      this.onReadEvent("error");
    };
  }
  public getData(key: number) {
    let trans = this.db.transaction(this.table, "readonly");
    let store = trans.objectStore(this.table);
    let request = store.get(key);
    let data;
    request.onsuccess = (event) => {
      data = request.result;
      this.onReadEvent("success", data);
    };
    request.onerror = (event) => {
      this.onReadEvent("error");
    };
  }
  public getCursorData(index: string, key: any) {
    let trans = this.db.transaction(this.table, "readonly");
    let store = trans.objectStore(this.table);
    let indexed = store.index(index);
    let keyrange = IDBKeyRange.only(key);
    let request = indexed.openCursor(keyrange);
    let data = [];
    request.onsuccess = (event) => {
      let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
      if (cursor) {
        data.push(cursor.value);
        // this.onReadEvent("success", cursor.value);
        cursor.continue();
      } else {
      this.onReadEvent("success", data);
      };
    };
  }
  public addData(data) {
    let trans = this.db.transaction(this.table, "readwrite");
    let store = trans.objectStore(this.table);
    let request = store.put(data);

    request.onsuccess = (event) => {
      this.onWriteEvent(true);
    };
    request.onerror = (event) => {
      console.log(event);
      this.onWriteEvent(false);
    };
  }
  public deleteData(key) {
    let trans = this.db.transaction(this.table, "readwrite");
    let store = trans.objectStore(this.table);
    let request = store.delete(key);
    request.onsuccess = (event) => {
      this.onWriteEvent(true);
    };
    request.onerror = () => {
      this.onWriteEvent(false);
    };
  }
  private index() {
    let store = this.db.createObjectStore("lineinfo", { keyPath: "_id", autoIncrement : true });
    // ライン名と品番のインデックスを作成
    store.createIndex("linepartIndex", ["linename", "partnum"], {unique: true});
    // ライン名でインデックス作成
    store.createIndex("linename", "linename");
    let store2 = this.db.createObjectStore("linedata", { keyPath: "_id", autoIncrement : true });
    store2.createIndex("linepartdateIndex", ["linename", "partnum", "date"], {unique: true});
    store2.createIndex("linepartIndex", ["linename", "partnum"], {unique: false});

    store2.createIndex("linename", "linename");
    store2.createIndex("linedata", ["linename", "date"], {unique: false});
    store2.createIndex("lineeffi", ["linename", "lineeffi"], {unique: false});
    store2.createIndex("stoptime", ["linename", "stoptime"], {unique: false});
    store2.createIndex("output", "output");
  };
}
