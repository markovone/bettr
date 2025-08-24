export default function utc(p) 
{
    if (Array.isArray(p)) {
        return utc(Date.UTC(...p))
    }

    if (!Number.isInteger(p)) {
        return utc(
            p ? new Date(p).getTime() : new Date().getTime()
        )
    }

    return Object.create(protoUTC, {
        timestamp: { value: p }
    })
}
    
    
const protoUTC = {
    format(params)
    {
        const { locale = 'en-CA', ...options } = params || { timezone: 'UTC' }    

        return this.getJSDate().toLocaleDateString(locale, options)
    },

    toArray()
    {
        const d = this.getJSDate()

        return [
            d.getUTCFullYear(),
            d.getUTCMonth(),
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds()
        ]
    },

    toDateArray()
    {
        const d = this.getJSDate()

        return [
            d.getUTCFullYear(),
            d.getUTCMonth() + 1,
            d.getUTCDate(),
        ]
    },

    getJSDate(v)
    {
        return new Date(v || this.timestamp)
    },

    getTimestamp()
    {
        return this.timestamp
    },

    getDay()
    {
        return this.getJSDate().getDate()
    },

    getDayOfWeek()
    {
        return this.getJSDate().getDay()
    },

    getDateString()
    {
        return this.getJSDate().toISOString().slice(0, 10)
    },

    test()
    {
        return 'B'
    }
}

export const areInSameWeek = (d1, d2) => {
    const offset = (d1.getDayOfWeek() || 7) * 86400000
    const left = d1.getTimestamp() - (-86400000 + offset)
    const right = d1.getTimestamp() + (7*86400000 - offset) 

    return d2.getTimestamp() >= left && d2.getTimestamp() <= right
}

export const isSameDay = (d1, d2) => {
    const compared = d2.toArray()

    return d1.toArray().slice(0, 3).reduce(
        (ac, cv, i) => ac * Number(cv === compared[i]), 1
    )
}

export const isSameDayOfWeek = (d1, d2) => {
    return d1.getDayOfWeek() === d2.getDayOfWeek()
}