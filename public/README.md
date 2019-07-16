
![Instabuild Inc.](https://pefpi.herokuapp.com/) Rappi Inc.
======================================

# Instabuild Guidelines and Documentation
## Use heroku
* To setup heroku production please use `heroku git:remote -a pefpi` but make sure you rename this to production with `git remote rename heroku production`, then to send to remote you should use `git push production master`
* To setup heroku staging (pre-production) please use `heroku git:remote -a pefpidev` but make sure you rename this to production with `git remote rename heroku heroku-staging`, then to send to remote you should use `git push heroku-staging master`