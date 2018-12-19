
const parseTeam = function(txt) {
  if (!txt) {
    return {}
  }
  let away = /^ *@ */.test(txt)
  return {
    name: txt.replace(/^ *\@ */, ''),
    home: !away
  }
}

const parseRecord = function(txt) {
  if (!txt) {
    return {}
  }
  let arr = txt.split(/(–|-|&ndash;)/)
  let obj = {
    wins: parseInt(arr[0], 10),
    losses: parseInt(arr[2], 10),
  }
  obj.games = obj.wins + obj.losses
  let plusMinus = obj.wins / obj.games
  obj.plusMinus = Number(plusMinus.toFixed(2))
  return obj
}

const parseScore = function(txt) {
  if (!txt) {
    return {}
  }
  let arr = txt.split(/(–|-|&ndash;)/)
  let obj = {
    winner: parseInt(arr[0], 10),
    loser: parseInt(arr[2], 10),
  }
  if (isNaN(obj.winner) || isNaN(obj.loser)) {
    return {}
  }
  return obj
}

const parseAttendance = function(txt = '') {
  //support [[Rogers Center]] (23,987)
  if (txt.indexOf('(') !== -1) {
    let m = txt.match(/\(([0-9 ,]+)\)/)
    if (m && m[1]) {
      txt = m[1]
    }
  }
  txt = txt.replace(/,/g, '')
  return parseInt(txt, 10)
}
const parseDate = function(txt) {
  if (!txt) {
    return null
  }
  return txt
}

const parseRow = function(row) {
  if (!row) {
    return null
  }
  let team = parseTeam(row.opponent || row.Opponent)
  let record = parseRecord(row.record || row.Record)
  let obj = {
    date: parseDate(row.date || row.Date),
    team: team.name || team.Name,
    home: team.home || team.Home,
    result: parseScore(row.score || row.Score || row['box score'] || row['Box Score']),
    record: record,
    attendance: parseAttendance(row.attendance || row.Attendance || row['location (attendance)'] || row['Location (Attendance)'])
  }
  return obj
}
module.exports = parseRow
