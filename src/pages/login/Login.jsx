import "./Login.css"
import 'animate.css';
import secureLocalStorage from "react-secure-storage";
import Swal from 'sweetalert2';
import Logo from "../../assets/img/logo1.svg";
import Logo_banner from "../../assets/img/undraw_login_re_4vu2\ 1.png";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services"
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const { setUsuario } = useAuth()

    function mostrarAlerta({ titulo, mensagem, corPrimaria, corSecundaria, textoBotao }) {
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
            confirmButtonText: textoBotao,
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


    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = { email, senha };

        if (senha.trim() !== "" && email.trim() !== "") {
            try {
                const resposta = await api.post("Login", usuario);
                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);

                    setUsuario(tokenDecodificado);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));


                                await Swal.fire({
                                    title: `
                    <span style="
                        background: linear-gradient(90deg, #00c851, #007e33);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 700;
                        font-size: 2.3rem;
                        text-shadow: 1px 1px 6px #007e3388;
                        display: inline-block;
                        animation: pulseGlow 2s infinite alternate;
                    ">
                        Login realizado!
                    </span>
                    `,
                                    html: `
                    <p style="
                        font-family: 'Poppins', sans-serif;
                        font-size: 1.15rem;
                        color: #007e33cc;
                        text-align: center;
                        margin-top: 1rem;
                        text-shadow: 0 0 2px #00c851aa;
                    ">
                        Você foi autenticado com sucesso.<br>Redirecionando...
                    </p>
                    <svg width="90" height="90" viewBox="0 0 64 64" fill="none" style="margin: 1.2rem auto; display: block; animation: floatUpDown 3s ease-in-out infinite;">
                        <circle cx="32" cy="32" r="30" stroke="#00c851" stroke-width="3" />
                        <path d="M20 32L28 40L44 24" stroke="#007e33" stroke-width="4" stroke-linecap="round" />
                    </svg>
                    `,
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    backdrop: `
                    rgba(0,0,0,0.2)
                    center center
                    no-repeat
                    `,
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                    willClose: () => {
                                        if (tokenDecodificado.tipoUsuario === "Aluno") {
                                            navigate("/ListagemEventos");
                                        } else {
                                            navigate("/CadastrarEvento");
                                        }
                                    },
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
            } catch (error) {
                console.log(error);
                mostrarAlerta({
                    titulo: "Credenciais inválidas",
                    mensagem: "Email ou senha estão incorretos.<br>Verifique seus dados e tente novamente.",
                    corPrimaria: "#e52d27",
                    corSecundaria: "#b31217",
                    textoBotao: "Tentar novamente"
                });
            }
        } else {
            mostrarAlerta({
                titulo: "Campos incompletos!",
                mensagem: "Por favor, preencha <strong>email</strong> e <strong>senha</strong> para continuar.",
                corPrimaria: "#8e2de2",
                corSecundaria: "#4a00e0",
                textoBotao: "Vou corrigir já!"
            });
        }
    }


    return (
        <main className="main_login">
            <div className="logo_banner">
                <img src={Logo_banner} alt="" />
            </div>
            <section className="section_login">
                <img src={Logo} alt="" />
                <form action="" className="form_login" onSubmit={realizarAutenticacao}>
                    <div className="campos_login">
                        <div className="campo_input">
                            <input type="text" name="Usuario"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="campo_input">
                            <input type="password" name="senha"
                                placeholder="Password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>
                    <a href="">Esqueceu sua senha?</a>
                    <Botao nomeBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;