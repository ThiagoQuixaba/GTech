$(document).ready(function() {
    $("#formulario").submit(function(event) {
        event.preventDefault();
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
    input.value = input.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
}

function validarCPF(input) {
    let valor = input.value.replace(/[^0-9]/g, '');

    // Formata o CPF
    if (valor.length <= 11) {
        if (valor.length > 3) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (valor.length > 6) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        }
        if (valor.length > 9) {
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
    }

    input.value = valor;
}

function validarTelefone(input) {
    let valor = input.value.replace(/[^0-9]/g, '');

    if (valor.length <= 11) {
        if (valor.length > 6) {
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
    }

    input.value = valor;
}