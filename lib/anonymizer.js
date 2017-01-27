(function() {
    window.app = window.app ||  {}
    window.app.anonymize = function anonymize (obj, options) {
      options = options || {}
      options.keysToIgnore = options.keysToIgnore || []
      options.keysToAnonymize = options.keysToAnonymize || []
      if (options.keysToIgnore.length && options.keysToAnonymize.length) {
        throw new Error('Lists ignore and anonymize cannot be both provided.')
      }

      if (!isObject(obj) && !isArray(obj)) {
        return null
      }

      if (isArray(obj)) {
        return obj.map(value => anonymize(value, options))
      }

      const copy = JSON.parse(JSON.stringify(obj))
      for (const key in copy) {
        if (!options.keysToAnonymize.length && !options.keysToIgnore.length) {
          copy[key] = anonymize(copy[key], options)
        }

        const keyShouldBeAnonymized = shouldBeAnonymized(key, options.keysToAnonymize)
        const keyShouldBeIgnored = shouldBeIgnored(key, options.keysToIgnore)
        if (keyShouldBeAnonymized || !keyShouldBeIgnored) {
          copy[key] = anonymize(copy[key], options)
        }
      }

      return copy
    }

    function shouldBeIgnored(key, keysToIgnore) {
      return !keysToIgnore.length || keysToIgnore.indexOf(key) !== -1
    }

    function shouldBeAnonymized(key, keysToAnonymize) {
      return keysToAnonymize.length && keysToAnonymize.indexOf(key) !== -1
    }

    function isArray (value) {
      return Array.isArray(value)
    }

    function isObject (value) {
      return Object.prototype.toString.call(value) === '[object Object]'
    }
})()
