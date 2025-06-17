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

    function alertar(tipo, mensagem) {
    const cores = {
        success: { corPrimaria: "#4CAF50", corSecundaria: "#81C784", titulo: "Sucesso" },
        error: { corPrimaria: "#F44336", corSecundaria: "#E57373", titulo: "Erro" },
    };

    const { corPrimaria, corSecundaria, titulo } = cores[tipo] || {};

    Swal.fire({
        title: `
            <span style="
                background: linear-gradient(90deg, ${corPrimaria}, ${corSecundaria});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: 700;
                font-size: 2.3rem;
                text-shadow: 1px 1px 6px ${corSecundaria}88;
                display: inline-block;
                animation: pulseGlow 2s infinite alternate;
            ">
                ${titulo}
            </span>
        `,
        html: `
            <p style="
                font-family: 'Poppins', sans-serif;
                font-size: 1.15rem;
                color: ${corSecundaria}cc;
                text-align: center;
                margin-top: 1rem;
                text-shadow: 0 0 2px ${corPrimaria}aa;
            ">
                ${mensagem}
            </p>
            <svg width="90" height="90" viewBox="0 0 64 64" fill="none" style="margin: 1.2rem auto; display: block; animation: floatUpDown 3s ease-in-out infinite;">
                <circle cx="32" cy="32" r="30" stroke="${corPrimaria}" stroke-width="3" />
                <path d="M20 24L44 40M44 24L20 40" stroke="${corSecundaria}" stroke-width="4" stroke-linecap="round" />
            </svg>
        `,
        background: 'rgba(255, 255, 255, 0.25)',
        backdrop: `
            rgba(0,0,0,0.4)
            url("https://cdn.pixabay.com/photo/2017/08/30/01/05/particles-2699971_1280.png")
            center center
            no-repeat
        `,
        confirmButtonText: 'OK',
        confirmButtonColor: corPrimaria,
        customClass: {
            popup: 'glassmorphic-popup'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
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
               alertar("success", "Tudo certo! O tipo de usuário foi cadastrado com sucesso. 🚀");
                setTipoUsuario("")
                listarTipoUsuario();
            } catch (error) {
               alertar("error", "Opa! Você esqueceu de preencher o campo. Dá uma olhadinha nisso. 😉");
            }
        } else {
            alertar("error", "Algo deu errado... Tente novamente ou chame o suporte. 💬");
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
            alertar("success", "Removido com estilo! O tipo de usuário foi excluído. 🗂️");
            listarTipoUsuario();

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