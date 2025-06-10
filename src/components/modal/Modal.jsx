import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css"; // Verifique se o nome do arquivo CSS é 'Modal.css' ou 'Model.css'
import api from "../../Services/services";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  // Usuário fixo **por hora** - igual ao código da professora
  const [usuarioId, setUsuarioId] = useState(
    "4E200DDE-6A70-4FE2-BAAE-54180A14577C"
  );

  async function listarComentarios() {
    try {
      const resposta = await api.get(
        `ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`
      );
      setComentarios(resposta.data);
    } catch (error) {
      console.log(error); // Mantido console.log como no seu código original e no da prof
    }
  }

  // O useEffect garante que os comentários sejam listados quando o componente é montado
  // A dependência props.idEvento foi adicionada para garantir recarregamento se o ID do evento mudar.
  useEffect(() => {
    listarComentarios();
  }, [props.idEvento]);

  async function cadastrarComentario() {
    try {
      await api.post("ComentariosEventos", {
        idUsuario: usuarioId,
        idEvento: props.idEvento,
        descricao: novoComentario,
      });
      // Limpa o campo de input após cadastrar (comportamento da prof)
      setNovoComentario("");
      // Atualiza a lista de comentários após o cadastro (comportamento da prof)
      listarComentarios();
    } catch (error) {
      console.log(error); // Mantido console.log
    }
  }

  // Renomeada para seguir a consistência da professora (excluirComentario)
  async function excluirComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`);
      // Atualiza a lista de comentários após a exclusão (comportamento da prof)
      listarComentarios();
    } catch (error) {
      console.log(error); // Mantido console.log
    }
  }

  return (
    <>
      <div className="model-overlay" onClick={props.fecharModal}></div>
      <div className="model">
        <h1>{props.titulo}</h1>
        <div className="model_conteudo">
          {props.tipoModel === "descricaoEvento" ? (
            <p>{props.descricao}</p>
          ) : (
            <>
              {comentarios.map((item) => (
                <div key={item.idComentarioEvento}>
                  <strong>{item.usuario.nomeUsuario}</strong>
                  {/* O código da professora não verifica se o usuário é o autor para exibir o botão.
                      Portanto, seguindo a restrição "sem coisas novas", ele aparece para todos.
                      Se a regra for que "o botão de lixeira aparece para todos, mas só o dono pode deletar",
                      este é o comportamento.
                      Se a regra for "só o dono vê o botão", a linha de verificação com `usuarioId` seria necessária.
                      Mantido o comportamento de exibir sempre, conforme seu código original e a ausência de
                      lógica de comparação de usuário no código da professora que você enviou.
                   */}
                  <img
                    src={ImgDeletar}
                    alt="Deletar"
                    onClick={() => excluirComentario(item.idComentarioEvento)}
                    style={{ cursor: "pointer" }} // Apenas para indicar que é clicável
                  />
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input
                  type="text"
                  placeholder="Escreva seu comentario..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                />
                <button onClick={cadastrarComentario}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;