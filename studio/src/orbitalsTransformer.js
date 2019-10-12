import randomColor from 'randomcolor'

const colors = {}

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getColor(key) {
  if (!colors[key]) {
    colors[key] = randomColor()
  }
  return colors[key]
}

// the heavier, the larger
function massToRadius(mass) {
  return mass * 15
}

const transformDocument = doc => {
  console.log(`-->1 ${doc._id}`, doc)
  const {_type} = doc
  if (!_type) {
    return null
  }
  console.log(`-->2 ${doc._id}`, doc)

  const mass = randomIntFromInterval(0.2, 2)
  const radius = massToRadius(mass)

  return {
    radius: radius,
    mass: mass,
    solid: true,
    percentDistanceFromCenter: randomIntFromInterval(20, 90),
    sides: 1, //randomIntFromInterval(0, 7),
    render: {
      fillStyle: getColor(_type),
      opacity: 0.7
    }
  }
}

module.exports = {
  transformDocument
}
