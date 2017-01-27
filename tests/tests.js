const expect = chai.expect
const anonymize = window.app.anonymize

describe('.anonymize(object, options)', () => {
  it('is immutable', () => {
    const data = {foo: true, bar: 1}
    const anonymizedData = anonymize(data)
    expect(anonymizedData).to.not.equal(data)
  })
  it('nullifies attributes when non-object', () => {
    expect(anonymize({foo: true, bar: 1})).to.deep.equal({foo: null, bar: null})
  })
  it('nullifies attributes when array', () => {
    expect(anonymize({foo: ['foo', 'bar', 'baz']})).to.deep.equal({foo: [null, null, null]})
  })
  it('nullifies attributes when object', () => {
    expect(anonymize({foo: {bar: {baz: ['foo', 'bar']}}})).to.deep.equal({foo: {bar: {baz: [null, null]}}})
  })
  it('nullifies array attributes when object', () => {
    expect(anonymize({foo: {bar: {baz: [{qux: 'foo'}]}}})).to.deep.equal({foo: {bar: {baz: [{qux: null}]}}})
  })
  it('throws an error when providing both keys to ignore and keys to anonymize', () => {
    expect(() => anonymize({}, {keysToAnonymize: ['foo'], keysToIgnore: ['bar']})).to.throw(Error)
  })
  it('does not nullify keys set as keysToIgnore', () => {
    expect(anonymize({foo: true, bar: 'hello'}, {keysToIgnore: ['foo']})).to.deep.equal({foo: true, bar: null})
  })
  it('nullifies keys set as keysToAnonymize', () => {
    expect(anonymize({foo: true, bar: 'hello'}, {keysToAnonymize: ['foo']})).to.deep.equal({foo: null, bar: 'hello'})
  })
})
