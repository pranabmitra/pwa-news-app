const API_KEY = '**fe8b5378ae4198be8b3b68a68be3**';
const contentWrapper = document.querySelector('main');
const sourceElement = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();

    sourceElement.value = defaultSource;
    sourceElement.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if ('serviceWorker' in navigator) {
        try {
            // navigator.serviceWorker.register('sw.js');
            navigator.serviceWorker.register('sw-new.js'); // using google's workbox
            console.log(`Service worker registered!`);
        } catch (error) {
            console.log(`Service worker registration failed!`);
        }
    }
});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${API_KEY}`);
    const json = await res.json();

    sourceElement.innerHTML = json.sources
        .map(src => `<option value=${src.id}>${src.name}</option>`)
        .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`);
    const json = await res.json();

    contentWrapper.innerHTML = json.articles.map(crateArticle).join('\n');
}

function crateArticle(article) {
    return `
        <div class="article">
            <a href="${article.url}">
                <h2>${article.title}</h2>
                <img src="${article.urlToImage}" />
                <p>${article.description}</p>
            </a>
        </div>
    `;
}
