
## run local server
~`bundle exec jekyll serve --incremental`~
I have now switched the site to run on docker locally
`docker build -t jekyll-site .`
```docker run --rm -p 4000:4000 `
  -v "${PWD}:/srv/jekyll" `
  jekyll/jekyll jekyll serve --incremental --force_polling --livereload```

## Note to Self
- remember! `css/daisy.css` updates some daisyUI defaults 
- Firebase API key is stored as a Github secret

# Modals to-do still
- [ ] List slicing (lists / arrays)
- [ ] list comprehensions (lists /arrays)
- [ ] comparative operators (comparative operators)
- [ ] escape codes eg \n, \t etc (string methods)
- [ ] constants (variables)
- [ ] time delta (random functions)
- [x] ~~2D arrays~~
- [x] ~~elif~~
- [x] ~~Tuples~~
- [x] ~~List indexing~~
- [x] ~~Lists~~
- [x] ~~Sorting lists~~
- [x] ~~Ternary statements~~
- [x] ~~input float~~
- [x] ~~input validation using while loops and in operator~~
- [x] ~~try / except blocks~~
- [x] ~~maths.ceil~~
- [x] ~~math.floor~~
- [x] ~~procedure~~
- [x] ~~function~~

## string methods
- [x] ~~is upper / lower~~
- [x] ~~is digit~~
- [x] ~~is alpha~~
- [x] ~~count~~
- [x] ~~replace~~

## random functions
- [x] ~~randint (from random)~~
- [x] ~~sample (from random)~~
- [x] ~~choice (from random)~~
- [x] ~~sleep~~
- [x] ~~clear screen~~
