import React, { Component } from 'react';
import './HowTo.css';

class HowTo extends Component {
  render() {
    return (
      <div className="how-to">
        <h2>
          How To Use The Application
        </h2>
        <h3>
          Changing the sources of news
        </h3>
        <p>
          This application is used to triage news articles from Twitter and Google Alerts. The "Sources" tab can be used to change the terms being searched on those platforms. Adding a term to Twitter is as simple as adding the term to the text box at the bottom of the list and clicking "add" or pressing enter. To add a Google Alert you will need to create the Alert on some Google account, then get the <em>RSS feed</em> (a URL) from your Google Alerts page, and add that URL to the list here.
        </p>
        <h3>
          The Feed
        </h3>
        <p>
          The "Feed" page is the primary page for triaging new articles. It can be configured in two ways: 1) you can decide the maximum number of days in the past to retrieve news items, and 2) you can decide to order the feed by relevance (default) or by date. After changing the number of days or the sorting order, you will need to click "update" to see the results in the feed. Note that these settings affect the "REJECTED" and "ACCEPTED" pages as well!
        </p>
        <p>
          Clicking the "SOURCE" button on a given article will open a window in you browser and direct you to the original source of the article. Clicking "SIMILAR" will get articles that the machine has deemed the exact same item of news (retweets, for example). These similar articles are added to the same feed, but with a redish shadow surrounding them.
        </p>
        <p>
          Most important are the "REJECT" and "ACCEPT" buttons. Once you click one of these buttons, the article will be "labelled", and will be removed from this feed. Labelling has two other effects (besides getting it off of the feed!): 1) it teaches the machine to recognize similar articles as "regarding a specific occurance of missing migrants" or not, and 2) it organizes the articles into the other two tabs ("ACCEPTED" and "REJECTED"), for your convenience. If you accidently reject an article, you can go into the REJECTED tab and click "ACCEPT" on the article (as you intended in the first place), and this will correctly relabel the article as "ACCEPTED". As well the opposite for one you accidentally accepted.
        </p>
        <h2>
          Notes on Teaching the Machine
        </h2>
        <p>
          This application uses a machine learning to sort articles by relevance, so that you can find the most promising articles even with a very large number of search terms in Twitter and Google Alerts. The algorithm looks only at the text of the article. In order for the machine to learn, it is important that we are consistent with how we label articles. You should "accept" anything that is a SPECIFIC piece of news regarding a missing migrant. Even if you have already read the article yourself, you should still "accept" it, as that will teach algorithm will learn to classify future articles with similar words and sentances as "relevant". You should reject any article that A) is not a report regarding missing migrants or B) is from the IOM or another organization reporting aggregate numbers.
        </p>
      </div>
    );
  }
}

export default HowTo;
