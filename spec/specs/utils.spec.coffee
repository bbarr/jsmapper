define (require) ->

  utils = require('utils')

  describe 'utils', ->

    describe '.asParent', ->

      Child = null
      Parent = -> @prop = 1
      Parent.foo = 'bar'
      Parent.prototype.method = ->
      beforeEach ->
        Child = ->

      describe 'the returned parent', ->

        it 'should decorate instance', ->
          a = new (utils.asParent(Parent)(Child))
          expect(a.prop).toBeDefined()

        it 'should decorate prototype', ->
          a = new (utils.asParent(Parent)(Child))
          expect(a.method).toBeDefined()

        it 'should decorate constructor', ->
          Child = utils.asParent(Parent)(Child)
          expect(Child.foo).toBe('bar')
