const randomDice = [1,2,3,4,5,6]

exports.getFortune = () => {
    const idx = Math.floor(Math.random()*randomDice.length)
    return randomDice[idx]
}