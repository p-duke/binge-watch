Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'
  get '/graphql', to: 'graphql#execute'
  get 'users/:id/movies', to: 'movies#render_application_layout'

  root to: 'home#index'
  devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations' }


  resource :users do
    resources :movies
  end

end
