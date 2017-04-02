$(document).ready(function() {
    $('#submitButton').click(function(e) {
        $("#imagesContainer").html("");

        var words = $('#searchField').val().split(' ');

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
                    /*$("<img />", {
                        src: key.link
                    }).appendTo(".imagesContainer");*/

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
