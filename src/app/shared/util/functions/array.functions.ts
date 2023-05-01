export class ArrayFunctions {

  public static removeFromArrayForIndex(index: number, array: any) {
    const keyIndex = array.indexOf(index, 0);
    if (keyIndex > -1) {
      array.splice(keyIndex, 1);
    }
  }

  public static removeFromArrayForElement(element: any, array: any) {
    const keyIndex = array.indexOf(element, 0);
    if (keyIndex > -1) {
      array.splice(keyIndex, 1);
    }
  }
}
