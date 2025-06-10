import "./Lista.css"
import Editar from "../../assets/img/Editar.png"
import Detalhes from "../../assets/img/informacoes1.png"
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
                        <th style={{ display: props.visible }}>Data Evento</th>
                        
                        <th>Editar</th>
                        <th>Excluir</th>
                        <th style={{ display: props.visible }}>Descrição</th>
                    </tr>
                </thead>
                {props.lista && props.lista.length > 0 ? (
                    props.lista.map((item) => (
                        <tbody>
                            <tr className="item_lista" key={props.tipoLista == "tiposEventos" ? item.idTipoEvento : (props.tipoLista == "tiposUsuarios" ? item.idTipoUsuario: item.idEvento)}>
                                <td data-cell="Nome" >
                                    {props.tipoLista == "tiposEventos" ? item.tituloTipoEvento : (props.tipoLista == "tiposUsuarios" ? item.tituloTipoUsuario: item.nomeEvento)}
                                </td>
                                <td style={{ display: props.visible }} data-cell="Data">
                                    {item.dataEvento}
                                </td>
                                <td style={{ display: props.visible }} data-cell="Evento">{item.tiposEvento?.tituloTipoEvento}</td>
                                <td data-cell="Editar">
                                    <img src={Editar} 
                                    alt="Imagem de uma caneta"
                                     onClick={() => { props.funcEditar(item) }} 
                                     style={{ cursor: "pointer" }} /></td>
                                <td data-cell="Excluir">
                                    <img
                                        src={Excluir}
                                        alt="Lixeira"
                                        onClick={() => (props.deletar(item))}
                                        style={{ cursor: "pointer" }}
                                    />
                                </td>
                                <td style={{ display: props.visible }} data-cell="Descrição">
                                    <img 
                                    src={Detalhes}
                                     alt="Detalhes" 
                                     onClick={() => (props.descricao(item))}
                                        style={{ cursor: "pointer" }}/>
                                </td>
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