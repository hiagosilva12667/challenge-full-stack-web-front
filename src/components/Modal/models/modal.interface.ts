export interface IModal {
  textContent?: string;
  titleModal?: string;
  cancelBtn?: string;
  deleteBtn?: string;
  show?: boolean;
  item?: IStudentItem;
}

export interface IStudentItem {
  name?: string;
  cpf?: string;
  academicRegister?: string;
  actions?: any;
}
