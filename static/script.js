// $(document).ready(function() {
//     $("#botao").click(function() {
//         const parametro = $("#parametro").val();  // Pega o valor do input
//         $.ajax({
//             url: "/executar",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify({ parametro: parametro }),  // Envia o parâmetro
//             success: function(response) {
//                 $("#resultado").text(response.mensagem);  // Exibe o resultado
//             },
//             error: function() {
//                 alert("Erro ao executar a função.");
//             }
//         });
//     });
// });