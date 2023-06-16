// For this solution I create the class Animal, with props and methods.
// In the speak method, I conver the string in array and using the map
// operator, I return the new string concatenated with the animal sound.

export class Animal {
  constructor(name, gender, sound) {
    this.name = name
    this.gender = gender
    this.sound = sound
  }

  speak(input = '') {
    const text = input
      .split(' ')
      .map((word) => `${word} ${this.sound} `)
      .join('')
      .trim()

    return text
  }
}
