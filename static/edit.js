$(document).ready(function() {
    const clienteString = localStorage.getItem("edit_cliente");
    if (!clienteString) {
        alert("cliente não encontrado. Redirecionando para a lista de clientes.");
        window.location.href = "list.html";
        return;
    }
    const cliente = JSON.parse(clienteString);

    $("#nome").val(cliente.nome);
    $("#cpf").val(cliente.cpf);
    $("#telefone").val(cliente.telefone);
    $("#email").val(cliente.email);
    $("#estado").val(cliente.estado);
    $("#cidade").val(cliente.cidade);
    $("#bairro").val(cliente.bairro);
    $("#rua").val(cliente.rua);
    $("#numero").val(cliente.endereco);

    $("#formulario").submit(function(event) {
        event.preventDefault(); 
        const dados = {
            cliente: cliente.cpf,
            telefone_atual: cliente.telefone,
            email_atual: cliente.email,
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
            url: "/processar_alteracao",
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
    let valor = input.value.replace(/[^0-9]/g, '');
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