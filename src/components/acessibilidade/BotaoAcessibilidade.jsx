import React, { useState, useRef, useEffect } from "react";

const BotaoAcessibilidade = () => {
  const [painelAberto, setPainelAberto] = useState(false);
  const [reconhecimentoAtivo, setReconhecimentoAtivo] = useState(false);
  const [fonteGrande, setFonteGrande] = useState(false);
  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [modoLeituraAtivo, setModoLeituraAtivo] = useState(false);
  const recognition = useRef(null);

  // Função para falar texto
  function falar(texto) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    window.speechSynthesis.cancel(); // cancela fala anterior se houver
    window.speechSynthesis.speak(utterance);
  }

  // Inicia reconhecimento de voz
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
        falar(`Você falou: ${comando}`);
      };

      recognition.current.onerror = (event) => {
        alert(`Erro no reconhecimento de voz: ${event.error}`);
        falar(`Erro no reconhecimento de voz`);
        setReconhecimentoAtivo(false);
      };

      recognition.current.onend = () => {
        setReconhecimentoAtivo(false);
        falar("Reconhecimento de voz finalizado");
      };
    } else {
      console.warn("Seu navegador não suporta reconhecimento de voz.");
      falar("Seu navegador não suporta reconhecimento de voz");
    }
  }, []);

  // Ativar/desativar reconhecimento de voz
  function toggleReconhecimento() {
    if (!recognition.current) {
      alert("Reconhecimento de voz não disponível nesse navegador.");
      falar("Reconhecimento de voz não disponível nesse navegador");
      return;
    }

    if (reconhecimentoAtivo) {
      recognition.current.stop();
      setReconhecimentoAtivo(false);
      falar("Reconhecimento de voz desativado");
    } else {
      try {
        recognition.current.start();
        setReconhecimentoAtivo(true);
        falar("Reconhecimento de voz ativado");
      } catch (error) {
        console.warn("Erro ao iniciar reconhecimento de voz:", error);
        falar("Erro ao iniciar reconhecimento de voz");
      }
    }
  }

  function toggleFonte() {
    setFonteGrande((ativo) => {
      if (!ativo) {
        document.body.style.fontSize = "1.25rem";
        falar("Fonte grande ativada");
      } else {
        document.body.style.fontSize = "";
        falar("Fonte normal ativada");
      }
      return !ativo;
    });
  }

  function toggleContraste() {
    setContrasteAtivo((ativo) => {
      if (!ativo) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        document.body.style.backgroundColor = "#000";
        falar("Alto contraste ativado");
      } else {
        document.body.style.filter = "";
        document.body.style.backgroundColor = "";
        falar("Contraste normal ativado");
      }
      return !ativo;
    });
  }

  function toggleModoLeitura() {
    setModoLeituraAtivo((ativo) => {
      if (!ativo) {
        document.querySelectorAll("img, video").forEach((el) => {
          el.style.display = "none";
        });
        falar("Modo leitura ativado");
      } else {
        document.querySelectorAll("img, video").forEach((el) => {
          el.style.display = "";
        });
        falar("Modo leitura desativado");
      }
      return !ativo;
    });
  }

  function togglePainel() {
    setPainelAberto((aberto) => {
      falar(aberto ? "Fechando painel de acessibilidade" : "Abrindo painel de acessibilidade");
      return !aberto;
    });
  }

  // ⚠️ FALA O TEXTO SELECIONADO
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const texto = selection?.toString().trim();
      if (texto && texto.length > 1) {
        falar(texto);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const corPrincipal = "#30706F";
  const corAtivo = "#469F9E";
  const sombraAtivo = "#88c9c8";

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
        background: `linear-gradient(135deg, ${corPrincipal}, ${corAtivo})`,
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
              backgroundColor: reconhecimentoAtivo ? corAtivo : corPrincipal,
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: reconhecimentoAtivo ? `0 0 8px ${sombraAtivo}` : "none",
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
              backgroundColor: fonteGrande ? corAtivo : corPrincipal,
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: fonteGrande ? `0 0 8px ${sombraAtivo}` : "none",
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
              backgroundColor: contrasteAtivo ? corAtivo : corPrincipal,
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: contrasteAtivo ? `0 0 8px ${sombraAtivo}` : "none",
              transition: "background-color 0.3s",
            }}
            aria-pressed={contrasteAtivo}
            title="Ativar / Desativar alto contraste"
          >
            {contrasteAtivo ? "Contraste Normal" : "Alto Contraste"}
          </button>

          <button
            onClick={toggleModoLeitura}
            style={{
              backgroundColor: modoLeituraAtivo ? corAtivo : corPrincipal,
              border: "none",
              borderRadius: 8,
              color: "white",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: modoLeituraAtivo ? `0 0 8px ${sombraAtivo}` : "none",
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
