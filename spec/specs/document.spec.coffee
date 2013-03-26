define (require) ->

  asDocument = require('document')

  describe 'document', ->

    Animal = null
    beforeEach ->
      Animal = () ->
        asDocument.call(this)

        @key 'name'

    describe '#key', ->

      it 'should add a key', ->
        a = new Animal
        expect(a.keys.name).toBeDefined()

    
