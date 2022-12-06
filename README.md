# Seek & Find
A game inspired by [Where's Waldo](https://en.wikipedia.org/wiki/Where%27s_Wally%3F).

[Live demo](https://luxury-marigold-c9f1c3.netlify.app/)👈

## Preview

https://user-images.githubusercontent.com/88938117/205469568-7f1830f4-e0ae-4bcb-943a-6c48ab0418f0.mp4

## Features
- Instant feedback on whether a character is found
- Timer that keeps track of the time elapsed
- Record player's name and finished time to the leaderboard
- Can be played on mobile or desktop devices

## Technologies

- HTML, CSS
- TypeScript
- React
- Cloud Firestore
- Netlify Functions
- Jest
- React Testing Library
- React Router
- Material UI

## Challenges

### Validating Player Selection
The game validates the player's selection by comparing the character's name and the coordinates that was clicked on with the data stored in Cloud Firestore. Originally, I had implemented the validation logic on the client side, but I considered the possibility that a malicious user could just open up the developer tools, reverse engineer the code and cheat the game. Therefore, I explored several options to keep my app secured.

My first thought was to create an API using Ruby on Rails to handle the validation logic. While it would certainly protect the logic from being exposed, I opted not to use Rails because the goal of this project was to use Firebase or other cloud platforms for the backend. Another option was to use Firebase Cloud Functions that can run the validation logic, but it would require billing registration for the service.

Fortunately, Netlify offers a similar service without billing registration called Netlify Functions. I was able to construct and deploy a function that contains the necessary logic to validate the player's selection. From the client side, an HTTP request can be made to the API endpoint created by the function. The response is then used to update the React state and UI.

```typescript
// MainImage.tsx

fetch(`/.netlify/functions/validate-selection?${params}`)
  .then((res) => res.json())
  .then((data) => {
    if (data === null) {
      changeFeedback("Keep looking!");
    } else if (data === clickedName) {
      changeFoundStatus(characterId);
      changeFeedback(`You've found ${clickedName}!`);
    }
});
```

Although the client knows what parameters are passed to the function, it does not know how the function process them. By using a serverless function, I successfully extracted the validation logic away from the client and more importantly, the implementation detail was no longer exposed. 

### Mocking Cloud Firestore
The Leaderboard component originally had and an Effect hook to fetch players' data from Cloud Firestore:
```typescript
// Leaderboard.tsx

useEffect(() => {
  const fetchPlayers = async () => {
    let array: DocumentData[] = [];
    const q = query(collection(db, "Players"), orderBy("time", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let docObj = { ...doc.data(), id: doc.id };
      array.push(docObj);
    });
    return array;
  };

  fetchPlayers().then((data) => setPlayers(data));
}, []);
```
While writing tests for the component, it was quite challenging to mock the Firestore methods such as ``` collection() ```.  While there is a [library available to help with mocking Cloud Firestore](https://github.com/Upstatement/firestore-jest-mock), I thought this was a good opportunity to extract all this logic into a custom hook. The idea was I can mock the custom hook itself to return a pre-determined value without worrying about mocking the implementation of the hook. It resulted in a much cleaner code without any extravagant mocks.

```typescript
// Leaderboard.test.tsx

const mockPlayers = [
  {
    id: "1",
    name: "Justin",
    time: "01:00",
  },
  {
    id: "88",
    name: "Rose",
    time: "03:00",
  },
  {
    id: "37",
    name: "Bill",
    time: "02:00",
  },
];

jest.mock("../../hooks/usePlayers.tsx", () => () => {
  let players = mockPlayers;
  return { players };
});
```
