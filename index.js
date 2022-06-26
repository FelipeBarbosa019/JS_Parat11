const btnIncluir = document.querySelector ("#botaoIncluir")  
const btnListar = document.querySelector("#botaoListar")
const confirme = document.querySelector ("h3") 
const confirme2 = document.querySelector ("h4") 
const nomeTitulo = document.querySelector ("#nomeTitulo")
const valorTitulo = document.querySelector ("#valorTitulo")
const buscar = document.querySelector ("#buscar")
const idTitulo = document.querySelector ("#idTitulo")

let id = 1
let produtos = []

btnIncluir.addEventListener ("click", incluir)
btnListar.addEventListener ("click", function(){
    listar(produtos);
})
nomeTitulo.addEventListener ("click", ordenarNomes)
valorTitulo.addEventListener ("click", ordenarValores)
idTitulo.addEventListener ("click", ordenarID)
buscar.addEventListener ("click", filtrar)


function incluir() {
    // Incluido em:
    let data = new Date()
    const dia = String(data.getDate()).padStart(2,'0')
    const mes = String(data.getMonth() + 1).padStart(2,'0')
    const ano = data.getFullYear()
    const h=data.getHours();
    const m=data.getMinutes();
    const s=data.getSeconds();
    const dataatual= `${dia}/${mes}/${ano} às ${h}:${m}:${s}`
    let produto = {}

    //Guardando valores de entrada:
    const nome = document.querySelector("#nome").value;
    const descricao = document.querySelector("#descricao").value;
    const valor = parseFloat(document.getElementById ('valor').value.replace(',','.'))

    
    //Verificação de dados:
    try {
        if(nome == "") {
            throw `Falha no cadastro do produto, preencha o nome`
        }
        if(descricao == "") {
            throw `Falha no cadastro do produto, preencha a descrição`
        }
        if(valor == "") {
            throw `Falha no cadastro do produto, preencha o valor`
        }
        if(isNaN(valor)) {
            throw `Falha no cadastro do produto, insira apenas números no campo de valor`
        }

        //Objeto:
        produto.id = id,
        produto.nome = nome,
        produto.descricao = descricao,
        produto.valor = valor,
        produto.incluidoEm = dataatual

        //Array:
        produtos.push(produto)
        produto.id = id++;

        //Impressão:
        confirme.textContent = `Produto ${produto.nome} incluído com sucesso!`
        confirme.style.color = "#00ff00"

        //resetando display após inserção
        document.querySelector("#nome").value = ""
        document.querySelector("#valor").value = ""
        document.querySelector("#descricao").value = ""

    } catch (error) {
        confirme.textContent = error
        confirme.style.color = "#ff0000"
    } 
}

function listar(array){
    let tabela = document.querySelector("#tabela")
    tabela.innerHTML = ""
    confirme.textContent = ""

    // Inserindo valores na tabela:
    for (i=0; i < array.length; i++) {
        let linha = tabela.insertRow();

        let colunaId = linha.insertCell();
        let colunaNome = linha.insertCell();
        let colunaValor = linha.insertCell();
        let colunaEditar = linha.insertCell();
        let colunaApagar = linha.insertCell();
        
        colunaId.innerHTML = array[i].id;
        colunaNome.textContent = array[i].nome;
        colunaValor.textContent = `R$ ${array[i].valor}`;

        let imagemEdit = document.createElement('img')
        imagemEdit.src = './assests/edit.svg'
        colunaEditar.appendChild (imagemEdit)
        imagemEdit.setAttribute("onclick", "abrirPopup()")

        let imagemApagar = document.createElement('img')
        imagemApagar.src = './assests/excluir.png'
        colunaApagar.appendChild (imagemApagar)
        imagemApagar.setAttribute("onclick", "apagar("+array[i].id+")")

        let btnConfirmar = document.querySelector("#botaoEditar")
        btnConfirmar.setAttribute("onclick",  "editar("+array[i].id+")")

         //Popup visualização:
         colunaNome.setAttribute("onclick", "mostrar("+JSON.stringify(array)+", "+array[i].id+")")
         let btnFechar2 = document.querySelector ("#fechar2")
         btnFechar2.setAttribute ("onclick", "fecharpopup2()")
    }

    //Popup edição:
    let btnFechar = document.querySelector ("#fechar")
    btnFechar.addEventListener ("click", fecharPopup)
}

function mostrar(produtos, id){
    const btnAbrir = document.querySelector("#popupInfos")
    btnAbrir.style.display = 'block'

    const infoID = document.querySelector("#infoID")
    const infoNome = document.querySelector("#infoNome")
    const infoDescricao = document.querySelector("#infoDescricao")
    const infoValor = document.querySelector("#infoValor")
    const infoData = document.querySelector("#infoData")

    for (i=0; i < produtos.length; i++) {
        if(produtos[i].id == id){ 
            infoID.textContent = produtos[i].id
            infoNome.textContent = produtos[i].nome
            infoDescricao.textContent = produtos[i].descricao
            infoValor.textContent = produtos[i].valor
            infoData.textContent = produtos[i].incluidoEm
        }
    }
}

function abrirPopup (){
    const btnAbrir = document.querySelector("#popup")
    btnAbrir.style.display = 'block'
}

function fecharPopup(){
    btnFechar = document.querySelector ("#popup")
    btnFechar.style.display = 'none'
    confirme2.textContent = ``
}

function fecharpopup2(){
    btnFechar = document.querySelector ("#popupInfos")
    btnFechar.style.display = 'none'
    confirme2.textContent = ``
}

function editar(id) {
    let nomeEdit = document.querySelector ("#nomeEdit").value
    let descricaoEdit = document.querySelector ("#descricaoEdit").value
    let valorEdit = document.querySelector ("#valorEdit").value

    for (i=0; i < produtos.length; i++) {
        if(produtos[i].id == id){  
            produtos[i].nome = nomeEdit;
            produtos[i].descricao = descricaoEdit;
            produtos[i].valor = valorEdit;
            confirme2.textContent = `Dados alterados com sucesso, atualize a tabela clicando em "Listar produtos"`
            confirme2.style.color = "#00ff00"
        }
    } 

    // resetando display após inserção
    document.querySelector ("#nomeEdit").value = ""
    document.querySelector ("#descricaoEdit").value = ""
    document.querySelector ("#valorEdit").value = ""
    fecharPopup();
    listar(produtos);
}   

function apagar(id) {
    produtos.forEach((arrayItem,index) => {
        if(arrayItem.id == id ){
            produtos.splice(index, 1); 
        }
    })
    listar(produtos);
}

function ordenarNomes (){
    produtos.sort(function (a, b) {
      return a.nome.localeCompare(b.nome);
    });
    listar(produtos);
}

function ordenarValores (){
    produtos.sort(function (a, b) {
      return a.valor - b.valor
    });
    listar(produtos);
}

function ordenarID (){
    produtos.sort(function (a, b) {
      return a.id - b.id
    });
    listar(produtos);
}

function filtrar() {
    let aux = 0;
    const inputPesquisa = document.querySelector ("#inputPesquisa").value
    const msg = document.querySelector ("#msg")

    let novosprodutos = produtos.filter ((valorAtual) => {
        if ((valorAtual.nome.includes(inputPesquisa)) || (valorAtual.descricao.includes(inputPesquisa))){
            aux++;
            msg.textContent = `Foram encontrado(s) ${aux} produtos`
            msg.style.color = "#00ff00"
            return true
        } else if (aux==0) {
            msg.textContent = `Não foram encontrados produtos conforme chave de pesquisa!`
            msg.style.color = "#ff0000"
        }
    })
    listar(novosprodutos);
}