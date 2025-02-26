$(document).ready(function() {
    // Intercepta o envio do formulário
    $("#formulario").submit(function(event) {
        event.preventDefault();  // Impede o envio tradicional do formulário

        // Captura os dados do formulário
        const dados = {
            nome: $("#nome").val(),
            cpf: $("#cpf").val(),
            telefone: $("#telefone").val(),
            email: $("#email").val(),
            estado: $("#estado").val(),
            cidade: $("#cidade").val(),
            bairro: $("#bairro").val(),
            rua: $("#rua").val(),
            numero: $("#numero").val()
        };

        // Envia os dados via AJAX
        $.ajax({
            url: "/processar_cadastro",
            type: "POST",
            data: dados,
            success: function(response) {
                // Exibe a mensagem de sucesso
                $("#resultado").text(response.mensagem).css("color", "green");
            },
            error: function(xhr) {
                // Exibe a mensagem de erro
                const erro = xhr.responseJSON.erro;
                $("#resultado").text(erro).css("color", "red");
            }
        });
    });
});

function validarNome(input) {
    // Remove números e caracteres não permitidos
    input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
}

function validarCPF(input) {
    // Remove todos os caracteres, exceto números
    let valor = input.value.replace(/[^0-9]/g, '');

    // Formata o CPF
    if (valor.length <= 11) {
        // Adiciona pontos e traço na formatação correta
        if (valor.length > 3) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
        }
        if (valor.length > 6) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
        }
        if (valor.length > 9) {
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
        }
    }

    input.value = valor;
}

function validarTelefone(input) {
    // Remove todos os caracteres, exceto números
    let valor = input.value.replace(/[^0-9]/g, '');

    // Formata o telefone
    if (valor.length <= 11) {
        // Adiciona parênteses e traço na formatação correta
        if (valor.length > 6) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
        } else if (valor.length > 2) {
            valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2'); // Formato (XX) XXXXX
        }
    }

    input.value = valor;
}