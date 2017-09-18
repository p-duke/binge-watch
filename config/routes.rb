Rails.application.routes.draw do
  root to: "home#index"
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :users do
    resources :movies
  end
end
