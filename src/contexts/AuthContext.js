// Importa funcoes do react necessarias para criar e usar contexto
import { createContext, useState, useContext } from "react";

//Criar o contexto de autenticacao, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

// Esse componente vai envolver a aplicacao (ou parte dela) e fornecer os dados de autenticacao para os filhos
//Provider = prover/dar
export const AuthProvider = ({ children }) => {
    //Cria um estado que guarda os dados do usuario logado
    const [usuario, setUsuario] = useState(null);

    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

//Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
//USAR!!!
export const useAuth = () => useContext(AuthContext);
