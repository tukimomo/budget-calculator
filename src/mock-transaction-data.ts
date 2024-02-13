import { Transaction, TransactionType } from "./app/models/transaction";
import {v4 as uuidv4} from 'uuid';

export const mockTransactions: Transaction[] =
    [
        {
            id: uuidv4(),
            name: "Salary 1",
            amount: 1000,
            type: TransactionType.INCOME
        },
        {
            id: uuidv4(),
            name: "Salary 2",
            amount: 2000,
            type: TransactionType.INCOME
        },
        {
            id: uuidv4(),
            name: "Rental",
            amount: 1000,
            type: TransactionType.EXPENSE
        },
        {
            id: uuidv4(),
            name: "Electricity",
            amount: 50,
            type: TransactionType.EXPENSE
        },
        {
            id: uuidv4(),
            name: "Shopping",
            amount: 500,
            type: TransactionType.EXPENSE
        }
    ]