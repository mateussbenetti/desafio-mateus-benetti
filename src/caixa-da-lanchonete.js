const CARDAPIO = {
    cafe: {
        descricao: "Café",
        valor: 3.00
    },
    chantily: {
        descricao: "Chantily (extra do Café)",
        valor: 1.50,
        extra: true,
        principal: "cafe"
    },
    suco: {
        descricao: "Suco Natural",
        valor: 6.20
    },
    sanduiche: {
        descricao: "Sanduíche",
        valor: 6.50
    },
    queijo: {
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.00,
        extra: true,
        principal: "sanduiche"
    },
    salgado: {
        descricao: "Salgado",
        valor: 7.25
    },
    combo1: {
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.50
    },
    combo2: {
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.50
    }
}

const DINHEIRO = "dinheiro", DEBITO = "debito", CREDITO = "credito";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!itens.length){
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let mensagemDeErro = "";

        for (let index = 0; index < itens.length; index++) {
            const item = itens[index];
            const [codigo, quantidade] = item.split(",");
            const itemDeEstoque = CARDAPIO[codigo];
            if (!itemDeEstoque) {
                mensagemDeErro = "Item inválido!";
                break;
            }
            if (quantidade <= 0) {
                mensagemDeErro = "Quantidade inválida!";
                break;
            }
            if (itemDeEstoque.extra) {
                const pedidoContemPricipal = itens.find((item) => {
                    const codigoPrincipal = item.split(",")[0];
                    return itemDeEstoque.principal === codigoPrincipal;
                });
                if (!pedidoContemPricipal) {
                    mensagemDeErro = "Item extra não pode ser pedido sem o principal";
                    break;
                }
            }
            total += itemDeEstoque.valor * quantidade; 
        }

        switch (metodoDePagamento) {
            case DINHEIRO:
                total -= (total * 0.05);
                break;
            case CREDITO:
                total += (total * 0.03);
                break;
            case DEBITO:
                break;
            default:
                mensagemDeErro = "Forma de pagamento inválida!";
                break;
        }
        if (mensagemDeErro) {
            return mensagemDeErro;
        }
        return `R$ ${total.toFixed(2).toString().replace("." , ",")}`;
    }
}
export { CaixaDaLanchonete };