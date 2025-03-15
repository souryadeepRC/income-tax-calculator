type DeductionType = "Rent" | "Section24" | "80C" | "Chapter6A";
interface DeductionResponse {
  id: string;
  type: DeductionType;
  amount: number;
  maxLimit: number;
  category: string;
  duration: number;
}
const mapDeductions = (deductions: DeductionResponse[]) => {
  deductions.reduce((acc:any, option) => {
    const { type } = option;

    acc = {
      ...acc,
      [type]:  acc[type]
    };
    return option;
  }, {});
};
