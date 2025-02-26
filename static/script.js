$(document).ready(function() {
    $("#exit").click(function() {
        $.ajax({
            url: "/shutdown",
            type: "GET",
        });
    });
});