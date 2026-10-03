
import Image from "next/image";
import Link from "next/link";

interface Curso {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    local: string;
    imagem:string;
}
interface CursoProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function DetalhesCurso({ params }: CursoProps) {
    const { id } = await params;

    const resposta = await fetch(`https://dynamic-events-api.onrender.com/api/eventos/${id}`, {
    cache: "no-store",
  });

const curso: Curso = await resposta.json();
    return (
        <main className="p-8">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border
border-slate-200 bg-white shadow-sm">
                {/* IMAGEM DO CURSO */}
                <div className="relative h-72 w-full bg-slate-100">
                    {/* PASSO DETALHES 12: Renderizar a imagem do curso utilizando o componente
<Image /> */}
                    <Image
                    src={curso.imagem}
                    alt={curso.nome}
                    fill
                    className="mb-4 flex items-center justify-between"
                    />
                </div>
                <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                        {/* PASSO DETALHES 13: Exibir a categoria */}
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                            {curso.categoria}
                        </span>
                        {/* PASSO DETALHES 14: Exibir o preço */}
                        <span className="text-2xl font-extrabold text-slate-900">R$ {curso.preco}</span>
                    </div>
                    {/* PASSO DETALHES 15: Exibir o título do curso */}
                    <h1 className="text-3xl font-bold text-slate-800">{curso.nome}</h1>
                    {/* PASSO DETALHES 16: Exibir a descrição do curso */}
                    <p className="mt-4 leading-relaxed text-slate-600">
                        {curso.descricao}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm">
                        <div>
                            <span className="block font-medium text-slate-400">📍 Localização</span>
                            {/* PASSO DETALHES 17: Exibir o local retornado pela API ou texto padrão */}
                            <span className="font-semibold text-slate-700">{curso.local}</span>
                        </div>
                        <div>
                            <span className="block font-medium text-slate-400">🎓 Modalidade</span>
                            <span className="font-semibold text-slate-700">Presencial / Prática</span>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-100 pt-6">
                        {/* PASSO DETALHES 18: Usar <Link href="/"> para o botão de voltar */}
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                            >
                            ← Voltar para produtos
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );

}