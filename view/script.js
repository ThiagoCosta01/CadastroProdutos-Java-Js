

document.addEventListener('DOMContentLoaded', function () {
    
    const url = "http://localhost:8080/product";
    const btnCadastrar = document.querySelector("#botaoDeCadastro");
    const iproduto = document.getElementById('nomeProduto');
    const ivalor = document.querySelector('#valorProduto');
    const iprodutos = document.getElementById("catalogoProdutos");
    const btnListagem = document.getElementById('listagemB');
    


function hideLoader() {
    alert('servidor online');
    document.getElementById("loading").style.display = "none";
}

async function getAPI(url) {
    try {
        const response = await fetch(url, {
            method: "GET"
        });

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

function limpar() {
    document.getElementById('nomeProduto').value = "";
    document.getElementById('valorProduto').value = "";
    document.getElementById('descricaoProduto').value = "";
}

function cadastrar() {
    const url = "http://localhost:8080/product";

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById('nomeProduto').value,
            value: document.getElementById('nomeProduto').value,
            description: document.getElementById('descricaoProduto').value
        })
    })
    .then(response => {
        if (!response.ok) {
            alert(`Erro na requisição: ${response.status}`);
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        
        console.log(response.ok);  // Isso retorna uma Promise também
    })
    .then(data => {
          alert("Cadastro realizado!\nProduto: " + iproduto.value + "\nPreço: "+ivalor.value);
          limpar();
        
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}


getAPI(url);

document.getElementById('register-button').addEventListener("click", cadastrar);

});