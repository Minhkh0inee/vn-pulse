// Chat
export const MAX_MESSAGES = 20
export const WORD_LIMIT = 60

// Cache TTLs (seconds)
export const CACHE_TTL_SHORT = 3600   // 1 h — mutable index data
export const CACHE_TTL_LONG  = 86400  // 24 h — archived/immutable data
export const CACHE_TTL_POLL  = 300    // 5 min — poll results (changes frequently)

// ISR revalidation (seconds)
export const REVALIDATE_DEFAULT = 3600
export const REVALIDATE_ARCHIVE = 86400

// Data fetch limits
export const LAST_N_MONTHS = 6

// AI generation
export const INSIGHT_COUNT             = 3
export const INSIGHT_WORD_LIMIT        = 20
export const SECTOR_SUMMARY_WORD_LIMIT = 40
export const COMMENTARY_MAX_TOKENS     = 800

// Poll rating scale
export const POLL_RATING_MIN = 1
export const POLL_RATING_MAX = 5
