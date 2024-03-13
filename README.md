# React + TypeScript + Vite - Infinite-scroll Gallery

Infinite-scroll image Gallery fetching images from Pexels:

- Displaying images
- Search images
- Favouriting images
- Local storage
- Lazy loading images

- Hosted [Live](https://image-gallery-three-gules.vercel.app/) on Vercel

## How to setup and run code

- install dependency

```js
npm install
```

- run development server

```js
npm run dev
```

- How to send API request to [Pexels](https://www.pexels.com/api)

```js
const response = await fetch(BASE_URL + `${query}&page=${page}`, {
  method: 'GET',
  headers: {
    Authorization: API_KEY,
  },
})
```

https://image-gallery-git-main-vko.vercel.app/

TODO:

5. Use error from hook to display error component if something broke in url
6. Write tests for app
