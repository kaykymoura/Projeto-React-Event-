import { useEffect, useState } from "react";
import api from "../../Services/services";

import "./ListagemEventos.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/comentario.png";
import Toggle from "../../components/toggle/Toggle";
import Detalhes from "../../assets/img/informacoes1.png";
import Modal from "../../components/modal/Modal";

import { format } from "date-fns";

const ListagemEventos = () => {
    const [listaEventos, setListarEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioId, setUsuarioId] = useState("4E200DDE-6A70-4FE2-BAAE-54180A14577C");

    async function listarEventos() {
        try {
            //pego os eventos em geral
            const eventoListado = await api.get("eventos");
            const todosOsEventos = eventoListado.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresenca.data

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    //as informacoes tanto de eventos quanto de eventos com presenca
                    ...atualEvento,//mantem os dados originais do evento atual
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListarEventos(eventosComPresencas);

            console.log(`informacoes de todos os eventos`);
            console.log(todosOsEventos);

            console.log(`informacoes de eventos com presenca`);
            console.log(minhasPresencas);

            console.log(`informacoes de todos os eventos com presenca`);
            console.log(eventosComPresencas);



        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEventos();
    }, []);

    function abrirModal(tipo, dados) {
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {

        console.log("ssssssssss");
        
        try {
            if (presenca && idPresenca != "") {
                //atualizacao: situacao para FALSE
            } else if (idPresenca != "") {
                //atualizacao: situacao para TRUE
            } else {
                //cadastrar uma nova presenca
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <Header nomeUsu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled selected>Todos os Eventos</option>
                        <option value="">op 1</option>
                        <option value="">op 2</option>
                        <option value="">op 3</option>
                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descricao</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEventos.map((item) => (
                            <tr className="item_evento" key={item.idEvento}>
                                <td data-cell="Nome">{item.nomeEvento}</td>
                                <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                <td data-cell="Tipo_Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                <td data-cell="Descricao">
                                    <button onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                        <img src={Detalhes} alt="Imagem de descricao" />
                                    </button>
                                </td>
                                <td data-cell="Comentar">
                                    <button onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}>
                                        <img src={Comentario} alt="Imagem de um comentario" />
                                    </button>
                                </td>
                                <td data-cell="Botao">
                                    <Toggle presenca={item.possuiPresenca}
                                     manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </section>
            <Footer />
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descricao do evento" : "Comentario"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}


                />
            )}
        </>
    );
};

export default ListagemEventos;
