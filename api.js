const key = Deno.env.get('YELP_KEY')
const auth = { Authorization: `Bearer ${key}` }

if (!key) throw 'no yelp API key (YELP_KEY) found in env ):'

const URL_BASE         =            'https://api.yelp.com/v3/'
const URL_SEARCH       = URL_BASE + 'businesses/search'
const URL_BUSINESS     = URL_BASE + 'businesses/'
const URL_AUTOCOMPLETE = URL_BASE + 'autocomplete'

const query =
	url => params =>
		fetch(`${url}?${new URLSearchParams(params).toString()}`, { headers: auth })
			.then(r => r.json())

const yelp_business =
	business_id =>
		query(URL_BUSINESS + business_id)({})

const yelp_search =
	(latitude, longitude) => term =>
		query(URL_SEARCH)({ term, latitude, longitude, categories: 'restaurants,food,bars'})

const yelp_autocomplete =
	(latitude, longitude) => text =>
		query(URL_AUTOCOMPLETE)({ text, latitude, longitude })