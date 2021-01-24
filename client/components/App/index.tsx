import * as React from "react";
import wordsApi from "../../../service/wordsAPI";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [word, setWord] = React.useState<string>("");
  React.useEffect(() => {
    const getData = async () => {
      const newWord = await wordsApi.getNewWord(4);
      setWord(newWord);
    };
    if (!word) {
      getData();
    }
  }, []);
  return <div>{word}</div>;
};

export default App;
