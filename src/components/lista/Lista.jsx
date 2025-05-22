import "./Lista.css"
import Editar from "../../assets/img/Editar.png"
import Excluir from "../../assets/img/Excluir.png"

const Lista = (props) => {
    return (
        <section className="listagem">
            <h1>{props.titulo}</h1>
            <hr />

            <div className="tabela">
                <thead>
                    <tr className="table_cabecalho">
                        <th>{props.tituloEvento}</th>
                        <th>{props.nomeEvento1}</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                {props.lista && props.lista.length > 0 ? (
                    props.lista.map((item) => (
                        <tbody>
                            <tr className="item_lista" key={props.tipoLista == "tiposEventos" ? item.idTipoEvento : item.idEvento}>
                                <td data-cell="Nome" >
                                    {item.tituloTipoEvento}
                                </td>
                                <td data-cell="Evento">{props.nomeEvento2}</td>
                                <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" onClick={() => {props.funcEditar(item)}} style={{ cursor: "pointer" }}/></td>
                                <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={() => props.deletar(item.idTipoEvento)} style={{ cursor: "pointer" }}/></td>
                            </tr>
                        </tbody>
                    ))
                ) :
                    (
                        <p>Nenhum Tipo de Evento Encontrado.</p>
                    )
                }
            </div>
        </section>
    )
}

export default Lista;