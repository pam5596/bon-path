import { expect, test } from 'vitest'

test('console.logなどのログが表示されていること', () => {
    console.log('Hello, world!')
})

test('1 + 1 が 2 であること', () => {
    expect(1 + 1).toBe(2)
})