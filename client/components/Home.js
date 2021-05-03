import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = props => {
  console.log("home", props)
  const {firstName} = props
  const books = [
    {
      image: "/assets/frog-cover.png",
      title: "I Found A Frog",
    },
    {
      image: "/assets/pirates-cover.png",
      title: "Pirates Cove",
    },
    {
      image: "/assets/woods-cover.png",
      title: "The Way of the Woods",
    },
    {
      image: "/assets/hike-cover.png",
      title: "The Hike",
    },
  ];

  return (
    <div style={{marginTop: 40}}>
      <h3>Welcome, {firstName}</h3>
      <div className="container">
        {books.map((book,i) => (
          <Link key={i} className="card" to="/book">
            <div>
              <img
                src={book.image}
                alt="Avatar"
                style={{ width: "100%" }}
              ></img>
              <div className="details">
                <h4>
                  <b>{book.title}</b>
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // username: state.auth.username
    firstName:state.auth.name
  }
}

export default connect(mapState)(Home)
