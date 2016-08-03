
export class IndexDB {
  public onWriteEvent: Function;
  public onReadEvent: Function;
  public onConnect: Function;
  public request;
  public db: IDBDatabase = null;
  public table: string;
  constructor(target: string) {
    this.table = target;
    this.request = indexedDB.open("dekidaka");
    this.connect();
  }
  public connect() {
    // 接続成功（初回 or DBのバージョンが変わったとき）
    this.request.onupgradeneeded = (event) => {
        this.db = (<IDBRequest>event.target).result;
        let store = this.db.createObjectStore(this.table, { keyPath: "_id", autoIncrement : true });
        this.onConnect("connect");
    };
    // 接続成功（すでにDBが存在する場合）
    this.request.onsuccess = (event) => {
        this.db = (<IDBRequest>event.target).result;
        this.onConnect("connect");
    };
    this.request.onerror = (event) => {
        console.log(event.message);
        this.onConnect("error");
    };
  }
  public getAllData() {
    let trans = this.db.transaction(this.table, "readonly");
    let store = trans.objectStore(this.table);
    let request = store.openCursor();

    request.onsuccess = (event) => {
      let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
      if (cursor) {
        this.onReadEvent("success", cursor.value);
        cursor.continue();
      }
    };
  }
  public addData(data) {
    let trans = this.db.transaction(this.table, "readwrite");
    let store = trans.objectStore(this.table);
    let request = store.put(data);

    request.onsuccess = (event) => {
      this.onWriteEvent("success");
    };
    request.onerror = () => {
      this.onWriteEvent("error");
    };
  }
  public deleteData(key) {
    let trans = this.db.transaction(this.table, "readwrite");
    let store = trans.objectStore(this.table);
    let request = store.delete(key);
    request.onsuccess = (event) => {
      this.onWriteEvent("success");
    };
    request.onerror = () => {
      this.onWriteEvent("error");
    };
  }
}
