const { tryAQuery } = require('../api/index.js')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const byname = require('../data-stores/byName-keyed-object.json')

rl.setPrompt(
    'Type a name of a restaurant, cusine or number rating to get results> '
)
rl.prompt()

rl
    .on('line', function(line) {
        const input = line.trim()
        if (input) {
            console.log(tryAQuery(input))
        }
        rl.prompt()
    })
    .on('close', function() {
        console.log('Closing program...')
        process.exit(0)
    })
