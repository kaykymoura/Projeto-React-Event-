import React, { useState, useRef, useEffect } from "react";

const BotaoAcessibilidade = () => {
  const [painelAberto, setPainelAberto] = useState(false);
  const [reconhecimentoAtivo, setReconhecimentoAtivo] = useState(false);
  const [fonteGrande, setFonteGrande] = useState(false);
  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [modoLeituraAtivo, setModoLeituraAtivo] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.lang = "pt-BR";
      recognition.current.interimResults = false;
      recognition.current.maxAlternatives = 1;

      recognition.current.onresult = (event) => {
        const comando = event.results[0][0].transcript.toLowerCase();
        alert(`Você falou: ${comando}`);
      };

      recognition.current.onerror = (event) => {
        alert(`Erro no reconhecimento de voz: ${event.error}`);
        setReconhecimentoAtivo(false);
      };

      recognition.current.onend = () => {
        setReconhecimentoAtivo(false);
      };
    } else {
      console.warn("Seu navegador não suporta reconhecimento de voz.");
    }
  }, []);

  // Função para ativar/desativar reconhecimento de voz
  function toggleReconhecimento() {
    if (!recognition.current) {
      alert("Reconhecimento de voz não disponível nesse navegador.");
      return;
    }
    if (reconhecimentoAtivo) {
      recognition.current.stop();
      setReconhecimentoAtivo(false);
    } else {
      recognition.current.start();
      setReconhecimentoAtivo(true);
    }
  }

  // Função para aumentar/diminuir fonte
  function toggleFonte() {
    setFonteGrande((ativo) => {
      if (!ativo) {
        document.body.style.fontSize = "1.25rem"; // aumenta fonte
      } else {
        document.body.style.fontSize = ""; // volta ao padrão
      }
      return !ativo;
    });
  }

  // Função para alternar contraste alto (modo escuro + cores invertidas simples)
  function toggleContraste() {
    setContrasteAtivo((ativo) => {
      if (!ativo) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        document.body.style.backgroundColor = "#000";
      } else {
        document.body.style.filter = "";
        document.body.style.backgroundColor = "";
      }
      return !ativo;
    });
  }

  // Função para ativar/desativar modo leitura (exemplo)
  function toggleModoLeitura() {
    setModoLeituraAtivo((ativo) => {
      if (!ativo) {
        // esconder imagens e vídeos
        document.querySelectorAll("img, video").forEach((el) => {
          el.style.display = "none";
        });
      } else {
        // mostrar imagens e vídeos
        document.querySelectorAll("img, video").forEach((el) => {
          el.style.display = "";
        });
      }
      return !ativo;
    });
  }

  // Alterna o painel aberto/fechado
  function togglePainel() {
    setPainelAberto((aberto) => !aberto);
  }

  return (
    <div
      className="painel-acessibilidade"
      style={{
        position: "fixed",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        width: painelAberto ? 220 : 48,
        height: painelAberto ? 320 : 48,
        background: "linear-gradient(135deg, #b71c1c, #f44336)",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        boxShadow: "-3px 3px 10px rgba(0,0,0,0.25)",
        transition: "width 0.3s ease, height 0.3s ease",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: painelAberto ? "column" : "row",
        alignItems: "center",
        padding: painelAberto ? "16px" : "8px",
        zIndex: 9999,
        color: "white",
        userSelect: "none",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: "600",
      }}
      aria-label="Painel de acessibilidade"
    >
      {/* Botão Ícone Sempre Visível */}
      <button
        onClick={togglePainel}
        aria-expanded={painelAberto}
        aria-controls="conteudoAcessibilidade"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginRight: painelAberto ? 0 : 0,
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 0 3px black)",
          color: "white",
        }}
        title="Abrir painel de acessibilidade"
      >
        {/* Ícone de acessibilidade (bonequinho universal) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          aria-hidden="true"
        >
          <path d="M12 2a2 2 0 110 4 2 2 0 010-4zm-1 5v5H8l4 6 4-6h-3V7h-4z" />
        </svg>
      </button>

      {/* Conteúdo do painel que aparece quando aberto */}
      {painelAberto && (
        <div
          id="conteudoAcessibilidade"
          style={{
            marginTop: 16,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 14,
          }}
        >
          <button
            onClick={toggleReconhecimento}
            style={{
              backgroundColor: reconhecimentoAtivo ? "#f44336" : "#b71c1c",
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: reconhecimentoAtivo ? "0 0 8px #ff8a80" : "none",
              transition: "background-color 0.3s",
            }}
            aria-pressed={reconhecimentoAtivo}
            title="Ativar/Desativar reconhecimento de voz"
          >
            {reconhecimentoAtivo ? "Parar Voz" : "Ativar Voz"}
          </button>

          <button
            onClick={toggleFonte}
            style={{
              backgroundColor: fonteGrande ? "#f44336" : "#b71c1c",
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: fonteGrande ? "0 0 8px #ff8a80" : "none",
              transition: "background-color 0.3s",
            }}
            aria-pressed={fonteGrande}
            title="Aumentar / Diminuir tamanho da fonte"
          >
            {fonteGrande ? "Fonte Normal" : "Fonte Grande"}
          </button>

          <button
            onClick={toggleContraste}
            style={{
              backgroundColor: contrasteAtivo ? "#f44336" : "#b71c1c",
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: contrasteAtivo ? "0 0 8px #ff8a80" : "none",
              transition: "background-color 0.3s",
            }}
            aria-pressed={contrasteAtivo}
            title="Ativar / Desativar alto contraste"
          >
            {contrasteAtivo ? "Contraste Normal" : "Alto Contraste"}
          </button>

          {/* Novo botão para modo leitura */}
          <button
            onClick={toggleModoLeitura}
            style={{
              backgroundColor: modoLeituraAtivo ? "#f44336" : "#b71c1c",
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: modoLeituraAtivo ? "0 0 8px #ff8a80" : "none",
              transition: "background-color 0.3s",
            }}
            aria-pressed={modoLeituraAtivo}
            title="Ativar / Desativar modo leitura"
          >
            {modoLeituraAtivo ? "Modo Leitura OFF" : "Modo Leitura ON"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BotaoAcessibilidade;
