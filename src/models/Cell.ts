export class Cell {
  constructor(
    public x: number,
    public y: number,
    public userValue: number | null,
    public trueValue: number,
    public isDefault: boolean
  ) {}

  public pencilValues: Array<number | null> = Array(9).fill(null);
  //   [
  //   1,
  //   2,
  //   3,
  //   null,
  //   5,
  //   null,
  //   null,
  //   8,
  //   9,
  // ];

  public isValid(): boolean {
    if (this.userValue && this.userValue === this.trueValue) {
      return true;
    }
    return false;
  }
}
