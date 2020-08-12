/*
  Não altere nada ABAIXO disso até o próximo comentário;

  -- Este código permite que tenhamos uma 
  -- experiência interativa com o usuário;
  -- Não é necessário entendê-lo neste momento.
*/
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
  Não altere nada ACIMA deste comentário;;
*/

/**
 * Escreva seu código aqui embaixo;
 */
let cadastros = [];
cadastros.push(
    {
        nome: "luis",
        dataDeNascimento: "11/03/2002",
        cpf: "68844738562",
        profissao: "padeiro",
        deletado: false
    },
    {
        nome: "andre",
        dataDeNascimento: "11/03/2002",
        cpf: "68838538562",
        profissao: "padeiro",
        deletado: false
    },
    {
        nome: "maria",
        dataDeNascimento: "15/07/2002",
        cpf: "6883554323",
        profissao: "pedreira",
        deletado: true
    }
);

function listarUsuarios(){
    for (let i  = 0; i < cadastros.length; i++){
        if (cadastros[i].deletado == false){
            console.log(cadastros[i]);
        }
    }
}

function deletarUsuario(cpf){
    let k = cadastros.length;
    for (let i = 0; i < k; i++){
        if (cpf == cadastros[i].cpf){
            cadastros[i].deletado = true;
            console.log(`Usuário de cpf: ${cpf} foi deletado`);
            console.log("Atuais usuários no Banco de Dados:")
            listarUsuarios();
            return;
        }
    }
    console.log("Usuário não encontrado");
}

function cadastrar(usuario){
    cadastros.push(
        usuario
    );
}

function corrigir(cpf){
    for (let i = 0; i < cadastros.length; i++){
        if (cpf == cadastros[i].cpf){
            cadastros[i].deletado = true;
            cadastrar(
                {
                    nome: "Aleatório",
                    dataDeNascimento: "11/03/2007",
                    cpf: "98844738562",
                    profissao: "médico",
                    deletado : false
                }
            );
        }
    }
}

rl.question(
    "Deseja listar, deletar, cadastrar ou corrigir ? ",
    function pergunta(resposta) {

        if (resposta === "listar"){
            listarUsuarios();
            rl.close();
        }
    
        else if (resposta === "deletar"){
            rl.question(
                "Deseja deletar qual CPF? ", 
                function cpfDeletado(resposta){
                    deletarUsuario(resposta);
                    rl.close();
                }
            )
        }

        else if (resposta ==="cadastrar"){
            rl.question (
                "Qual o nome do Usuário? ",
                function usuario(resposta){
                  let nome = resposta;  
                  rl.question (
                      "Qual a data de nascimento? ",
                      function nascimento(resposta){
                          let nascimento = resposta;
                          rl.question (
                              "Qual a Profissão? ",
                              function profissao(resposta){
                                  let profissao = resposta;
                                  rl.question (
                                    "Qual o Cpf? ",
                                    function cpf(resposta){
                                        let cpf = resposta;
                                        for (let i = 0; i < cadastros.length; i ++){
                                            if (cpf == cadastros[i].cpf){
                                                console.log("Usuário já cadastrado");
                                                rl.close();
                                                return;
                                            }
                                        }
                                        cadastrar(
                                            {
                                                nome: nome,
                                                dataDeNascimento: nascimento,
                                                cpf: cpf,
                                                profissao: profissao,
                                                deletado: false
                                            }
                                        )
                                        console.log("Pronto! Usuário cadastrado!")
                                        console.log("Atuais usuários no Banco de Dados:")
                                        listarUsuarios();
                                        rl.close();
                                    }
                                  )
                              }
                          )
                      }
                  )
                }
            )



        }
        
        else if (resposta === "corrigir"){
            rl.question(
                "Qual o CPF? ",
                function corrigindo(resposta) {
                    corrigir(resposta);
                    console.log("O Usuário foi corrigido");
                    console.log("Atuais usuários no Banco de Dados:")
                    listarUsuarios();
                    rl.close();
                }
            )
        }
});