define (require) ->

  utils = require('utils')

  describe 'utils', ->

    describe '.asMixin', ->

      a = null
      Mixer = -> @prop = 1
      mixerProps = method: (->)
      beforeEach ->
        a = ->

      it 'should create a mixin calling given constructor', ->
        utils.asMixer(Mixer, mixerProps)(a)
        expect(a.prop).toBeDefined()

      it 'should create a mixin that tries to decorate from prototype', ->
        utils.asMixer(Mixer, mixerProps)(a)
        expect(a.method).toBeDefined()
