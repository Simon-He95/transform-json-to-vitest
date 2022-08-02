import fs from 'fs'
import { cwd } from 'process'
import { resolve } from 'path'
import ora from 'ora'
import { getPkg } from 'simon-js-tool'
import type { VitestJSONItem } from './types'

export async function transformJsonToVitest() {
  const spinner = ora({ text: 'Loading transform the vitest.json', color: 'yellow' }).start()
  try {
    const json = await getPkg('vitest.json')
    const { dependency, name } = json
    const outputPath = resolve(cwd(), `test/${name}.test.ts`)
    let dep = -1
    const content = generateExpression(json as VitestJSONItem, 'describe', (item) => {
      const it = generateExpression(item, 'it')
      dep--
      const test = generateExpression(item, 'test')
      dep--
      return it + (test && `\n${test}`)
    })
    try {
      fs.writeFileSync(outputPath, `${dependency}\n${content}`)
      spinner.succeed(`transform successfully to ${outputPath}`)
    }
    catch (error: any) {
      spinner.fail(error?.message)
    }

    function generateExpression(item: VitestJSONItem, type: 'it' | 'test' | 'describe', callback?: (it: any) => string) {
      dep++
      return item?.[type]?.map((it) => {
        const _it = `${generateSpace()}${type}${it?.command ? `.${it?.command}` : ''}('${it.name}', ${it?.type === 'async' ? 'async ' : ''}() => {
  ${callback ? callback?.(it) : `${generateSpace()}${generateSpace()}${it?.expression}\n` + `${generateSpace()}${generateSpace()}expect(${it.expect}).${it.to}(${it?.result});`}
  ${generateSpace()}})`
        return _it
      }).join('\n') || ''
    }
    function generateSpace() {
      let space = ''
      for (let i = 0; i < dep; i++)
        space += '  '

      return space
    }
  }
  catch (error: any) {
    spinner.fail(error?.message)
  }
}

transformJsonToVitest()
