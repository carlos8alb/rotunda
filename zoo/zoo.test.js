import { Animal } from './zoo'
import { test, expect } from 'vitest'

test('Lion speaks', () => {
  const lion = new Animal('Simba', 'Male', 'roar')
  expect(lion.speak("I'm a lion")).toBe("I'm roar a roar lion roar")
})

test('Tiger speaks', () => {
  const tiger = new Animal('Pumba', 'Female', 'grrr')
  expect(tiger.speak('Lions suck')).toBe('Lions grrr suck grrr')
})

test('Bee speaks', () => {
  const bee = new Animal('Timon', 'Male', 'buzz')
  expect(bee.speak('I like honey')).toBe('I buzz like buzz honey buzz')
})
