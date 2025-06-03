import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

import "./ListagemEventos.css"
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/comentario.png"
import Toggle from "../../components/toggle/Toggle";
import Detalhes from "../../assets/img/informacoes1.png"


const ListagemEventos = () => {

    const [listaEventos, setListarEventos] = useState([])

    // hooks (ex: listaEventos)
    //    funcao para listar os eventos

    async function listarEventos() {
        try {
            const eventoListado = await api.get("eventos");

            setListarEventos(eventoListado.data);
            console.log(eventoListado.data);

            
        } catch (error) {
            console.log(error);
            
        }
    }
    
    
    useEffect(() => {
        listarEventos();
    }, [])
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
                        <option value=""> op 3</option>
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
              <tr className="item_evento">
                            <td data-cell="Nome" >{item.nomeEvento}</td>
                            <td data-cell="Data">{item.dataEvento}</td>
                            <td data-cell="Tipo_Evento">{item.tiposEvento.tituloTipoEvento}</td>
                            <td data-cell="Descricao"><img src={Detalhes} alt="Imagem de descricao" /></td>
                            <td data-cell="Comentar"><img src={Comentario} alt="Imagem de um comentario" /></td>
                            <td data-cell="Botao"><Toggle /></td>
                        </tr>

        )  )}
                    </tbody>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default ListagemEventos;