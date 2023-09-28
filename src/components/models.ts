export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface User {
  name: string;
  senha: string;
  codigoUsuario: number;
  grupo: number;
  filial: number;
  isLoging: boolean;
}
