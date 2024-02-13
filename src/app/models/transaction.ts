export enum TransactionType {
  INCOME = "income", 
  EXPENSE = "expense"
}
export interface Transaction {
  id: string;
  name: string
  amount: number
  type: TransactionType
}
