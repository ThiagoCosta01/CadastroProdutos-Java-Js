

document.addEventListener('DOMContentLoaded', function () {

    const apiUrl = "http://localhost:8080/product";
    const btnRegisterProduct = document.getElementById("register-button");
    const inputProduto = document.getElementById('nomeProduto');
    const inputValor = document.getElementById('valorProduto');
    const inputDescricao = document.getElementById('descricaoProduto');
    const catalogoProdutos = document.getElementById("productsCatalog");
    const btnListagem = document.getElementById('listagemB');
    const loadingElement = document.getElementById("loading");
    const darkmodeBtn = document.getElementById("darkmodeBtn");
    
    //muda o tema para dark mode ou light mode
    darkmodeBtn.addEventListener("change", (e) => {
        document.body.classList.toggle("dark", e.target.checked)
    });

    //esconde o loader do bootstrap quando a conexão com a API acontecer
    function hideLoader() {
        loadingElement.style.display = "none";
    }

    //testa a conexão com a API
    async function connectApi(){
        try{
            await fetch(apiUrl, {method: "HEAD"});
            console.log("connected");

        }

        catch (error){
            console.error("Erro ao se conectar à API: " + error);

        }
    };


    async function fetchData(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setTimeout(hideLoader, 1000);

        } catch (error) {
            console.error("Erro ao obter dados da API:", error.message);
        }
    }


    function clearInputs() {
        inputProduto.value = "";
        inputValor.value = "";
        inputDescricao.value = "";
    }
    // cria a tabela
    function show(catalogoProdutos) {

        let tab = `
        <thead>
        <th scope="col">Nome do produto</th>
        <th scope="col">Valor do produto</th>
        <th scope="col">Descrição</th>
        </thead>`;
        var state = true;
        var color = "";

        for (let product of catalogoProdutos) {
            if(state) {
                color = "#010132";
                state = false;
            }
            else{
                color = "#ffffff00";
                state = true;
             }
            tab += `
            <tr style="background-color: ${color};">
                <td id="productName" scope="row">${product.name}</td>
                <td id="productValue" scope="row">$${product.value}</td>
                <td id="productDesc" scope="row">${product.desc}</td>
            </tr>
            `;
        }

        document.getElementById("productsCatalog").innerHTML = tab;
    }
    async function getAPI(apiUrl) {
        
        const response = await fetch(apiUrl, {method: "GET"});

        var data = await response.json();
        
        if(response) hideLoader();
        show(data);
    }
    getAPI(apiUrl)    

    //dispara ao pressionar o botão de cadastrar na página register
    async function registerNewProduct() {
        
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: inputProduto.value,
                    value: inputValor.value,
                    description: inputDescricao.value
                })
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            console.log(response.ok);
            alert("Cadastro realizado!\nProduto: " + inputProduto.value + "\nPreço: " + inputValor.value)

            clearInputs();

        } catch (error) {
            alert("Erro");
            console.error('Erro:', error);
        }
    }
    btnRegisterProduct.addEventListener("click", registerNewProduct);
    fetchData(apiUrl);
    connectApi()

});
