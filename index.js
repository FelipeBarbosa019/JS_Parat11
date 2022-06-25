const btnIncluir = document.querySelector ("#botaoIncluir")  
const btnListar = document.querySelector("#botaoListar")
const confirme = document.querySelector ("h3") 
const confirme2 = document.querySelector ("h4") 

let id = 1
let produtos = [];

btnIncluir.addEventListener ("click", incluir)
btnListar.addEventListener ("click", listar)
//const nomeTitulo = document.querySelector ("#nomeTitulo")
//nomeTitulo.addEventListener ("click", ordenarNomes(produtos))

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

function listar(){
    let tabela = document.querySelector("#tabela")
    let cont = 0
    tabela.innerHTML = ""

    // Inserindo valores na tabela:
    while (cont < produtos.length) {
        let linha = tabela.insertRow();

        let colunaId = linha.insertCell();
        let colunaNome = linha.insertCell();
        let colunaValor = linha.insertCell();
        let colunaEditar = linha.insertCell();
        let colunaApagar = linha.insertCell();
        
        colunaId.innerHTML = produtos[cont].id;
        colunaNome.textContent = produtos[cont].nome;
        colunaValor.textContent = `R$ ${produtos[cont].valor}`;

        let imagemEdit = document.createElement('img')
        imagemEdit.src = './assests/edit.svg'
        colunaEditar.appendChild (imagemEdit)
        imagemEdit.setAttribute("onclick", "abrirPopup()")
        // imagemEdit.setAttribute("onclick", "editarid("+ JSON.stringify(produtos[cont])+")")

        let imagemApagar = document.createElement('img')
        imagemApagar.src = './assests/excluir.png'
        colunaApagar.appendChild (imagemApagar)
        imagemApagar.setAttribute("onclick", "apagar("+produtos[cont].id+")")

        let btnConfirmar = document.querySelector("#botaoEditar")
        btnConfirmar.setAttribute("onclick",  "editar("+produtos[cont].id+")")

         //Popup visualização:
         colunaNome.setAttribute("onclick", "mostrar("+JSON.stringify(produtos)+", "+produtos[cont].id+")")
         let btnFechar2 = document.querySelector ("#fechar2")
         btnFechar2.setAttribute ("onclick", "fecharpopup2()")

        cont++;
        }

        //Popup edição:
        let btnFechar = document.querySelector ("#fechar")
        btnFechar.addEventListener ("click", fecharPopup)

        //Ordenar tabela em ordem alfabética:
        const nomeTitulo = document.querySelector ("#nomeTitulo")
        nomeTitulo.setAttribute("onclick", "ordenarNomes("+produtos+")")


        //nomeTitulo.setAttribute("onclick", "ordenarNomes("+produtos+")")
}

function mostrar(produtos, id){
    const btnAbrir = document.querySelector("#popupInfos")
    btnAbrir.style.display = 'block'

    let contadora = 0
    const infoID = document.querySelector("#infoID")
    const infoNome = document.querySelector("#infoNome")
    const infoDescricao = document.querySelector("#infoDescricao")
    const infoValor = document.querySelector("#infoValor")
    const infoData = document.querySelector("#infoData")

    while (contadora < produtos.length) {
        if(produtos[contadora].id == id){ 
            infoID.textContent = produtos[contadora].id
            infoNome.textContent = produtos[contadora].nome
            infoDescricao.textContent = produtos[contadora].descricao
            infoValor.textContent = produtos[contadora].valor
            infoData.textContent = produtos[contadora].incluidoEm
        }
        contadora++;
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
    let contadora = 0;
    let nomeEdit = document.querySelector ("#nomeEdit").value
    let descricaoEdit = document.querySelector ("#descricaoEdit").value
    let valorEdit = document.querySelector ("#valorEdit").value

    while (contadora < produtos.length) {
        if(produtos[contadora].id == id){  
            produtos[contadora].nome = nomeEdit;
            produtos[contadora].descricao = descricaoEdit;
            produtos[contadora].valor = valorEdit;
            confirme2.textContent = `Dados alterados com sucesso, atualize a tabela clicando em "Listar produtos"`
            confirme2.style.color = "#00ff00"
        }
        contadora++;
    } 

    //resetando display após inserção
    document.querySelector ("#nomeEdit").value = ""
    document.querySelector ("#descricaoEdit").value = ""
    document.querySelector ("#valorEdit").value = ""
    fecharPopup();
    listar();
}   

function apagar(id) {
    let cont2 = 0
    let novosprodutos = []
    while (cont2 < produtos.length) {
        if(produtos[cont2].id != id ){
            novosprodutos.push(produtos[cont2]);    
        }
        cont2++;
    }
    produtos = novosprodutos
    listar();
}

function ordenarNomes (produtos){
    alert("teste")
    produtos.sort(function (a, b) {
      return a.nome.localeCompare(b);
    });
    console.log(produtos)
    listar();
}



