import axios from "axios";

const searchForArticles = async ({ article, relevant }) => {
  const data = {};
  const params = {};
  try {
    if (relevant) {
      params = {
        search: article,
        orderby: relevant,
      };
    } else {
      params = {
        search: article,
      };
    }
    data = await axios({
      method: "get",
      url: `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?`,
      params: {
        ...params,
      },
      responseType: "json",
    });
  } catch (err) {
    console.log(err);
  }

  return data;
};

const getAllLastArticles = async () => {
  const data = {};
  try {
    data = await axios({
      method: "get",
      url: `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?`,
      params: {
        orderby: "date",
        order: "desc",
      },
      responseType: "json",
    });
  } catch (err) {
    console.log(err);
  }
  return data;
};

export { searchForArticles, getAllLastArticles };
