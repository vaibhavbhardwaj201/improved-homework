# Vinted-Academy-Web - Infinite-scroll Gallery

    Infinite-scroll image Gallery fetching images from Pexels

# Features

- Feching images and displaying image on React app
- Ability for users to search images with keywords
- Users can mark an image as favourite and data won't lost on reload
- App is responsive and has better user experience on any device ('mobile, tablet, desktop')
- Lazy loading images to save bandwidth
- tests covering edge cases
- Well written code which is easy to understand, organised in maintainable and scalable folder structure

- Hosted [Live](https://image-gallery-three-gules.vercel.app/) on Vercel

## Requirement

- React and TypeScript

## Get Started

- install dependency

```bash
npm install
```

- run development server

```bash
npm run dev
```

- How to send API request to [Pexels](https://www.pexels.com/api)?

```js
const response = await fetch(BASE_URL + `${query}&page=${page}`, {
  method: 'GET',
  headers: {
    Authorization: API_KEY,
  },
})
```

## Author

-Vaibhav Bhardwaj [LinkedIn](https://www.linkedin.com/in/vaibhav1947/), [Github](https://github.com/vaibhavbhardwaj201/)
