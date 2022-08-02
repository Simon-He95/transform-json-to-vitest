import { describe, expect, it, test } from 'vitest'
describe.skip('hi', async () => {
  it('should works', () => {
    const a = 2
    expect(a).toEqual(2)
  })
  it('should works', () => {
    const a = 2
    expect(a).toMatchInlineSnapshot()
  })
  test('should works', () => {
    const a = 2
    expect(a).toEqual(2)
  })
})
describe('hi', async () => {
  it('should works', () => {
    const a = 2
    expect(a).toEqual(2)
  })
  it('should works', () => {
    const a = 2
    expect(a).toMatchInlineSnapshot()
  })
})
