$(document).ready(function () {
    let keysToIgnore

    $('#anonymisation').on('submit', function () {
        keysToIgnore = $('input[name="keysToIgnore"]').val().split(/ |, ?/)
        const objectToAnonymize = JSON.parse($('textarea[name="json-source"]').val())
        removeValues(objectToAnonymize)

        $('#result').text(JSON.stringify(objectToAnonymize))
        return false
    })
})
