import {Usuario} from "./usuario";

export interface Habilidade {
  id: number,
  id_tipo_habilidade: number,
  nome: string,
  usuarios: Usuario[]
}
