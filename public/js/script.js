$(document).ready(function(){
    $('#expense-form').submit(function(){
        var itemName = $('#Item-name').val().trim();
        var itemPrice = $('#Item-price').val().trim();
        
        
        if(itemName === '') {
            $('#Item-name').after('<span class="error">This Field is required</span><br>');
            return false;
        }

        if(itemPrice === '') {
            $('#Item-price').after('<span class="error">Price Field is required</span><br>');
            return false;
        }

        if (isNaN(itemPrice)) {
            itemPrice = Number(itemPrice);
            $('#Item-price').after('<span class="error">The input value must be an valid number</span><br>');
            return false;
        } 
        alert("Transaction added successfully");

        return true;
    });
});