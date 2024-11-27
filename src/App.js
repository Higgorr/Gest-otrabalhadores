import React, { useState } from 'react';
import './App.css';

function App() {
    const [colaboradores, setColaboradores] = useState([
        { id: 9112551, nome: "Marco Moreira", funcao: "Professor", salario: "R$ 1.000,00", admissao: "21/10/2021", demissao: "" },
        { id: 3125274, nome: "Judas Mendes", funcao: "Marketing", salario: "R$ 2.500,00", admissao: "01/09/2014", demissao: "26/10/2024" }
    ]);

    const [editandoId, setEditandoId] = useState(null);
    const [edicao, setEdicao] = useState({ nome: '', funcao: '', salario: '', demissao: '' });
    const [novoColaborador, setNovoColaborador] = useState({ id: '', nome: '', funcao: '', salario: '', admissao: '', demissao: '' });

    const formatarData = (valor) => {
        valor = valor.replace(/\D/g, ""); // Remove tudo que não for número
        if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
        if (valor.length > 5) valor = valor.slice(0, 5) + "/" + valor.slice(5);
        return valor;
    };

    const formatarSalario = (valor) => {
        valor = valor.replace(/\D/g, ""); // Remove tudo que não for número
        valor = (parseFloat(valor) / 100).toFixed(2).toString(); // Divide por 100 e formata com duas casas decimais
        valor = valor.replace(".", ","); // Troca o ponto decimal por vírgula
        return "R$ " + valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona pontos a cada 3 dígitos antes da vírgula
    };

    const editarColaborador = (id) => {
        const colaborador = colaboradores.find((colab) => colab.id === id);
        setEdicao(colaborador);
        setEditandoId(id);
    };

    const concluirEdicao = () => {
        setColaboradores(colaboradores.map((colab) =>
            colab.id === editandoId ? { ...colab, ...edicao } : colab
        ));
        setEditandoId(null);
        setEdicao({ nome: '', funcao: '', salario: '', demissao: '' });
    };

    const removerColaborador = (id) => {
        setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
    };

    const handleEdicaoChange = (e) => {
        const { name, value } = e.target;
        setEdicao({
            ...edicao,
            [name]: name === 'salario' ? formatarSalario(value) : name.includes('demissao') || name.includes('admissao') ? formatarData(value) : value
        });
    };

    const handleNovoColaboradorChange = (e) => {
        const { name, value } = e.target;
        setNovoColaborador({
            ...novoColaborador,
            [name]: name === 'salario' ? formatarSalario(value) : name.includes('demissao') || name.includes('admissao') ? formatarData(value) : value
        });
    };

    const adicionarColaborador = () => {
        if (!novoColaborador.id || !novoColaborador.nome || !novoColaborador.funcao || !novoColaborador.salario || !novoColaborador.admissao) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        setColaboradores([...colaboradores, novoColaborador]);
        setNovoColaborador({ id: '', nome: '', funcao: '', salario: '', admissao: '', demissao: '' });
    };

    return (
        <div className="container">
            <h1>Lista de Colaboradores</h1>

            {/* Formulário para adicionar novo colaborador */}
            <div className="form-adicionar">
                <h2>Adicionar Colaborador</h2>
                <input
                    type="number"
                    name="id"
                    placeholder="ID (apenas números)"
                    value={novoColaborador.id}
                    onChange={handleNovoColaboradorChange}
                    maxLength="7"
                    required
                />
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={novoColaborador.nome}
                    onChange={handleNovoColaboradorChange}
                    maxLength="30"
                    required
                />
                <input
                    type="text"
                    name="funcao"
                    placeholder="Função"
                    value={novoColaborador.funcao}
                    onChange={handleNovoColaboradorChange}
                    maxLength="20"
                    required
                />
                <input
                    type="text"
                    name="salario"
                    placeholder="Salário (ex: R$ 1.000,00)"
                    value={novoColaborador.salario}
                    onChange={handleNovoColaboradorChange}
                    maxLength="12"
                />
                <input
                    type="text"
                    name="admissao"
                    placeholder="Data de Admissão (DD/MM/AAAA)"
                    value={novoColaborador.admissao}
                    onChange={handleNovoColaboradorChange}
                    maxLength="10"
                />
                <input
                    type="text"
                    name="demissao"
                    placeholder="Data de Demissão (opcional, DD/MM/AAAA)"
                    value={novoColaborador.demissao}
                    onChange={handleNovoColaboradorChange}
                    maxLength="10"
                />
                <button onClick={adicionarColaborador}>Adicionar</button>
            </div>

            {/* Tabela de colaboradores */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Função</th>
                        <th>Salário</th>
                        <th>Data de Admissão</th>
                        <th>Data de Demissão</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.map((colaborador) => (
                        <tr key={colaborador.id}>
                            <td>{colaborador.id}</td>
                            <td>
                                {editandoId === colaborador.id ? (
                                    <input
                                        type="text"
                                        name="nome"
                                        value={edicao.nome}
                                        onChange={handleEdicaoChange}
                                        maxLength="30"
                                    />
                                ) : (
                                    colaborador.nome
                                )}
                            </td>
                            <td>
                                {editandoId === colaborador.id ? (
                                    <input
                                        type="text"
                                        name="funcao"
                                        value={edicao.funcao}
                                        onChange={handleEdicaoChange}
                                        maxLength="20"
                                    />
                                ) : (
                                    colaborador.funcao
                                )}
                            </td>
                            <td>
                                {editandoId === colaborador.id ? (
                                    <input
                                        type="text"
                                        name="salario"
                                        value={edicao.salario}
                                        onChange={handleEdicaoChange}
                                        maxLength="12"
                                    />
                                ) : (
                                    colaborador.salario
                                )}
                            </td>
                            <td>{colaborador.admissao}</td>
                            <td>
                                {editandoId === colaborador.id ? (
                                    <input
                                        type="text"
                                        name="demissao"
                                        value={edicao.demissao}
                                        onChange={handleEdicaoChange}
                                        maxLength="10"
                                    />
                                ) : (
                                    colaborador.demissao
                                )}
                            </td>
                            <td>
                                {editandoId === colaborador.id ? (
                                    <button onClick={concluirEdicao}>Concluir</button>
                                ) : (
                                    <button onClick={() => editarColaborador(colaborador.id)}>Editar</button>
                                )}
                                <button onClick={() => removerColaborador(colaborador.id)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
