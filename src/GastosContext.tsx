import { createContext, ReactNode, useContext, useState } from 'react';

type Gasto = {
  id: string;
  descricao: string;
  valor: number;
};

type GastosContextType = {
  gastos: Gasto[];
  adicionarGasto: (descricao: string, valor: number) => void;
  excluirGasto: (id: string) => void;
};

const GastosContext = createContext<GastosContextType>({} as GastosContextType);

type Props = {
  children: ReactNode;
};

export function GastosProvider({ children }: Props) {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  function adicionarGasto(descricao: string, valor: number) {
    const novoGasto: Gasto = {
      id: String(Date.now()),
      descricao,
      valor,
    };

    setGastos((listaAtual) => [...listaAtual, novoGasto]);
  }

  function excluirGasto(id: string) {
    setGastos((listaAtual) => listaAtual.filter((gasto) => gasto.id !== id));
  }

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto, excluirGasto }}>
      {children}
    </GastosContext.Provider>
  );
}

export function useGastos() {
  return useContext(GastosContext);
}
