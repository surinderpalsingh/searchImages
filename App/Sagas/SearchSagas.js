import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import SearchActions from '../Redux/SearchFormRedux'

const getNav = state => state.nav

export function * getSearch (api, {searchQuery}) {
  const query = {
    api_key: '72b5b9fe6862c3ddc6246c56caf7184c',
    format: 'json',
    nojsoncallback: 1,
    per_page: 30,
    page: 1,
    ...searchQuery
  }
  const response = yield call(api.searchImages, query)
  if (response.ok) {
    const photos = response.data.photos.photo.filter(item => item.url_s).map(item => item.url_s)
    yield put(SearchActions.searchFormSuccess(photos, query))
    const nav = yield select(getNav)
    const currentRoute = nav.routes[nav.routes.length - 1]
    if (currentRoute.routeName !== 'ResultScreen') {
      yield put(NavigationActions.navigate({routeName: 'ResultScreen'}))
    }
  } else {
    yield put(SearchActions.searchFormFailure())
  }
}
