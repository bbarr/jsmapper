fs = require('fs')
path = require('path')

desc 'Run our specs.'
task 'spec', [], (spec) ->

  jake.exec [ 'coffee --output ./spec/build/ --compile ./spec/specs/' ], ->

    paths = new jake.FileList()
      .include('./spec/build/**/*.spec.js')
      .map((p) -> p.replace(/\\/g, '/'))
      .map((p) -> p.replace(/^spec\//, ''))
      .map((p) -> "'#{p}'" )
      .filter((p) -> if spec? then p.indexOf(spec) > -1 else true)
      .join(',')


    fs.writeFile './spec/build/index.js', "define([#{paths}])", ->
      jake.exec [ 'phantomjs ./spec/support/phantom-runner.js ./spec/runner.html' ], { printStdout:true, printStderr:true, breakOnError:false }

desc 'Run integration suite.'
task 'integration', [], (test) ->

  paths = new jake.FileList()
    .include('./integration/flows/**/*.coffee')
    .map((p) -> p.replace(/\\/g, '/'))
    .filter((p) -> if test? then p.indexOf(test) > -1 else true)
    
  server = process.env.server || 'localhost:1234'
  run_test = (path) ->
    jake.exec [ "casperjs test --server=#{server} --includes=./integration/lib.coffee,./integration/steps.coffee,./integration/matchers.coffee #{path}" ], (->
      run_test(paths.pop()) if paths.items[0]
    ), { printStdout:true, printStderr:true, breakOnError:false }

  run_test(paths.pop())

desc 'Run all the tests!!1'
task 'test', [ 'integration', 'spec' ], ->
