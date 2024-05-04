const fetchWord = async () => {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  const word = await res.json();
  return word;
};

const useWord = async () => {
  const word = await fetchWord();
  return word[0];
};

useWord()
  .then((word) => {
    let fetchedWord = word;
  })
  .catch((error) => {
    console.log("Error occoured : ", error);
  });
