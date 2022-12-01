import {Usuario} from "./usuario";

export interface Mensagem {
  autor: Usuario,
  data: string,
  conteudo: string,
  id: number
}
