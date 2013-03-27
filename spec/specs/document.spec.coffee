define (require) ->

  asDocument = require('document')

  describe 'document', ->

    Animal = null
    a = null
    beforeEach ->
      Animal = asDocument () ->
        @key 'name'
        @validate 'name', ((name) -> name.length > 2 && name.length < 10), 'must be between 2 and 10 characters'
      a = new Animal

    describe '#meta', ->
      
      it 'should fetch a _meta property', ->
        expect(a.meta('keys')).toEqual({ name: {} })

      it 'should set a _meta property', ->
        a.meta('foo', 'bar')
        expect(a.meta('foo')).toBe('bar')

    describe '#key', ->

      it 'should add a key', ->
        expect(a._meta.keys.name).toBeDefined()
        expect(a.name).not.toBe(null)

    describe '#toJSON', ->

      it 'should return an object of just keyed properties', ->
        a.name = 'cat'
        a.attitude = 'sassy'
        data = a.toJSON()
        expect(data.name).toBe('cat')
        expect(data.attitude).not.toBeDefined()

    describe '#validate', ->

    describe '#is_valid', ->

      it 'should work', ->
        a.name = 'bo'
        expect(a.isValid()).toBe(false)
        expect(a._meta.errors.name[0]).toBe('must be between 2 and 10 characters')

    describe '#each', ->

      it 'should iterate over properties that are defined as keys', ->
        a.each (v, k) -> expect(a._meta.keys[k]).toBeDefined()