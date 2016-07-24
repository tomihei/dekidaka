
export class IndexDB {
  public onWriteEvent: Function;
  public onReadEvent: Function;
  public request;
  public db: IDBDatabase = null;
  constructor() {
    this.request = indexedDB.open("dekidata");
    this.connect();
  }
  public connect() {
    // 接続成功（初回 or DBのバージョンが変わったとき）
    this.request.onupgradeneeded = (event) => {
        this.db = (<IDBRequest>event.target).result;
        // オブジェクトストア作成（インデックスのキーとして'isbn'を指定）
        let store = this.db.createObjectStore("lineinfo", { keyPath: "linename" });
        // インデックスの作成
        store.createIndex("linename", "linename", {unique: false});
    };
    // 接続成功（すでにDBが存在する場合）
    this.request.onsuccess = (event) => {
        this.db = (<IDBRequest>event.target).result;
    };
    this.request.onerror = (event) => {
        console.log(event.message);
    };
  }
  public getAllData(target) {
    let trans = this.db.transaction(target, "readonly");
    let store = trans.objectStore(target);

    let request = store.openCursor();

    request.onsuccess = (event) => {
      let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result;
      if (cursor) {
        this.readsuccess(cursor.value);
        cursor.continue();
      }
    };
  }
  public readsuccess(data) {
    this.onReadEvent("success", data);
  }
  public readerror() {
    this.onReadEvent("error");
  }
  public writesuccess() {
    this.onWriteEvent("success");
  }
  public writeerror() {
    this.onWriteEvent("error");
  }
}
export class LineData extends IndexDB {
  constructor() {
    super();
  }
  public addData(data) {
    let trans = this.db.transaction("lineinfo", "readwrite");
    let store = trans.objectStore("lineinfo");
    let request = store.put(data);

    request.onsuccess = (event) => {
      this.writesuccess();
    };
    request.onerror = () => {
      this.writeerror();
    };
  }
}
