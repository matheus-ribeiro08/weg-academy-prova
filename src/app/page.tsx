"use client";
import { useEffect, useMemo, useState,} from "react";
import CardCurso from "./components/CardCurso";

// PASSO HOME 3: Criar a interface 'CursoAPI' mapeando a estrutura de dados da API:
// id, nome, titulo, title, descricao, description, preco, price, categoria, category, imagem,imagemUrl, imageUrl

interface Curso {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem:string;
}
// Endpoint: https://dynamic-events-api.onrender.com/api/eventos"
export default function Home() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categoria, setCategoria] = useState("Cursos");

// PASSO HOME 8: Usar o 'useEffect' para consumir a API REST ao carregar a página
 useEffect(() => {
    fetch("https://dynamic-events-api.onrender.com/api/eventos")
      .then((res) => {
        // Verifica se a resposta da API foi realizada corretamente.
        if (!res.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        // Converte a resposta da API para JSON.
        return res.json();
      })
      .then((data: Curso[]) => {
        // Salva somente os 6 primeiros produtos no estado.
        setCursos(data);

        // Limpa qualquer mensagem de erro anterior.
        setErro(null);
      })
      .catch(() => {
        // Caso a API falhe, mostra uma mensagem para o usuário.
        setErro(erro);
      })
      .finally(() => {
        // Quando a requisição termina, remove o estado de carregamento.
        setCarregando(false);
      });
  }, []);

  const categorias = useMemo(() => {
    return Array.from(new Set(cursos.map((cursos) => cursos.categoria)));
  }, [cursos]);

  // Filtra os produtos conforme a pesquisa e a categoria escolhida.
  const cursosFiltrados = useMemo(() => {
    // Deixa a pesquisa em letras minúsculas e remove espaços extras.
    // Isso permite pesquisar sem depender de letras maiúsculas/minúsculas.
    const texto = busca;

    return cursos.filter((cursos) => {
      // Verifica se o texto pesquisado aparece no nome OU na descrição.
      const correspondePesquisa =
        cursos.nome.toLowerCase().includes(texto) ||
        cursos.descricao.toLowerCase().includes(texto);

      // Verifica se o produto pertence à categoria selecionada.
      // Se "todas" estiver selecionado, qualquer categoria é aceita.
      const correspondeCategoria =
      cursos.categoria === categoria;

      // O produto só aparece se passar nos dois filtros.
      return correspondeCategoria && correspondePesquisa;
    });
  }, [cursos, busca, categoria]);
  // Filtrar a lista 'cursos' para verificar se o título ou a descrição contêm o texto digitado navariável 'busca'
  const limparBuscar =()=> {
    setBusca("");
  }
  return (
    <main className="p-8">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center
sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">Catálogo de Cursos</h1>
            <p className="mt-1 text-sm text-slate-500">
              Treinamentos e capacitações técnicas exclusivas
            </p>
          </div>
          {/* CAMPO DE BUSCA */}
          <div className="relative w-full sm:w-72">
            {/* PASSO HOME 10: Vincular a variável de estado 'busca' ao valor do input e
atualizar com onChange */}
            <input
              id="busca"
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar curso..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {/* PASSO HOME 11: Renderizar o botão de limpar campo apenas quando houver algo digitado na busca  */}
            <button
            onClick={limparBuscar}
            disabled={busca === null}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400
hover:text-slate-600">
              ✕
            </button>
          </div>

        </section>
        {/* MENSAGEM DE ERRO */}
        {erro && (
          <p className="text-center text-red-400 py-10">{erro}</p>
        )}
        {/* MENSAGEM DE CARREGAMENTO */}
        {carregando && (
          <p className="text-center text-slate-400 py-10">Carregando cursos...</p>
        )}
        {/* GRID DE CURSOS */}
        {/* PASSO HOME 14: Caso 'carregando' seja false e existam itens, utilizar o método
.map() na lista filtrada */}
        {/* PASSO HOME 15: Retornar o componente <CardCurso /> passando as props (id,
title, description, category, price, image) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Exemplo de onde o map() irá renderizar os cards */}
          {cursosFiltrados.map((cursos)=>(
            <CardCurso
            key={cursos.id}
            id={cursos.id}
            title={cursos.nome}
            description={cursos.descricao}
            price={cursos.preco}
            category={cursos.categoria}
            image={cursos.imagem}
            />
          ))}
        </div>
      </div>
    </main>
  );
}