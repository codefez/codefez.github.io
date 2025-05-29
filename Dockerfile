FROM jekyll/builder:latest

WORKDIR /srv/jekyll
COPY . .
RUN chown -R jekyll:jekyll /srv/jekyll
RUN bundle install
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--watch", "--incremental", "--drafts"]
