import React from 'react';
import { connect } from "react-redux";
import { genresSelector } from "../../../shared/store/selectors";
import Nav from '../Nav';
import * as styles from "./FrequentlyAskedQuestions.module.css";

const FrequentlyAskedQuestions = ({ genres }) => {
  return (
    <React.Fragment>
      <Nav />
      <div className={styles.faqContainer}>
        <h1>Frequently Asked Questions</h1>
        <div>
          <h2>Table of Contents</h2>
          <ul>
            <li><a href="#about">About this app</a></li>
            <li><a href="#made-by">Who made this?</a></li>
            <li><a href="#genres">What are your genre definitions?</a>
              <ul>{genres.map(g => {
                return (
                  <li key={`li-key-${g.id}`}><a href={`#${g.id}`}>{g.name}</a></li>
                )
              })}
              </ul>
            </li>
          </ul>
        </div>
        <div id="about">
          <h2>About this app</h2>
          <p>This app has two separate components that work together to make a special sauce.</p>
          <ul>
            <li>The Editor lets you create elaborate adventures that lead the reader through a series of choices until an ending is reached.</li>
            <li>The Reader allows you to embark on adventures, created by other users, making choices that influence the eventual outcome of the adventure.</li>
          </ul>
        </div>
        <div id="made-by">
          <h2>Who made this?</h2>
          <p>This app was started by three developers as a side project. Working remotely, the creators collaborated on all aspects of this application.</p>
          <br />They are:
            <ul>
            <li><a href="https://github.com/tommcgurl" target="_blank" rel="noopener noreferrer">Tom</a></li>
            <li><a href="https://github.com/VirtuaBoza" target="_blank" rel="noopener noreferrer">Andrew</a></li>
            <li><a href="https://github.com/warpfox" target="_blank" rel="noopener noreferrer">Tyler</a></li>
          </ul>
        </div>
        <div id="genres" className={styles.genreContainer}>
          <h2>What are your genre definitions?</h2>
          <p>Early on, knowing that most of the content would be user driven, we knew we wanted to also have user created tags to help readers find exactly what they want to read. In a broader sense however, we wanted to have large, generalized categories into which all stories could be grouped to help give authors and readers a jumping off point for exploring adventures. Genres represent those large, generalized categories and they are classified as follows.</p>
          {genres.map(g => {
            return (
              <div id={g.id} key={g.id} >
                <h2>{g.name}</h2>
                <p>{g.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>);
}

const mapStateToProps = state => {
  return {
    genres: genresSelector(state),
  };
}

export default connect(mapStateToProps)(FrequentlyAskedQuestions);