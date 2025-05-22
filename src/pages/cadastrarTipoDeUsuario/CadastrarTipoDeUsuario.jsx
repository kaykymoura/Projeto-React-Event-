import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/imagem3.png"


const CadastrarTipoDeUsuario = () => {
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [listaTipoUsuario, setListatipoUsuario] = useState([]); 

    useEffect(() => {
        listarTipoUsuario(); 
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
    
    async function CadastrarTipoUsuario(e) {
        e.preventDefault();
        if (tipoUsuario.trim() !== "") {
            try {
                await api.post("tiposUsuarios", { tituloTipoUsuario: tipoUsuario });
                alertar("success", "Cadastro realizado com sucesso!");
                setTipoUsuario("");
                listarTipoUsuario(); // recarrega a lista após cadastrar
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte");
            }
        } else {
            alertar("error", "Preencha o campo vazio");
        }
    }
    
    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("tiposUsuarios");
            setListatipoUsuario(resposta.data);
            console.log(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarTipoUsuario(id) {
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
            await api.delete(`tiposUsuarios/${id}`);
            alertar("success", "Deletado com sucesso!");
            listaTipoUsuario();
        } catch (error) {
            console.error("Erro ao deletar:", error.response  || error);
             alertar("error", "Erro ao deletar.");
        }
    }
    
    }
    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                titulo="Cadastrar Tipo de Usuario"
                visibilidade="none"
                imagem={Banner}
                place="Titulo"
                funcCadastro={CadastrarTipoUsuario}
                valorInput={tipoUsuario}
                setValorInput={setTipoUsuario}
            />
            <Lista
                titulo="Lista Tipo de Usuario"
                tdnome="Tipo de Usuario"
                tituloUsuario="Titulo"
                
                lista={listaTipoUsuario} 

                funcDeletar={deletarTipoUsuario}
                
            />
            <Footer />
        </>
    );
}

export default CadastrarTipoDeUsuario;
