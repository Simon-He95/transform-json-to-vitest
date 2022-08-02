export interface VitestJSONItem {
  dependency?: string
  name?: string
  type?: 'async'
  command?: string
  expression?: string
  expect?: string
  to?: string
  result?: string
  it?: VitestJSONItem[]
  test?: VitestJSONItem[]
  describe?: VitestJSONItem[]
}
