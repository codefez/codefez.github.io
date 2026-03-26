
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

# to-do still
- [ ] Dark mode code background on pseudocode modals
- [ ] pseudocode lessons
- [ ] download progress for pseudocode/python lessons
- [ ] upload progress for pseudocode/python lessons
- [ ] Python lessons for KS4 (convert from Python roadmap?)