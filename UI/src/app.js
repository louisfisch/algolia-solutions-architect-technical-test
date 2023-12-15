import 'dotenv/config'

import '@algolia/autocomplete-theme-classic';

import algoliasearch from 'algoliasearch/lite';
import historyRouter from 'instantsearch.js/es/lib/routers/history';
import instantsearch from 'instantsearch.js';

import { autocomplete } from '@algolia/autocomplete-js';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

import {
    clearRefinements,
    configure,
    hierarchicalMenu,
    hits,
    menu,
    numericMenu,
    pagination,
    ratingMenu,
    refinementList,
    sortBy,
    toggleRefinement,
} from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_ONLY_API_KEY
);

const instantSearchRouter = historyRouter();

const virtualSearchBox = connectSearchBox(() => {});

const search = instantsearch({
    indexName: process.env.ALGOLIA_INDEX_NAME,
    insights: true,
    routing: instantSearchRouter,
    searchClient,
});

search.addWidgets([
    clearRefinements({
        container: '#clear-refinements',
        templates: {
            resetLabel({ hasRefinements }, { html }) {
                return html`${hasRefinements ? 'Clear all filters' : 'No filter applied'}`;
            },
        },
    }),

    configure({
        hitsPerPage: 16,
    }),

    hierarchicalMenu({
        container: '#filter-category',
        attributes: [
            'hierarchicalCategories.lvl0',
            'hierarchicalCategories.lvl1',
            'hierarchicalCategories.lvl2',
            'hierarchicalCategories.lvl3',
            'hierarchicalCategories.lvl4',
        ],
        showParentLevel: true,
    }),

    hits({
        container: '#hits',
        templates: {
            item: (hit, { html, components }) => html`
                <article>
                    <div class="hit-image"><img src="${hit.image}"/></div>
                    <p class="hit-rating">${Array.from(Array(hit.rating).keys()).map(() => html`
                        <svg class="ais-RatingMenu-starIcon ais-RatingMenu-starIcon--full" aria-hidden="true" width="24" height="24"><use href="#ais-RatingMenu-starSymbol"></use></svg>
                    `)}</p>
                    <h1 class="hit-name">${components.Highlight({ hit, attribute: 'name' })}</h1>
                    <!-- <h2 class="hit-brand">${components.Highlight({ hit, attribute: 'brand' })}</h2> -->
                    <p class="hit-price">$${components.Highlight({ hit, attribute: 'price' })}</p>
                    <!-- <p class="hit-description">${components.Highlight({ hit, attribute: 'description' })}</p> -->
                    ${hit.free_shipping ? html`<p class="hit-free-shipping"><span class="free-shipping-label">Free shipping</span></p>` : ''}
                </article>
            `,
        },
    }),

    menu({
        container: '#filter-type',
        attribute: 'type',
        limit: 10,
        showMore: true,
        sortBy: ['name:asc'],
    }),

    numericMenu({
        container: '#filter-price',
        attribute: 'price',
        items: [
            { label: 'All' },
            { label: '≤ $50', end: 50 },
            { label: '$50 - $100', start: 50, end: 100 },
            { label: '$100 - $200', start: 100, end: 200 },
            { label: '$200 - $500', start: 200, end: 500 },
            { label: '$500 - $1000', start: 500, end: 1000 },
            { label: '$1000 - $2000', start: 1000, end: 2000 },
            { label: '≥ $2000', start: 2000 },
        ],
    }),

    pagination({
        container: '#pagination',
    }),

    ratingMenu({
        attribute: 'rating',
        container: '#filter-rating',
        max: 6,
    }),

    refinementList({
        attribute: 'brand',
        container: '#filter-brand',
        limit: 10,
        showMore: true,
        sortBy: ['name:asc'],
    }),

    // searchBox({
    //     container: '#search-box',
    //     searchAsYouType: false,
    // }),

    sortBy({
        container: '#sort-by',
        items: [
            {
                value: process.env.ALGOLIA_INDEX_NAME,
                label: 'Most relevant',
            }, {
                value: `${process.env.ALGOLIA_INDEX_NAME}_price_asc`,
                label: 'Lowest price',
            }, {
                value: `${process.env.ALGOLIA_INDEX_NAME}_price_desc`,
                label: 'Highest price',
            },
        ],
    }),

    toggleRefinement({
        attribute: 'free_shipping',
        container: '#filter-free-shipping',
        templates: {
            labelText() {
                return `Free shipping`;
            },
        },
    }),

    virtualSearchBox({}),
]);

search.start();

function setInstantSearchUiState(indexUiState) {
    search.setUiState(uiState => ({
        ...uiState,
        [process.env.ALGOLIA_INDEX_NAME]: {
            ...uiState[process.env.ALGOLIA_INDEX_NAME],
            page: 1,
            ...indexUiState,
        },
    }));
}

function getInstantSearchUiState() {
    const uiState = instantSearchRouter.read();

    return (uiState && uiState[process.env.ALGOLIA_INDEX_NAME]) || {};
}

const searchPageState = getInstantSearchUiState();

let skipInstantSearchUiStateUpdate = false;

autocomplete({
    container: '#autocomplete',
    detachedMediaQuery: 'none',
    insights: true,
    initialState: {
        query: searchPageState.query || '',
    },
    onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
    },
    onReset() {
        setInstantSearchUiState({ query: '' });
    },
    openOnFocus: true,
    placeholder: 'Search for products',
    plugins: [
        createQuerySuggestionsPlugin({
            searchClient,
            indexName: `${process.env.ALGOLIA_INDEX_NAME}_query_suggestions`,
            getSearchParams() {
                return {
                    hitsPerPage: 5,
                };
            },
            transformSource({ source }) {
                return {
                    ...source,
                    sourceId: 'querySuggestionsPlugin',
                    onSelect({ setIsOpen, setQuery, event, item }) {
                        if (event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
                            return;
                        }

                        setIsOpen(false);

                        setInstantSearchUiState({ query: item.query });
                    },
                }
            },
        })
    ],
})

window.addEventListener('popstate', () => {
    skipInstantSearchUiStateUpdate = true;
});
