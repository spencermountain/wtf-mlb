
//
const playerStats = function(doc) {
  let players = []
  let s = doc.sections('player stats') || doc.sections('player statistics') || doc.sections('statistics')
  if (!s) {
    return players
  }

  s.children().forEach((c) => {
    c.tables().forEach((t) => {
      players = players.concat(t.keyValue())
    })
  })
  let res = {
    batters: [],
    pitchers: [],
  }
  players.forEach((p) => {
    let rbi = p.RBI || p.rbi
    let hr = p.HR || p.hr
    if (rbi !== undefined || hr !== undefined) {
      res.batters.push(p)
    } else {
      res.pitchers.push(p)
    }
  })
  return res
}
module.exports = playerStats
