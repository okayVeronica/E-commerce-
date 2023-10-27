const limparFormulario = () => {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

const mostrarMensagem = (mensagem, sucesso = true) => {
  const mensagemElement = document.getElementById('mensagem');
  mensagemElement.innerText = mensagem;
  mensagemElement.style.color = sucesso ? 'green' : 'red';
}

const preencherFormulario = (endereco) => {
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}

const pesquisarCep = async () => {
  limparFormulario();
  mostrarMensagem('Pesquisando CEP...', true);
  const cep = document.getElementById('cep').value;

  // Fazer a consulta à API Via CEP
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  
  if (cep.length === 8) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const address = await response.json();

        if (!address.erro) {
          preencherFormulario(address);
          mostrarMensagem('CEP encontrado com sucesso!', true);
        } else {
          mostrarMensagem('CEP não encontrado. Verifique o CEP digitado.', false);
        }
      } else {
        mostrarMensagem('Erro ao buscar o CEP. Tente novamente mais tarde.', false);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      mostrarMensagem('Ocorreu um erro na solicitação. Verifique sua conexão ou tente novamente mais tarde.', false);
    }
  } else {
    mostrarMensagem('CEP incorreto. Certifique-se de que o CEP possui 8 dígitos numéricos.', false);
  }
}

document.getElementById('cep').addEventListener('blur', pesquisarCep);

// Adicione este bloco para ativar o preenchimento automático quando o CEP é digitado
document.getElementById('cep').addEventListener('input', (event) => {
  const cep = event.target.value;

  if (cep.length === 8) {
    pesquisarCep();
  }
});

document.getElementById('cep').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Impede o comportamento padrão
    pesquisarCep();
  }
});
