Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  get "/graphql", to: "graphql#execute"

  root to: "home#index"
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :users do
    resources :movies
  end
end
