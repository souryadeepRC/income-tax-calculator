import { ID } from "appwrite";
const mockIncomes = [
  { $id: ID.unique(), category: "BASIC", amount: 500000, group: "salary" },
  { $id: ID.unique(), category: "HRA", amount: 100000, group: "salary" },
  { $id: ID.unique(), category: "Business", amount: 100000, group: "extra" },
  {
    $id: ID.unique(),
    category: "Miscellaneous",
    amount: 100000,
    group: "salary",
  },
  ...Array(10)
    .fill("i")
    .map((id, index) => ({
      $id: ID.unique(),
      category: "Miscellaneous",
      amount: 100000,
      group: "salary",
    })),
];
const mockDeductions = [
  ...Array(10)
    .fill("i")
    .map((id, index) => ({
      $id: ID.unique(),
      type: "Rent",
      amount: 10000 * (index + 1),
      category: "Metro",
      duration: 1,
    })),
  {
    $id: ID.unique(),
    type: "Rent",
    amount: 5000,
    category: "Non-Metro",
    duration: 2,
  },
  { $id: ID.unique(), type: "Section24", amount: 150000 },
  { $id: ID.unique(), type: "80C", amount: 5000, category: "providentFund" },
  {
    $id: ID.unique(),
    type: "Chapter6A",
    amount: 75000,
    category: "medicalInsuranceParent",
  },
  {
    $id: ID.unique(),
    type: "Others",
    amount: 75000,
    category: "Professional Tax",
  },
];
type DocumentType = "income" | "deduction";

class DBService {
  constructor() {}

  async createDetails(_type: DocumentType, data: object) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ $id: ID.unique(), ...data }), 1000)
    );
  }
  async getAllDetails(type: DocumentType) {
    return new Promise((resolve) =>
      setTimeout(() => {
        if (type === "income") {
          resolve({ documents: mockIncomes, total: mockIncomes.length });
        }
        resolve({ documents: mockDeductions, total: mockDeductions.length });
      }, 1000)
    );
  }
  async updateDetails(_type: DocumentType, data: object & { id: string }) {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ $id: data.id, ...data }), 1000)
    );
  }
  async storeDetails(type: DocumentType, data: any) {
    if (data?.id) {
      return this.updateDetails(type, data);
    }
    return this.createDetails(type, data);
  }
  async deleteDetails(_type: DocumentType, _documentId: string) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
const dbService = new DBService();
export default dbService;
