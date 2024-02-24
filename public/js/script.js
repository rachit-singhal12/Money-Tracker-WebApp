$(document).ready(function(){
    $('#expense-form').submit(function(){
        var itemName = $('#Item-name').val().trim();
        var itemPrice = $('#Item-price').val().trim();
        itemPrice = Number(itemPrice);
        if(itemName === '') {
            $('#Item-name').after('<span class="error">Name Field is required</span');
            return false;
        }

        if(itemPrice === '') {
            $('#Item-price').after('<span class="error">Price Field is required</span');
            return false;
        }

        if (isNaN(itemPrice)) {
            $('#Item-price').after('<span class="error">The input value must be an valid number</span');
            return false;
        } 
        alert("Transaction added successfully");

        return true;
    });
});