import {Usuario} from "./usuario";
import {Habilidade} from "./habilidade";
import {TipoServico} from "./tipo-servico";

export interface Servico {
  link_imagem: string,
  contribuinte: Usuario,
  descricao: string,
  habilidades: Habilidade[],
  id: number,
  remoto: boolean,
  requisitor: Usuario,
  tipos_servico: TipoServico[],
  titulo: string
}
