import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const normalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .normalize('NFD')              // Normaliza para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '')  // Remove acentos
    .replace(/[^\w\s]/gi, '')      // Remove caracteres especiais (ex: pontuação)
    .trim();
};

const getResposta = (pergunta) => {
  const texto = normalizarTexto(pergunta);

  if (/(^|\W)(oi|ola|olaa|eae|olaa|oie|oii)(\W|$)/.test(texto)) {
    return 'Oi! Como posso ajudar você hoje?';
  }

  if (/(^|\W)(como cadastrar tipo usuario|cadastro tipo usuario|adicionar usuario|cadstrar tipo usuario|cadastrar usuario|cadsatrar usuario|tipo usuario)(\W|$)/.test(texto)) {
    return 'Para cadastrar um tipo de usuário, acesse a tela "Cadastrar Tipo Usuário". Lá você poderá inserir as informações necessárias para criar um novo tipo.';
  }

  if (/(^|\W)(como cadastrar tipo evento|cadastro tipo evento|adicionar evento tipo|cadstrar tipo evento|cadsatrar tipo evento|tipo evento)(\W|$)/.test(texto)) {
    return 'Na tela "Cadastrar Tipo Evento", você pode adicionar novos tipos de evento preenchendo o formulário e salvando.';
  }

  if (/(^|\W)(como cadastrar evento|cadastro evento|adicionar evento|cadastrar um evento|cadstrar evento|cadsatrar evento|criar evento|registrar evento|novo evento)(\W|$)/.test(texto)) {
    return 'Use a tela "Cadastrar Evento" para inserir os detalhes do evento, selecionando o tipo e preenchendo os campos necessários.';
  }

  if (/(^|\W)(o que e a tela login|como funciona o login|tela login|login)(\W|$)/.test(texto)) {
    return 'A tela Login permite que o usuário acesse o sistema usando email e senha. Ela valida os dados, mostra alertas amigáveis e redireciona conforme o perfil do usuário.';
  }

  if (/(^|\W)(como ver eventos|listagem de eventos|eventos|tela eventos)(\W|$)/.test(texto)) {
    return 'Na tela "Listagem de Eventos", você pode visualizar todos os eventos cadastrados e realizar buscas ou filtros.';
  }

  if (/(^|\W)(ajuda|socorro|nao sei|erro|problema|problema tecnico|duvida)(\W|$)/.test(texto)) {
    return 'Se precisar de ajuda, me pergunte sobre qualquer tela ou função que eu vou te orientar!';
  }

  if (texto.length < 3) {
    return 'Por favor, digite uma pergunta maior para que eu possa ajudar.';
  }

  return 'Desculpe, não entendi sua pergunta. Pode tentar reformular ou perguntar sobre as telas do sistema.';
};

export default function ChatBot() {
  const [pergunta, setPergunta] = useState('');
  const [historico, setHistorico] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [animando, setAnimando] = useState(false);
  const containerRef = useRef(null);

  const fecharChat = () => {
    setAnimando(true);
    setTimeout(() => {
      setAberto(false);
      setAnimando(false);
      setHistorico([]);
      setPergunta('');
    }, 300);
  };

  const enviarPergunta = () => {
    if (!pergunta.trim()) return;
    const resposta = getResposta(pergunta);
    setHistorico((prev) => [...prev, { pergunta: pergunta.trim(), resposta }]);
    setPergunta('');
  };

  const aoDigitar = (e) => {
    setPergunta(e.target.value);
  };

  const aoPressionarEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarPergunta();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [historico]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        zIndex: 9999,
        maxWidth: 360,
      }}
    >
      {!aberto && (
        <button
          onClick={() => setAberto(true)}
          aria-label="Abrir chatbot"
          title="Abrir chatbot"
          style={{
            backgroundColor: '#30706f',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            color: 'white',
            fontSize: 28,
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(48,112,111,0.7)',
            transition: 'transform 0.3s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          💬
        </button>
      )}

      {aberto && (
        <div
          style={{
            width: '100%',
            height: 460,
            background: '#fff',
            border: '2px solid #30706f',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 0 12px rgba(48,112,111,0.5)',
            display: 'flex',
            flexDirection: 'column',
            opacity: animando ? 0 : 1,
            transform: animando ? 'scale(0.8)' : 'scale(1)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          ref={containerRef}
        >
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#30706f' }}>ChatEvent</h3>
            <button
              onClick={fecharChat}
              aria-label="Fechar chatbot"
              title="Fechar chatbot"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: 26,
                color: '#30706f',
                cursor: 'pointer',
                fontWeight: 'bold',
                lineHeight: 1,
                transition: 'transform 0.15s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              ×
            </button>
          </header>

          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingRight: 8,
              marginBottom: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {historico.length === 0 ? (
              <p
                style={{
                  color: '#888',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: 50,
                }}
              >
                Nenhuma pergunta feita ainda. Digite algo para começar!
              </p>
            ) : (
              historico.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '#30706f',
                      color: 'white',
                      borderRadius: '18px 18px 0 18px',
                      padding: '8px 14px',
                      maxWidth: '75%',
                      wordBreak: 'break-word',
                      fontSize: '0.95rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.pergunta}
                  </div>
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#f0f0f0',
                      color: '#333',
                      borderRadius: '18px 18px 18px 0',
                      padding: '10px 14px',
                      maxWidth: '75%',
                      wordBreak: 'break-word',
                      fontSize: '0.95rem',
                      lineHeight: 1.3,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {item.resposta}
                  </div>
                </div>
              ))
            )}
          </main>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviarPergunta();
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <textarea
              rows={1}
              value={pergunta}
              onChange={aoDigitar}
              onKeyDown={aoPressionarEnter}
              placeholder="Digite sua pergunta..."
              style={{
                flex: 1,
                resize: 'none',
                padding: 10,
                fontSize: '1rem',
                borderRadius: 8,
                border: '1.8px solid #30706f',
                outline: 'none',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                transition: 'border-color 0.3s ease',
              }}
            />
            <button
              type="submit"
              disabled={!pergunta.trim()}
              style={{
                backgroundColor: pergunta.trim() ? '#30706f' : '#a1b1b0',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                fontWeight: 'bold',
                cursor: pergunta.trim() ? 'pointer' : 'not-allowed',
                padding: '0 16px',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
              }}
            >
              Perguntar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
