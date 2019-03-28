const WISH_LIST = 'WISH_LIST'
const WATCH_LIST = 'WATCH_LIST'

export default { isWishList, isWatchList, toDisplayName, WISH_LIST, WATCH_LIST }

function isWishList (film) {
  return film.parentList === WISH_LIST
}

function isWatchList (film) {
  return film.parentList === WATCH_LIST
}

function toDisplayName (film) {
  const { parentList } = film
  return parentList.replace('_', ' ').toLowerCase()
}
