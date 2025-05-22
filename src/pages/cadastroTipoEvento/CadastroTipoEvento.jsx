import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2'

import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/banner.png"

const CadastrartipoEvento = () => {
    const [tipoEvento, settipoEvento] = useState("");
    const [listatipoEvento, setListatipoEvento] = useState([])
    

    useEffect(() => {
        listartipoEvento();
    }, []);

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

    async function cadastrartipoEvento(e) {
        e.preventDefault();
        if (tipoEvento.trim() != "") {
            try {
                await api.post("tiposEventos", { titulotipoEvento: tipoEvento });
                alertar("success", "Cadastro realizado com sucesso!")
                settipoEvento("")
                listartipoEvento(); 
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte")
            }
        } else {
            alertar("error", "Preencha o campo vazio")
        }
    }

    async function listartipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListatipoEvento(resposta.data);
            console.log(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarTipoEvento(id) {
    const result = await Swal.fire({
        title: "Você tem certeza que quer excluir?",
        text: "Você não vai poder reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar isso!"
    });

    if (result.isConfirmed) {
        try {
            console.log("ID enviado para deletar:", id); 
            await api.delete(`tiposEventos/${id}`);
            alertar("success", "Deletado com sucesso!");
            listartipoEvento(); 
        } catch (error) {
            console.error("Erro ao deletar:", error.response || error);
            alertar("error", "Erro ao deletar.");
        }
    }
}



    async function editarEvento(tipoEvento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Edite seu tipo de evento",
            input: "text",
            inputLabel: "Novo Tipo de evento",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo nao pode estar vazio";
                }
            }
        });

        if (novoTipoEvento) {
            try {
                await api.put(`TiposEventos/${tipoEvento.idTipoEvento}`, { tituloTipoEvento: novoTipoEvento });
                Swal.fire(`O Tipo evento foi modificado para ${novoTipoEvento}`);
                listartipoEvento(); 
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                titulo="Cadastrar Tipo de Evento"
                visibilidade="none"
                imagem={Banner}
                place="Titulo"

                funcCadastro={cadastrartipoEvento}

                valorInput={tipoEvento}
                setValorInput={settipoEvento}
            />
            <Lista
                titulo="Lista Tipo de evento"
                tdnome="Nome Evento"
                tituloEvento="Titulo"

                lista={listatipoEvento}

                funcDeletar={deletarTipoEvento}
                funcEditar={editarEvento}
            />
            <Footer />
        </>
    )
}

export default CadastrartipoEvento;
