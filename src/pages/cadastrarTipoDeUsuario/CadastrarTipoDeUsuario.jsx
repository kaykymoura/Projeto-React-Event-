import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'


import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/imagem3.png"

const CadastrarTipoDeUsuario = () => {
    const [tipousuario, setTipoUsuario] = useState("");
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])
    // const [deletaTipoUsuario, setDeletaTiposUsuarios] = useState();

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

    async function cadastrarTipoUsuario(e) {
        e.preventDefault();
        if (tipousuario.trim() != "") {

            // try => tentar
            // catch => lança a exceção
            try {
                // cadastrar um genero: post
                await api.post("tiposusuarios", { tituloTipoUsuario: tipousuario });
                alertar("success", "Cadastro realizado com sucesso!")
                setTipoUsuario("")
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }

    }

    async function listarTipoUsuario() {
        try {
            //await => Aguarda uma resp da solicitação
            const resposta = await api.get("tiposUsuarios");

            // console.log(resposta);

            setListaTipoUsuario(resposta.data);
            console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function removerTipoUsuario(id) {
        try {
            const excluirTipoUsuario = await api.delete(`tiposUsuarios/${id.idTipoUsuario}`)
            setListaTipoUsuario(excluirTipoUsuario.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function editarTipoUsuario(tipousuario) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu Tipo de Usuario",
            input: "text",
            inputLabel: "Novo Tipo Evento",
            inputValue: tipousuario.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoUsuario) {
            try {
                api.put(`tiposUsuarios/${tipousuario.idTipoUsuario}`, { tituloTipoUsuario: novoTipoUsuario })
                Swal.fire(`O Tipo novo é ${novoTipoUsuario}`);
                listaTipoUsuario();
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])
    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                titulo="Cadastrar Tipo de Usuario"
                visibilidade="none"
                imagem={Banner}
                place="Titulo"

                funcCadastro={cadastrarTipoUsuario}

                valorInput={tipousuario}
                setValorInput={setTipoUsuario}

                data="none"
                desc="none"
                Inst="none"
            />
            <Lista
                titulo="Lista Tipo de Usuario"
                tdnome="Tipo de Usuario"
                tituloEvento="Titulo"
                visible="none"
                tipoLista="tiposUsuarios"

                lista={listaTipoUsuario}

                deletar={removerTipoUsuario}
                funcEditar={editarTipoUsuario}
            />
            <Footer />
        </>
    )
}

export default CadastrarTipoDeUsuario;