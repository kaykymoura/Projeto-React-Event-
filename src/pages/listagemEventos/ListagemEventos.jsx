import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

import "./ListagemEventos.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/comentario.png";
import Toggle from "../../components/toggle/Toggle";
import Detalhes from "../../assets/img/informacoes1.png";
import Modal from "../../components/modal/Modal";

import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";

const ListagemEventos = () => {
    const [listaEventos, setListarEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const { usuario } = useAuth();

    const [filtroData, setFiltroData] = useState("todos");

    function alertar(icone, mensagem) {
        Swal.fire({
            title: mensagem,
            icon: icone
        });
    }

    async function listarEventos() {
        if (!usuario || !usuario.idUsuario) return;

        try {
            // Pega os eventos em geral
            const eventoListado = await api.get("eventos");
            const todosOsEventos = eventoListado.data;

            // Pega presenças do usuário
            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario);
            const minhasPresencas = respostaPresenca.data;

            // Junta eventos com a informação de presença
            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                };
            });

            setListarEventos(eventosComPresencas);

            console.log("informacoes de todos os eventos", todosOsEventos);
            console.log("informacoes de eventos com presenca", minhasPresencas);
            console.log("informacoes de todos os eventos com presenca", eventosComPresencas);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (usuario && usuario.idUsuario) {
            listarEventos();
        }
    }, [usuario]);

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
        try {
            if (presenca && idPresenca !== null) {
                // Atualiza situação para FALSE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presenca foi removida.', 'success');
            } else if (idPresenca !== null) {
                // Atualiza situação para TRUE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            } else {
                // Cadastra nova presença
                await api.post("PresencasEventos", { situacao: true, idUsuario: usuario.idUsuario, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            }
            listarEventos();
        } catch (error) {
            console.log(error);
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData === "todos") return true;
            if (filtroData === "futuros" && dataEvento > hoje) return true;
            if (filtroData === "passados" && dataEvento < hoje) return true;

            return false;
        });
    }

    return (
        <>
            <Header nomeUsu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select
                        onChange={(e) => setFiltroData(e.target.value)}
                        value={filtroData}
                        name="Todos os Eventos"
                        className="select_evento"
                    >
                        <option value="todos">Todos os Eventos</option>
                        <option value="futuros">Somente futuros</option>
                        <option value="passados">Somente passados</option>
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
                        {filtrarEventos().map((item) => (
                            <tr className="item_evento" key={item.idEvento}>
                                <td data-cell="Nome">{item.nomeEvento}</td>
                                <td data-cell="Data">{format(new Date(item.dataEvento), "dd/MM/yy")}</td>
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
                                    <Toggle
                                        presenca={item.possuiPresenca}
                                        manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </section>
            <Footer />
            {modalAberto && (
                <Modal 
                    
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}
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
