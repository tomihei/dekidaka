
interface Change {
  change: Function;
}

interface ALineData {
  linename: string;
  partnum: string;
  cicletime: number;
}

interface DBLineData {
    _id: number;
    linename: string;
    partnum: string;
    cicletime: number;
}

interface LineTableData {
  data: ALineData[];
}

interface LineFormData {
  name: string;
  type: string;
  placeholder: string;
  checkValue: Function;
}
