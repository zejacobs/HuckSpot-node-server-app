import axios from "axios";

export default function DiscItApiRoutes(app) {
  const DISC_BASE_API = "https://discit-api.fly.dev/disc";

  const fetchRandomDisc = async (req, res) => {
    const response = await axios.get(`${DISC_BASE_API}`);
    const numDiscs = response.data.length;
    const randomDiscIndex = Math.floor(Math.random() * numDiscs);
    res.json(response.data[randomDiscIndex]);
  };
  app.get("/api/discIt", fetchRandomDisc);

  const fetchDiscById = async (req, res) => {
    const DISC_BY_ID_API = `${DISC_BASE_API}?id=${req.params.discId}`;

    const response = await axios.get(DISC_BY_ID_API);
    res.json(response.data[0]);
  };
  app.get("/api/discIt/:discId", fetchDiscById);

  const fetchDiscResults = async (req, res) => {
    const { queryString } = req.body;
    const DISC_SEARCH_API = `${DISC_BASE_API}${queryString}`;
    try {
      const response = await axios.get(DISC_SEARCH_API);
      res.json(response.data);
    } catch (err) {
      res.json("No Results for Search");
    }
  };
  app.post("/api/discIt", fetchDiscResults);
}
