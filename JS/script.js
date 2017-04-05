$(document).ready(function() {
    $('#submitButton').click(function(e) {
        $("#imagesContainer").html(""); /*Se podrá hacer que postee la foto en el gallery page? */

        var words = $('#searchField').val().split(' ');


/* This is where the magic happens!---> */
        $.each(words, function(wordKey, word) {
          $('#photo'+wordKey).data('word',word);
          $('#photo'+wordKey).find('h1').text(word);

            var request = $.ajax({
                url: "https://www.googleapis.com/customsearch/v1",
                method: "GET",
                data: {
                    async: false,
                    q: word,
                    key: 'AIzaSyD91ppLwusXYjTstGuDAupEmDFnV5BnMH4',
                    cx: '004589946511611950888:dfit4qk1ols',
                    searchType: 'image',
                    num: 1
                },
            });

            request.done(function(result) {
                $('.photo').each(function(key) {
               

                    if($(this).data('word') == result.queries.request[0].searchTerms)
                      $(this).find('img').attr('src', result.items[0].link);

                });
            });

            request.fail(function(jqXHR, textStatus) {
                alert(jqXHR.responseJSON.error.message);
            });
        });

        e.preventDefault();
    });
});


/*-- Esto es del login form. Eliminar si conflige con search bar --- */
jQuery(document).ready(function($) {
    tab = $('.tabs h3 a');

    tab.on('click', function(event) {
        event.preventDefault();
        tab.removeClass('active');
        $(this).addClass('active');

        tab_content = $(this).attr('href');
        $('div[id$="tab-content"]').removeClass('active');
        $(tab_content).addClass('active');
    });
});