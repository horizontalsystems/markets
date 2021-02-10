import Utils from '../utils/utils'

class GlobalDefiMarkets {
    constructor(marketCap, marketCapDiff24h, volume24h, volume24hDiff,
        totalValueLocked, tvlDiff24h, dominanceCoin, dominance) {
        this.marketCap = Number.parseFloat(marketCap)
        this.volume24h = Number.parseFloat(volume24h)
        this.totalValueLocked = Number.parseFloat(totalValueLocked)
        this.totalValueLockedDiff24h = Number.parseFloat(tvlDiff24h)
        this.marketCapDiff24h = Number.parseFloat(marketCapDiff24h)
        this.volume24hDiff = Number.parseFloat(volume24hDiff)
        this.dominanceCoin = dominanceCoin
        this.dominance = Number.parseFloat(dominance)
    }

    formatted() {
        return {
            dominanceCoin: this.dominanceCoin,
            dominance: this.dominance.toFixed(1),
            marketCap: Utils.abbreviateNumber(this.marketCap, 1),
            marketCapDiff24h: this.marketCapDiff24h.toFixed(1),
            volume24h: Utils.abbreviateNumber(this.volume24h, 1),
            volume24hDiff: this.volume24hDiff.toFixed(1),
            totalValueLocked: Utils.abbreviateNumber(this.totalValueLocked, 1),
            totalValueLockedDiff24h: this.totalValueLockedDiff24h.toFixed(1)
        }
    }
}

export default GlobalDefiMarkets
