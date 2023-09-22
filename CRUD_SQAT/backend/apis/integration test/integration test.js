import {fork} from 'child_process'
import {once} from 'events'
import {globby as glob} from 'globby'
import chalk from 'chalk'


const dirs = ['node', 'javascript/**/dist', 'webpack/**/dist']

const {green, red} = chalk

async function testAll() {
    const paths = await glob(dirs.map(dir => `${dir}/**/*.{js,mjs}`))
    const results = await Promise.all(paths.map(path => test(path)))
    const errs = []
    for (let i = 1; i <= results.length; i++) {
        const {path, code, err} = results[i - 1]
        if (code === 0) {
            console.log(`${i.toString().padStart(4)} ${green('✔')}  ${path}`)
        } else {
            errs.push({path, err})
            console.log(`${i.toString().padStart(4)} ${red('✖')}  ${path}`)
        }
    }

    if (errs.length > 0) {
        console.log('')
        for (let i = 1; i <= errs.length; i++) {
            const {path, err} = errs[i - 1]
            console.log(red(`${i.toString().padStart(4)} ${path}`))
            console.log(err)
        }

        process.exitCode = 1
    }

    console.log('')

    const message = `${errs.length === 0 ? green('✔') : red('✖')}  ${
        results.length - errs.length
    } of ${results.length} tests passed`
    console.log(message)
}


async function test(path) {
    const proc = fork(path, {silent: true})

    let err = ''
    proc.stderr.on('data', data => {
        err += data
    })

    const [code] = await once(proc, 'close')
    return {path, code, err}
}

testAll().catch(err => {
    console.log(err)
    process.exitCode = 1
})