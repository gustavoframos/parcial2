function adicionarTarefa(evt) {
  // Evita que a pagina seja recarregada ao enviar o formulario
  evt.preventDefault();

  // Obtem os valores dos inputs
  let descricao = document.getElementById("Descrição");

  let preco = document.getElementById("Preço");

  let quantidade = document.getElementById("Quantidade");

  // Cria a nova tarefa e adiciona a lista
  let novaTarefa = {
    descricao: descricao.value,
    preco: preco.value,
    quantidade: quantidade.value,
  };
  tarefas.push(novaTarefa);

  popularTabela();
}

function removeElemento(index) {
  // Remove o elemento na posicao index
  tarefas.splice(index, 1);

  // Apos a remocao, limpa a tabela e preenche novamente
  popularTabela();
}

function popularTabela() {
  // Referencia ao corpo da tabela
  let conteudo = document.getElementById("conteudo");

  // Limpa a tabela antes de popular
  conteudo.innerHTML = "";

  // Grava os elementos na memoria
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  // Popula a tabela
  for (let i = 0; i < tarefas.length; i++) {
    let tarefa = tarefas[i];

    let linha = document.createElement("tr");
    conteudo.appendChild(linha);

    let posicao = document.createElement("th");
    linha.appendChild(posicao);
    posicao.innerText = i + 1;

    let descricao = document.createElement("td");
    linha.appendChild(descricao);
    descricao.innerText = tarefa.descricao;

    let preco = document.createElement("td");
    preco.innerText = "R$ " + tarefa.preco;
    linha.appendChild(preco);

    let quantidade = document.createElement("td");
    linha.appendChild(quantidade);
    quantidade.innerText = tarefa.quantidade;

    let total = tarefa.preco * tarefa.quantidade;
    let celulaTotal = document.createElement("td");
    celulaTotal.innerText = "R$ " + total.toFixed(2);
    linha.appendChild(celulaTotal);

    let acoes = document.createElement("td");
    linha.appendChild(acoes);

    let button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerText = "X";
    button.onclick = function () {
      removeElemento(i);
    };
    acoes.appendChild(button);
  }
  exibirRodape();
}

function exibirRodape() {
  let rodape = document.getElementById("rodape");

  rodape.innerHTML = ""; //Limpa rodape

  let linha = document.createElement("tr");
  rodape.appendChild(linha);

  linha.appendChild(document.createElement("td")); //Adiciona celula vazia
  linha.appendChild(document.createElement("td")); //Adiciona celula vazia
  linha.appendChild(document.createElement("td")); //Adiciona celula vazia
  linha.appendChild(document.createElement("td")); //Adiciona celula vazia

  let total = 0;

  for (let i = 0; i < tarefas.length; i++) {
    //Percorre toda a lista e soma os valores
    let tarefa = tarefas[i];
    let valorTotalDoItem = tarefa.preco * tarefa.quantidade;

    total += valorTotalDoItem; //Acumula o resultado total com o valor atual
  }

  let celulaTotal = document.createElement("td");
  celulaTotal.innerText = "R$ " + total.toFixed(2);
  linha.appendChild(celulaTotal);
}

// Adiciona a funcao criada ao formulario
let formulario = document.getElementById("formulario");
formulario.onsubmit = adicionarTarefa;

// Lista de tarefas a fazer recuperada da memoria do navegador
let tabelaSalva = localStorage.getItem("tarefas");

// Quando utilizamos o ||, pegamos a primeira opcao, se existir, ou a segunda opcao
let tarefas = JSON.parse(tabelaSalva) || [];

// Popula a tabela inicialmente
popularTabela();
