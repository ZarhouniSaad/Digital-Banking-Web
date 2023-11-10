export interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperations[];
}

export interface AccountOperations {
  id:            number;
  operationDate: Date;
  amount:         number;
  type:          string;
  description:   string;
}
