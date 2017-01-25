$(document).ready(function () {
    let keysToIgnore

    $('#anonymisation').on('submit', function () {
        keysToIgnore = $('input[name="keysToIgnore"]').val().split(' ')
        const objectToAnonymize = JSON.parse($('textarea[name="json-source"]').val())
        removeValues(objectToAnonymize)

        $('#result').text(JSON.stringify(objectToAnonymize))
        return false
    })

    function removeValues(node) {
        if (isObject(node)) {
            for (let key in node) {
                if (keysToIgnore.indexOf(key) === -1) {
                    if (isObject(node[key])) {
                        removeValues(node[key])
                    } else if (Array.isArray(node[key])) {
                        node[key].forEach(removeValues)
                    } else {
                        node[key] = null
                    }
                }
            }
        } else if (isString(node)) {
            node = null
        }
    }

    function isObject (value) {
      return Object.prototype.toString.call(value) === '[object Object]';
    };

    function isString (value) {
      return Object.prototype.toString.call(value) === '[object String]';
    };
})