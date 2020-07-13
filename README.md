# AlgoReact
## a sorting algorithm visualizer

- Thanks for checking out my project!  This was the solo project that I chose to do for our React project in the App Academy full stack bootcamp program.  It covers the five sorting algorithms that we chose to study and analyze during our course.  It is 97% JavaScript and reflects what we've been learning over the course of the last several weeks and beyond.  I had an absolute blast building it, so if you enjoy, please be kind enough to star it for support!

### Technologies used:
- JavaScript
- React.js (extensive use of hooks: useState, useContext, useRef, useHistory, and useEffect)
- Framer Motion API for page transitions and animations
- Material UI for the control widget
- LaTex for Big O Notation font face
- Styled Components for styling of React components
- HTML5 / CSS3

### Challenges:
- I found that visualizing the recursive algorithms was quite a bit tricker than that of the 'loop-based' algorithms.  Merge Sort also required overwriting the 'animation' array rather than using swaps in the others.
- Figuring out a way to break out of the animation on a route change or reset took some problem solving as well with some creative (if not inefficient) use of useRef, useContext, and useHistory hooks.
- This was my deepest dive yet into the world of animation and styling, and while I enjoyed it, it felt like the most time consuming part of the whole process.

### Future To-do's:
- Is a project ever really done?
- My next feature to build was a way to make the animation speed variable which would not have required too much, but in a one week project, I just ran out of time.
- Make use of the useReducer hook or Redux to manage the growing complexity of my global state/context and improve performance
- Include additional algorithms (e.g. Heap Sort)
- More robust landing page and summary page with some data visualizations and comparisons of the performance of the algorithms
- Connect it to an API server and database to accumulate data over the course of time to create some interesting analysis over time.
- Performance improvements to the visualizations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
