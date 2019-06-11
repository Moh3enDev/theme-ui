import { jsx } from '../src/jsx'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('custom pragma adds styles', () => {
  const json = renderJSON(
    jsx('div', {
      scss: {
        mx: 'auto',
        p: 2,
        bg: 'tomato',
      }
    })
  )
  expect(json).toHaveStyleRule('margin-left', 'auto')
  expect(json).toHaveStyleRule('margin-right', 'auto')
  expect(json).toHaveStyleRule('padding', '8px')
  expect(json).toHaveStyleRule('background-color', 'tomato')
})

test('adds raw values with css prop', () => {
  const json = renderJSON(
    jsx('div', {
      css: {
        margin: 4,
      }
    })
  )
  expect(json).toHaveStyleRule('margin', '4px')
})

test('scss and css prop can be used together', () => {
  const json = renderJSON(
    jsx('div', {
      css: {
        margin: 0,
      },
      scss: {
        bg: 'tomato',
      }
    })
  )
  expect(json).toHaveStyleRule('background-color', 'tomato')
  expect(json).toHaveStyleRule('margin', '0')
})
