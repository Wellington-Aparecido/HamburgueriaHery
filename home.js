document.addEventListener("DOMContentLoaded", function() {
    let carrinho = [];
    let total = 0;

    const botoesPedir = document.querySelectorAll(".btn-pedir");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalSpan = document.getElementById("total");
    const btnEnviarPedido = document.getElementById("btnEnviarPedido");

    // Adicionar item ao carrinho
    botoesPedir.forEach(botao => {
        botao.addEventListener("click", function() {
            const nome = this.getAttribute("data-nome");
            const preco = parseFloat(this.getAttribute("data-preco"));

            carrinho.push({ nome, preco });
            total += preco;
            atualizarCarrinho();
        });
    });

    // Atualizar carrinho na tela
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        carrinho.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${item.nome} - R$${item.preco.toFixed(2)}
                            <button class="btn-remover" data-index="${index}">X</button>`;
            listaCarrinho.appendChild(li);
        });

        totalSpan.textContent = total.toFixed(2);

        // Adicionar evento para remover itens
        document.querySelectorAll(".btn-remover").forEach(botao => {
            botao.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                total -= carrinho[index].preco;
                carrinho.splice(index, 1);
                atualizarCarrinho();
            });
        });
    }

    // Enviar pedido para o WhatsApp
    btnEnviarPedido.addEventListener("click", function() {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let pedido = carrinho.map(item => ` ${item.nome} - R$${item.preco.toFixed(2)}`).join("\n");
        let mensagem = `Olá, gostaria de fazer um pedido:\n\n${pedido}\n\n💰 Total: R$${total.toFixed(2)}`;

        // Número do WhatsApp da lanchonete (substitua pelo número correto com DDD)
        const numeroWhatsApp = "16997521019";

        // Criar link do WhatsApp com a mensagem formatada
        const mensagemCodificada = encodeURIComponent(mensagem);
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        // Abrir WhatsApp
        window.open(linkWhatsApp, "_blank");

        // Limpar carrinho após envio
        carrinho = [];
        total = 0;
        atualizarCarrinho();
    });
});
