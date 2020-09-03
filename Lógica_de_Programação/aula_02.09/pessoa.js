const divInformacoes = document.querySelector("div");
const pessoa = localStorage.getItem("pessoa");
const button = document.querySelector("button");

//funções formatar já adicionam as informações em um novo <p>

const formatarNome = (nome) => {
    const nomeArray = nome.split(" ");
    let nomeFormatado = `Nome: ${nomeArray[0][0].toUpperCase()}${nome.slice(1).toLowerCase()}`;
    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerText = nomeFormatado;
    divInformacoes.append(novoParagrafo); 
}

const formatarIdade = (idade) => {
    let idadeFormatada;
    (idade == 1)? idadeFormatada = `Idade: ${idade} ano` :idadeFormatada = `Idade: ${idade} anos`;
    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerText = idadeFormatada;
    divInformacoes.append(novoParagrafo);
}

const formatarCpf = (cpf) => {
    const cpfFormatado = `CPF: ${cpf.slice(0,3)}-${cpf.slice(3,6)}-${cpf.slice(6,9)}-${cpf.slice(9)}`;
    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerText = cpfFormatado;
    divInformacoes.append(novoParagrafo);
}

const formatarTelefone = (telefone) => {
    let telefoneFormatado = `Telefone: ${telefone}`;; 
    if (telefone.length === 8) {
        telefoneFormatado = `Telefone: 9${telefone}`;
    }
    
    else if (telefone.length === 10) {
        telefoneFormatado = `Telefone: (${telefone.substr(0,2)}) 9${telefone.substr(2)}`;
    }

    else if (telefone.length === 11) {
        telefoneFormatado = `Telefone: (${telefone.substr(0,2)}) ${telefone.substr(2)}`;
    }

    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerText = telefoneFormatado;
    divInformacoes.append(novoParagrafo);
}

if (pessoa) {
    const pessoaObjeto = JSON.parse(pessoa);
    formatarNome(pessoaObjeto.nome);
    formatarIdade(pessoaObjeto.idade);
    formatarCpf(pessoaObjeto.cpf);
    formatarTelefone(pessoaObjeto.telefone);
    button.addEventListener("click", () => {
        //Apaga o objeto "pessoa" do local Storage para adicionar outro
        localStorage.removeItem(pessoa);
        location.href = "index.html";
    })
}
