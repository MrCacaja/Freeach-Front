import {Usuario} from "./usuario";
import {Mensagem} from "./mensagem";

export interface Chat {
  participantes: Usuario[],
  id: number,
  mensagens: Mensagem[]
}
