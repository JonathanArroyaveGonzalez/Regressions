source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 3.9.0"

# GitHub Pages
gem "github-pages", group: :jekyll_plugins

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-github-metadata"
  gem "jekyll-relative-links"
  gem "jekyll-optional-front-matter"
  gem "jekyll-readme-index"
  gem "jekyll-default-layout"
  gem "jekyll-titles-from-headings"
end

# Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
