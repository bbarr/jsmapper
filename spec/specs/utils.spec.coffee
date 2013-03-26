define (require) ->

  utils = require('utils')

  describe 'utils', ->

    describe '.asMixin', ->

      a = null
      Mixer = -> @prop = 1
      Mixer.prototype.method = (->)
      beforeEach ->
        a = {}

      it 'should create a mixin calling given constructor', ->
        utils.asMixin(Mixer).call(a)
        expect(a.prop).toBeDefined()

      it 'should create a mixin that tries to decorate from prototype', ->
        utils.asMixin(Mixer).call(a)
        expect(a.method).toBeDefined()

