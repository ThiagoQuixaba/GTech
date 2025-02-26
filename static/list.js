$(document).ready(function() {
    $.ajax({
        url: "/obter_objetos",
        type: "GET",
        success: function(objetos) {
            console.log("Lista de objetos carregada:", objetos);

            const lista = $("#tabela-objetos");
            objetos.forEach(objeto => {
                lista.append(`
                    <tr id="row-${objeto.cpf}">
                        <td>${objeto.nome}</td> 
                        <td>${objeto.cpf}</td>
                        <td>${objeto.telefone}</td>
                        <td>${objeto.email}</td>
                        <td>${objeto.estado}</td>
                        <td>${objeto.cidade}</td>
                        <td>${objeto.bairro}</td>
                        <td>${objeto.rua}</td>
                        <td>${objeto.endereco}</td>
                        <td>
                            <button class="edit button" data-cliente='${JSON.stringify(objeto)}'>
                                <img src="../static/edit_icon.png" width="20" height="20">
                            </button>
                            <button class="delete button" data-cpf="${objeto.cpf}">
                                <img src="../static/delete_icon.png" width="20" height="20">
                            </button>
                        </td>
                    </tr>
                `);
            });

            $(".delete").on("click", function() {
                const cpf = $(this).data("cpf");
                $.ajax({
                    url: "/deletar_cliente",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ cpf: cpf }),
                    success: function(response) {
                        console.log("Cliente deletado com sucesso:", response);
                    },
                    error: function(xhr, status, error) {
                        console.error("Erro ao deletar cliente:", error);
                    }
                });
                location.reload();
            });
            
            $(".edit").on("click", function() {
                const cliente = $(this).data("cliente");
                localStorage.setItem("edit_cliente", JSON.stringify(cliente));
                window.location.href = "/edit";
            });
        },
        error: function() {
            console.log("Erro ao carregar a lista de objetos.");
        }
    });
});