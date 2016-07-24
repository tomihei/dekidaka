
interface Change {
  change: Function;
}

interface ALineData {
  linename: string;
  partnum: string;
  cicletime: number;
}

interface LineFormData {
  name: string;
  type: string;
  placeholder: string;
  checkValue: Function;
}
