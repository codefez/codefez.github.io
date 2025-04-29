source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
gem "github-pages", "~> 231", group: :jekyll_plugins
gem "csv", "~> 3.2"  # Specify version for Ruby 3.4+ compatibility
gem "webrick", "~> 1.8", require: true  # Ensure WebRick is required
gem "faraday-retry", "~> 2.2"

# Note: github-pages gem includes jekyll, so we don't need to specify it separately

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
# gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
