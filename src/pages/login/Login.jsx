import "./Login.css"
import Logo from "../../assets/img/logo1.svg";
import Logo_banner from "../../assets/img/undraw_login_re_4vu2\ 1.png";
import Botao from "../../components/botao/Botao";

const Login = () => {
    return (
        <main className="main_login">
            <div className="logo_banner">
                <img src={Logo_banner} alt="" />
            </div>
            <section className="section_login">
                <img src={Logo} alt="" />
                <form action="" className="form_login">
                    <div className="campos_login">
                        <div className="campo_input">
                            <input type="text" name="Usuario" placeholder="Username" />
                        </div>
                        <div className="campo_input">
                            <input type="password" name="senha" placeholder="Password" />
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