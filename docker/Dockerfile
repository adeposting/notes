FROM ruby:3.2

ARG SITE_NAME=notes
ARG THEME_NAME=jekyll-theme-ade

ENV LANG=C.UTF-8 \
    JEKYLL_ENV=debug \
    BUNDLE_PATH=vendor/bundle

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    nodejs \
    git

WORKDIR /srv/jekyll

# Copy the Jekyll site contents (root of build context)
COPY ./${SITE_NAME} ./${SITE_NAME}

# Copy the local theme from one directory up (requires correct build context)
COPY ./${THEME_NAME} ./${THEME_NAME}

WORKDIR /srv/jekyll/${SITE_NAME}

RUN gem install bundler && \
    bundle config set --local path 'vendor/bundle' && \
    (bundle update || true) && \
    bundle install && \
    mkdir -p .docker/_site && \
    chmod -R 777 .docker

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--host", "0.0.0.0"]
