import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'


import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/imagem2.png"

const CadastrarEvento = () => {
    const [evento, setEvento] = useState("");
    const [dataevento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstituicao] = useState("8DDA0EC2-3B39-47F5-82C6-1614092EF61B");
    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    const [listaEvento, setListaEvento] = useState([])
    const [excluirEvento, setExcluirEvento] = useState([])

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);

        }

    }


    async function listarEvento() {
        try {
            const resposta = await api.get("eventos")
            setListaEvento(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function removerEvento(id) {
        try {
            const excluirEvento = await api.delete(`eventos/${id.idEvento}`)
            setExcluirEvento(excluirEvento.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function cadastrarEvento(evt) {
        evt.preventDefault();
        if (evento.trim() !== "") {
            try {
                await api.post("eventos", { nomeEvento: evento, idTipoEvento: tipoevento, dataEvento: dataevento, descricao: descricao, idInstituicao: instituicao });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDataEvento();
                setDescricao("");
                setTipoEvento("");

            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")

        }
    }

    useEffect(() => {
        listarTipoEvento();
        listarEvento();
    }, [listaEvento]);

    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                titulo="Cadastrar Evento"
                imagem={Banner}
                place="Nome"

                funcCadastro={cadastrarEvento}

                valorInput={evento}
                setValorInput={setEvento}

                valorSelect={tipoevento}
                setValorSelect={setTipoEvento}

                valorSelect2={instituicao}
                setValorSelect2={setInstituicao}

                valorDate={dataevento}
                setValorDate={setDataEvento}

                valorText={descricao}
                setValorText={setDescricao}

                lista={listaTipoEvento}
            />
            <Lista
                titulo="Lista de Evento"
                tdnome="Nome Evento"
                tituloEvento="Nome"
                nomeEvento1="Titulo Evento"
                nomeEvento2="Titulo Evento"

                lista={listaEvento}
                deletar={removerEvento}
            />
            <Footer />
        </>
    )
}

export default CadastrarEvento;