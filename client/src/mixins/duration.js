import moment from 'moment'

const ONE_MINUTE = 60
const ONE_HOUR = 3600
const ONE_DAY = 86400
const ONE_WEEK = 604800
const ONE_MONTH = 2592000

let filter = {
  methods: {
    humanize (items) {
      let ts = 0
      items.forEach((item) => {
        ts += moment.duration(item.duration).seconds()
        ts += moment.duration(item.duration).minutes() * ONE_MINUTE
        ts += moment.duration(item.duration).hours() * ONE_HOUR
        ts += moment.duration(item.duration).days() * ONE_DAY
        ts += moment.duration(item.duration).weeks() * ONE_WEEK
        ts += moment.duration(item.duration).months() * ONE_MONTH
      })

      let months = Math.floor(ts / ONE_MONTH)
      let weeks = Math.floor((ts % ONE_MONTH) / ONE_WEEK)
      let days = Math.floor((ts % ONE_WEEK) / ONE_DAY)
      let hours = Math.floor((ts % ONE_DAY) / ONE_HOUR)
      let minutes = Math.floor((ts % ONE_HOUR) / ONE_MINUTE)
      let seconds = Math.floor(ts % ONE_MINUTE)

      let humanize = ''
      humanize += months + 'mois '
      humanize += weeks + 'sem '
      humanize += days + 'jrs '
      humanize += hours + 'hrs '
      humanize += minutes + 'min '
      humanize += seconds + 'sec'

      return humanize
    }
  }
}

export default filter
