$(function() {
    // var $insert=$('#dd1');
    $('#pre').hide();
    $('#next').hide();
    var page = 0;
    var $del = $('#dd1');
    var movieTemplate = $('#movieTemplate').html();

    function adddata(add) {
        $del.append(Mustache.render(movieTemplate, add));

    }



    $('#btn2').on('click', function() {
         $del.empty();
        var id = $('#name').val();


        //var =$id.val();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/details?id=' + id,
            // url: 'http://localhost:8080/details',
            success: function(data) {
                console.log("success", data);
                 $del.html('<tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>Gender</th> <th>Email</th> <th>Phone</th> </tr>');
                $.each(data, function(i, item) {
                    console.log(item);
                    // $del.append(Mustache.render(movieTemplate,item));
                    adddata(item);


                });

            }
        });
    });



    $('#btnload').on('click', function() {
      $del.html('<tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>Gender</th> <th>Email</th> <th>Phone</th> </tr>');

        $('#pre').show();
        $('#next').show();
        if(page==0)
        {
          $('#pre').prop('disabled',true);
        }

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/details/?_start=' + page + '&_limit=10',
            success: function(data) {

                console.log("success", data);

                $.each(data, function(i, item) {
                    console.log(item);
                    // $del.append(Mustache.render(movieTemplate,item));
                    adddata(item);


                });
            }
        });
    });

    $('#next').on('click', function() {
         $del.empty();
 page = page + 10;
   if(page>0)
        {
          $('#pre').prop('disabled',false);
        }

       
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/details/?_start=' + page + '&_limit=10',
            success: function(data) {
 $del.html('<tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>Gender</th> <th>Email</th> <th>Phone</th> </tr>');
                console.log("success", data);

                $.each(data, function(i, item) {
                    console.log(item);
                    // $del.append(Mustache.render(movieTemplate,item));
                    adddata(item);

                });
            }
        });
    });
$('#pre').on('click', function() {
     $del.empty();

 page = page - 10;
 if(page<0)
        {
          $('#pre').prop('disabled',true);
        }
        if(page<10)
        {
          $('#pre').prop('disabled',true);
        }
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/details/?_start=' + page + '&_limit=10',
            success: function(data) {
              $del.html('<tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>Gender</th> <th>Email</th> <th>Phone</th> </tr>');
                console.log("success", data);


                $.each(data, function(i, item) {
                    console.log(item);
                    // $del.append(Mustache.render(movieTemplate,item));
                    adddata(item);

                });
            }
        });
    });


    $del.delegate('#rem', 'click', function() {
        console.log("clicked");
        var $tr = $(this).closest('tr');
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/details/' + $(this).attr('data-id'),
            success: function() {
                console.log("success");
                $tr.fadeOut(300, function() {
                    $(this).remove();
                });

            }

        });
    });


    $('#frm').on('submit', function(event) {
        event.preventDefault();

        var add = {
            name: $('#name1').val(),
            age: $('#age').val(),
            gender: $('#gender').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/details',
            data: add,
            success: function(data) {
                console.log(data);
                 $del.html('<tr> <th>Id</th> <th>Name</th> <th>Age</th> <th>Gender</th> <th>Email</th> <th>Phone</th> </tr>');
                adddata(data);
                //$del.append(Mustache.render(movieTemplate,data));
                $('#frm')[0].reset();


            },

            error: function() {
                console.log("Error");
            }


        });

    });



    $del.delegate('.editOrder', 'click', function() {
        console.log("clicked");
        var $tr = $(this).closest('tr');
        $tr.find('input.name').val($tr.find('span.name').html());
        $tr.find('input.age').val($tr.find('span.age').html());
        $tr.find('input.gender').val($tr.find('span.gender').html());
        $tr.find('input.email').val($tr.find('span.email').html());
        $tr.find('input.phone').val($tr.find('span.phone').html());
        $tr.find('td').addClass('edit');

    });


    $del.delegate('.cancelEdit', 'click', function() {
        console.log("clicked");
        $(this).closest('tr').find('td').removeClass('edit');

    });

    $del.delegate('.saveEdit', 'click', function() {
        console.log("clicked");
        var $tr = $(this).closest('tr');
        var add = {
            name: $tr.find('input.name').val(),
            age: $tr.find('input.age').val(),
            gender: $tr.find('input.gender').val(),
            email: $tr.find('input.email').val(),
            phone: $tr.find('input.phone').val(),
        };
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/details/' + $(this).attr('data-id'),
            data: add,
            success: function(data) {
                console.log(data);
                // adddata(data);
                //$del.append(Mustache.render(movieTemplate,data));
                $tr.find('span.name').html(add.name);
                $tr.find('span.age').html(add.age);
                $tr.find('span.gender').html(add.gender);
                $tr.find('span.email').html(add.email);
                $tr.find('span.phone').html(add.phone);
                $tr.find('td').removeClass('edit');
            },
            error: function() {
                console.log("Updating Error");
            }

        });

    });
});
