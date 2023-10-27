"use strict";

// Função para limpar o formulário
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

// Função para verificar se é um número
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// Função para verificar se o CEP é válido
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Função para preencher o formulário com os dados do endereço
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

// Função para fazer a pesquisa do CEP na API da Via CEP
const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const endereco = await response.json();
                if (!endereco.hasOwnProperty('erro')) {
                    preencherFormulario(endereco);
                } else {
                    alert('CEP não encontrado');
                }
            } else {
                alert('Erro ao buscar o CEP');
            }
        } catch (error) {
            alert('Ocorreu um erro na pesquisa de CEP');
        }
    } else {
        alert('CEP incorreto');
    }
}

// Adiciona um evento de foco no input do CEP para acionar a pesquisa
document.getElementById('cep').addEventListener('blur', pesquisarCep);
