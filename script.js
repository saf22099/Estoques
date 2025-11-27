let produtos = [];
let editIndex = -1;

function adicionarProduto() {
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const preco = document.getElementById("preco").value.trim();
    const estoque = document.getElementById("estoque").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || categoria === "" || preco === "" || estoque === "" || descricao === "" || imagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (editIndex === -1) {
        produtos.push({ nome, categoria, preco, estoque, descricao, imagem });
    } else {
        produtos[editIndex] = { nome, categoria, preco, estoque, descricao, imagem };
        editIndex = -1;
        document.getElementById("btnCancelar").style.display = "none";
    }

    limparCampos();
    listarProdutos();
}

function listarProdutos() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";
    produtos.forEach((p, index) => {
        tabela.innerHTML += `
            <tr>
                <td><img src="${p.imagem}" onerror="this.src='https://via.placeholder.com/60'"></td>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.preco}</td>
                <td>${p.estoque}</td>
                <td>${p.descricao}</td>
                <td>
                    <button class="edit" onclick="editarProduto(${index})">Editar</button>
                    <button class="del" onclick="excluirProduto(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function editarProduto(index) {
    const p = produtos[index];
    document.getElementById("nome").value = p.nome;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("preco").value = p.preco;
    document.getElementById("estoque").value = p.estoque;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("imagem").value = p.imagem;
    editIndex = index;
    document.getElementById("btnCancelar").style.display = "inline-block";
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    if (editIndex === index) {
        editIndex = -1;
        limparCampos();
        document.getElementById("btnCancelar").style.display = "none";
    } else if (editIndex > index) {
        editIndex--;
    }
    listarProdutos();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("estoque").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";
}

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    adicionarProduto();
});

document.getElementById("btnCancelar").addEventListener("click", function() {
    editIndex = -1;
    limparCampos();
    this.style.display = "none";
});
