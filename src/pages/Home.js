import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../utils/UserContext";
import NavigationBar from "../components/NavigationBar";
import "../style/CreatePost.css";
import axios from "axios";
import { Redirect } from "react-router";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "../style/Home.css";
=======
import "../style/Home.css";
import Card from "../components/Card";
import Filter from "../components/Filter";
>>>>>>> chat

const LIMIT = 8;
const BASE_URL = "http://localhost:5000/api/v1/posts";

const Home = () => {
<<<<<<< HEAD
=======
  const { user, setUser } = useContext(UserContext);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [skip, setSkip] = useState(0);
  const [element, setElement] = useState(null);
  const [filters, setFilters] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [sortOrder, setSortOder] = useState({
    value: "1",
    id: "latest",
  });

>>>>>>> chat
  const fetchData = () => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    instance
<<<<<<< HEAD
      .get(`/limited/${LIMIT}/${skip}`)
=======
      .get(`/limited/${LIMIT}/${skip}`, {
        params: {
          order: parseInt(sortOrder.value),
        },
      })
>>>>>>> chat
      .then((res) => {
        if (res.data.length < 8) {
          setMore(false);
        }
        setState([...state, ...res.data]);
        setSkip(skip + LIMIT);
        setLoading(false);
<<<<<<< HEAD
        console.log(skip, more, loading);
=======
        showResults(filters);
>>>>>>> chat
      })
      .catch((err) => alert(err));
  };

<<<<<<< HEAD
  const { user, setUser } = useContext(UserContext);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const [skip, setSkip] = useState(0);
  const [element, setElement] = useState(null);
=======
>>>>>>> chat
  const loader = useRef(fetchData);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (first.isIntersecting) {
          setLoading(true);
          loader.current();
        }
      },
      { rootMargin: "50px", threshold: 0.25 }
    )
  );

  useEffect(() => {
    loader.current = fetchData;
<<<<<<< HEAD

    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

=======
  }, [fetchData]);

  useEffect(() => {
>>>>>>> chat
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

<<<<<<< HEAD
  const createPost = (post) => {
    return (
      <>
        <div key={post.id} className="col col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div className="card h-100">
            <Link to={`/post/${post.id}`}>
              <img
                src={post.image}
                className="card-img-top crop"
                style={{ maxHeight: "15rem" }}
                alt="..."
              />
            </Link>
            <div className="card-body">
              <Link
                to={`/post/${post.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5 className="card-title">{post.title}</h5>
              </Link>
              <p className="card-text">{post.desc}</p>
            </div>
            <div className="card-footer">
              <small>{post.username}</small>
              <br />
              <small className="text-muted">
                {new Date(post.createdAt).toUTCString()}
              </small>
            </div>
          </div>
        </div>
      </>
    );
=======
  const showResults = (fil) => {
    if (fil.length > 0) {
      setFilteredList(state.filter((post) => fil.includes(post.category)));
    } else {
      setFilteredList(state);
    }
  };

  const handleFilters = (fil) => {
    const newFilters = fil;
    showResults(newFilters);
    setFilters(newFilters);
  };

  const handleOrder = (order) => {
    if (order.value !== setSortOder.value) {
      setSortOder(order);
      setLoading(false);
      setMore(true);
      setSkip(0);
      setState([]);
      setFilteredList([]);
    }
>>>>>>> chat
  };

  if (!user.token || user.expired) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <NavigationBar
        loggedin={true}
        func={() => {
          localStorage.removeItem("prosfero-token");
          localStorage.removeItem("prosfero-id");
          setUser({
            token: null,
            id: null,
          });
        }}
      />
      <div className="container" style={{ marginTop: "1rem" }}>
        <div
          className="title text-center"
          style={{ fontFamily: "Dancing Script", fontWeight: "bold" }}
        >
<<<<<<< HEAD
          <h1>The Latest Posts!</h1>
        </div>
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4"
          id="post-container"
        >
          {state.length > 0 && state.map((post) => createPost(post))}
=======
          <h1>Listings</h1>
        </div>
        <div className="filter">
          <Filter
            handleFilters={(filters) => handleFilters(filters, "Category")}
            handleOrder={handleOrder}
            customStyle={filteredList.length === 0 ? { display: "none" } : {}}
          />
        </div>
        <div
          className="col row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4"
          id="post-container"
        >
          {filteredList.length > 0 &&
            filteredList.map((post, index) => (
              <Card post={post} index={index} />
            ))}
>>>>>>> chat

          {!loading && more ? (
            <div ref={setElement} style={{ padding: "2rem" }}></div>
          ) : (
            <div id="footer" style={{ padding: "1rem" }}>
              {" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
