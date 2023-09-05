import { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import "./App.css";
import { GET_IMAGES } from "./queries/getImages";
import Image from "./components/Image";
import { debounce } from "lodash";

let count = 0;

function App() {
  const [keyword, setKeyword] = useState<string>("");

  const { data, loading } = useQuery(GET_IMAGES, {
    variables: { keyword },
    skip: !keyword,
  });

  const onRefetch = debounce((e) => setKeyword(e.target.value), 500);

  const onChange = useCallback((e: any) => onRefetch(e), [onRefetch]);

  console.log("called: ", (count += 1));

  return (
    <div className="App">
      <header className="App-header py-8">
        <div className="mx-auto w-96 flex">
          <div className="mx-4">Search</div>
          <input type="text" className="text-black" onChange={onChange} />
        </div>
        <p className="text-red-500">
          {!loading &&
            keyword.length > 0 &&
            data?.images?.length === 0 &&
            "There is no search result!"}
        </p>
        <div className="flex mx-20 mt-6 max-w-7xl flex-wrap gap-4">
          {data?.images?.map((image: any) => (
            <Image key={image.image_ID} image={image} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
