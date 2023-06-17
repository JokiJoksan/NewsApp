import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("Entertainment");
  const [selectedButton, setSelectedButton] = useState("Entertainment");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news",
      params: {
        category: category,
        safeSearch: "Off",
        textFormat: "Raw",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "403ddfda17mshb3bc802ac01752ap1f0e49jsn54c2121c397e",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setNews(response.data.value);
        console.log(response.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="m-5 bg-dark text-white">
      <div
        className="rounded p-3 mb-3 bg-primary text-white"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="mr-3">News App</h1>
        <p> By JokiJoksan</p>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn mx-3 ${
            selectedButton === "Entertainment"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => {
            setSelectedButton("Entertainment");
            handleCategoryChange("Entertainment");
          }}
        >
          Entertainment
        </button>
        <button
          className={`btn mx-3 ${
            selectedButton === "Products"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => {
            setSelectedButton("Products");
            handleCategoryChange("Products");
          }}
        >
          Technology
        </button>
        <button
          className={`btn mx-3 ${
            selectedButton === "Business"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => {
            setSelectedButton("Business");
            handleCategoryChange("Business");
          }}
        >
          Bussines
        </button>
      </div>

      {news &&
        [...Array(Math.ceil(news.slice(0, 12).length / 4))].map(
          (_, rowIndex) => (
            <div className="row mb-3 mx-1" key={rowIndex}>
              {news
                .slice(rowIndex * 4, (rowIndex + 1) * 4)
                .map((newsItem, i) => (
                  <div
                    className="col-md-3 d-flex flex-column border p-3"
                    key={i}
                  >
                    <h3
                      className="text-center"
                      style={{ fontSize: "14px", flexGrow: 0 }}
                    >
                      {newsItem.name}
                    </h3>
                    {newsItem.image && (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ flexGrow: 1 }}
                      >
                        <img
                          src={newsItem.image.thumbnail.contentUrl}
                          alt={newsItem.name}
                          className="img-fluid"
                        />
                      </div>
                    )}
                    <p
                      className="text-justify"
                      style={{ fontSize: "12px", flexGrow: 0 }}
                    >
                      {newsItem.description}
                    </p>
                    <p
                      className="text-justify"
                      style={{ fontSize: "10px", flexGrow: 0 }}
                    >
                      {newsItem.datePublished.substring(0, 10)}
                    </p>
                  </div>
                ))}
            </div>
          )
        )}
    </div>
  );
};

export default App;
