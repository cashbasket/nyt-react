# New York Times Article Scrubber

**NYT Article Scrubber** was built with the **MERN** (MongoDB, Express.js, React, Node.js) stack, and uses _New York Times_ API to retrieve articles that match search parameters input by the user. It allows users to save articles to a database for later reading, as well as delete articles when they are finished with them.

In addition to the MERN stack, it also utilizes [socket.io](https://socket.io) to send notifications to all users whenever someone saves an article to the database.

## How to Search

All you have to do is [visit the site](https://tranquil-bastion-94399.herokuapp.com/), enter your search paramters (topic, start year, end year), and click the "Search" button. The top 10 articles that match your search will be returned. Easy peasy.

## How to Save Articles

To save an article, click the "Save Article" link in the lower-right corner of the article you wish to save. Done!

## How to View Saved Articles

At any time, you can view the articles that have been saved by clicking the big red button with the bookmark icon at the lower-right corner of the browser window on the search page. It will take you to the saved articles page.  If you wish to return to the search screen, simply click the big red button again (it will have a magnifying glass icon on it).

## How to Delete Articles

To delete articles, click the "Delete" link in the lower-right corner of the article