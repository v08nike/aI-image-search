import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState<string>("");

  const GET_IMAGES = gql`
    query Query($keyword: String!) {
      images(keyword: $keyword) {
        image_ID
        source
        preview
        title
        thumbnails
        tags
      }
    }
  `;

  const { data, loading } = useQuery(GET_IMAGES, {
    variables: { keyword },
    skip: !keyword,
  });

  return (
    <div className="App">
      <header className="App-header py-8">
        <div className="mx-auto w-96 flex">
          <div className="mx-4">Search</div>
          <input
            type="text"
            value={keyword}
            className="text-black"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <p className="text-red-500">
          {!loading &&
            keyword.length > 0 &&
            (!data?.images || data?.images.length === 0) &&
            "There is no search result!"}
        </p>
        <div className="flex mx-20 mt-6 max-w-7xl flex-wrap gap-4">
          {data &&
            data.images?.map((image: any) => (
              <div key={image.image_ID} className="w-[200px] h-[200px]">
                <img
                  src={image.thumbnails}
                  alt={image.title || ""}
                  className="w-auto h-[180px] mx-auto"
                />
                <div className="text-sm mt-2">Come from {image.source}</div>
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
