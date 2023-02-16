# Enginette
  An engine maker/editor for the [engine-sim](https://github.com/ange-yaghi/engine-sim) by [AngeTheGreat](https://github.com/ange-yaghi).
  
# Warning: Code is still in development, thus it will change frequently
## Another Warning: This project is still in early development and because of this most of the site does not work. Please report any bugs to the [issues](https://github.com/Enginette/enginette/issues) page.
___

# How to use
  You can go to [enginette](https://enginette.netlify.app) now to view the ~~most recent main branch preview~~ the website and start making engines!. We are currently at version `0.0.4`
  
# How does this work?
  This project works by taking all of the required parameters and generating them into a [piranha](https://github.com/ange-yaghi/piranha) script and then launching it with the [client](https://github.com/enginette/enginette-client).

# FAQ
### Why does the website only work on a couple of pages and then goes into a infinite loading screen?
The problem is if you used the page before it released, it will have a invalid database and will cause errors when the website is trying to access the database.
Solution is:
- Right click, inspect element (or press F12)
- Click on the Storage tab (or if its hidden press on the little arrows and then application)
- Click on IndexedDB and `enginette`
- Click delete database and go to [the home page](https://enginette.netlify.app/)
